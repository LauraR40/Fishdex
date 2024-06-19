import { createClient } from "@supabase/supabase-js";
import {
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY,
} from "$env/static/public";
import { fishStore, profileStore } from "./store";
import { browser } from "$app/environment";

export const supabase = createClient(
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY
);

function getFromBucket(bucketName, path) {
  const { data } = supabase.storage.from(bucketName).getPublicUrl(path);
  return data.publicUrl;
}

export function getPhotoUrl(name) {
  return getFromBucket("photos", name + ".jpg");
}

export function getAvatarUrl(name) {
  return getFromBucket("Avatars", name);
}

export async function getFish(nom) {
  let { data, _ } = await supabase
    .from("poissons")
    .select("*")
    .eq("id", nom)
    .limit(1)
    .single();
  if (data) {
    const obj = { ...data };
    // récupération du lien de l'image associée
    obj.url = getPhotoUrl(nom);

    // ajout du poisson dans le fishdex
    if (browser) {
      fishStore.update((fish) => {
        if (fish.filter((e) => e.id == nom).length == 0) {
          fish.push(obj);
          ajoutPoints(fish, obj.zone);
        }
        return fish;
      });
    }

    return obj;
  }

  return null;
}

function ajoutPoints(fishes, zone) {
  // 1 poisson = 1 points
  // si premier poisson alors 2 points
  profileStore.update((profile) => {
    profile.points += fishes.length == 1 ? 2 : 1;
    // mise à jour de la zone en fonction du poisson
    profile.zone = zone;
    return profile;
  });
}

export async function getAmountOfFishInZone(zone) {
  let { _, count } = await supabase
    .from("poissons")
    .select("*", { count: "exact" })
    .eq("zone", zone);
  return count;
}

/**
 * Crée un compte utilisateur
 * @param {*} email // email de l'utilisateur
 * @param {*} password // mot de passe
 * @param {*} name // nom de l'utilisateur
 * @returns {string | null} l'id de l'utilisateur ou null si une erreur est survenue
 */
export async function signIn(email, password, name = "Anonyme") {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        nom: name,
      },
    },
  });

  if (error) {
    //TODO Afficher jolie erreur
    console.error(error);
    alert(error.message);
    return null;
  }

  return data.user.id;
}

/**
 * Connecte un utilisateur
 * @param {*} email // email de l'utilisateur
 * @param {*} password // mot de passe
 * Met à jour le profileStore et le $profileStore.poissons avec les données de l'utilisateur
 */
export async function logIn(email, password) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    //TODO Afficher jolie erreur
    console.error(error);
    alert(error.message);
    return;
  }
}
/**
 * Mise à jour des stores avec les données de l'utilisateur
 * @param {*} user_id // id de l'utilisateur
 */
export async function getProfile(user_id) {
  const { data: user, error: userError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user_id)
    .limit(1)
    .single();

  if (userError) {
    //TODO Afficher jolie erreur
    console.error(userError);
    alert(userError.message);
    return;
  }

  return user;
}

/**
 * Déconnecte l'utilisateur
 */
export async function logOut() {
  try {
    await supabase.auth.signOut();
  } catch (_) {}
}

export async function checkConnected() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    location.href = "/login";
    return false;
  }

  return true;
}
