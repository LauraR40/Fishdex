import { createClient } from "@supabase/supabase-js";
import {
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY,
} from "$env/static/public";
import { writable, get } from "svelte/store";
import { browser } from "$app/environment";
import { showNotification } from "$lib/index";

export const supabase = createClient(
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY
);
export const profileStore = writable(null);

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

export function getRewardUrl(num) {
  return getFromBucket("rewards", "reward" + num + ".png");
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

    // récupération des autres images associées
    obj.photos = [
      getPhotoUrl(nom + "-1"),
      getPhotoUrl(nom + "-2"),
      getPhotoUrl(nom + "-3"),
    ];

    // Ajout du poisson dans le profil de l'utilisateur
    if (browser) {
      const profile = await checkConnected();
      const poissons = profile.poissons;
      if (poissons.filter((e) => e.id == nom).length == 0) {
        poissons.push(obj);
        // Mise à jour du profil
        await updateProfile({
          poissons: poissons,
          ...ajoutPoints(profile, obj.zone),
        });
      }
    }

    return obj;
  }

  return null;
}

function ajoutPoints(profile, zone) {
  const pts = profile.poissons.length == 1 ? 2 : 1;
  const totalPts = profile.points + pts;
  const updater = {
    current_zone: zone,
    points: totalPts,
  };

  if ((totalPts / 2) % 1 == 0) {
    const rewards = profile.rewards;
    rewards.push({
      id: totalPts / 2,
      open: false,
    });

    updater.rewards = rewards;

    showNotification(
      "Une nouvelle récompense est disponible !",
      "/rewards",
      5000
    );
  }

  return updater;
}

export async function getAmountOfFishInZone(zone) {
  let { _, count } = await supabase
    .from("poissons")
    .select("*", { count: "exact" })
    .eq("zone", zone);
  return count;
}

export async function getAllFish() {
  let { data, error } = await supabase
    .from("poissons")
    .select("*")
    .order("nom", { ascending: true });
  if (error) {
    console.error(error);
    return [];
  }
  return data;
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
  profileStore.set(user);
  return user;
}

/**
 * Déconnecte l'utilisateur
 */
export async function logOut() {
  try {
    await supabase.auth.signOut();
    profileStore.set(undefined);
  } catch (_) {}
}

export async function checkConnected() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    location.href = "/login";
    throw new Error("User not connected");
  }
  let profile = get(profileStore);
  if (!profile) {
    profile = await getProfile(user.id);
  }
  return profile;
}
/**
 * Modifie la bdd
 * @param {*} updater
 * {
 *  "nom_col" : nouvelle_valeur,
 * }
 */
export async function updateProfile(updater) {
  const userId = get(profileStore).id;
  const { data, error } = await supabase
    .from("profiles")
    .update(updater)
    .eq("id", userId)
    .select();
  profileStore.update(() => {
    return data[0];
  });
}
