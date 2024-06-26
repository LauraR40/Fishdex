import { createClient } from "@supabase/supabase-js"; // Importation du client Supabase
import {
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY,
} from "$env/static/public"; // Importation des variables d'environnement pour Supabase
import { writable, get } from "svelte/store"; // Importation des stores Svelte
import { browser } from "$app/environment"; // Importation de l'environnement d'exécution
import { showNotification, showPopUp } from "$lib/index"; // Importation des fonctions de notification et de pop-up

// Initialisation du client Supabase avec les clés publiques
export const supabase = createClient(
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY
);
export const profileStore = writable(null); // Store Svelte pour le profil utilisateur

// Fonction pour obtenir l'URL publique d'un fichier depuis un bucket Supabase
function getFromBucket(bucketName, path) {
  const { data } = supabase.storage.from(bucketName).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Retourne l'url de l'image d'un poisson à partri du nom
 * @param {string} name // nom du poisson (sans extension)
 * @returns {string} // l'url de l'image du poisson
 *
 * nom_poisson => dessin du poisson
 * nom_poisson-1 => photo 1 du poisson
 * nom_poisson-2 => photo 2 du poisson
 * nom_poisson-3 => photo 3 du poisson
 */
export function getPhotoUrl(name) {
  return getFromBucket("photos", name + ".jpg");
}

/**
 * Retourne le lien de l'avatar dans supabase
 * @param {string} name nom de l'avatar (avec l'extension)
 * @returns {string} l'url de l'avatar
 */
export function getAvatarUrl(name) {
  return getFromBucket("Avatars", name);
}

/**
 * Retourne l'url du fond d'écran (récompense) associé au niveau atteint
 * @param {number} num // le numéro de la récompense (niveau atteint)
 * @returns {string} // l'url de l'image
 */
export function getRewardUrl(num) {
  return getFromBucket("rewards", "reward" + num + ".png");
}

/**
 * Action pour ajouter un poisson à la collection de l'utilisateur
 * @param {*} nom
 * @returns
 */
export async function getFish(nom) {
  // Récupération des informations du poisson
  let { data, _ } = await supabase
    .from("poissons")
    .select("*")
    .eq("id", nom)
    .limit(1)
    .single();

  if (data) {
    const obj = { ...data };
    // URL de l'image associée au poisson (dessin)
    obj.url = getPhotoUrl(nom);

    // URLs des autres images associées (images réelles)
    obj.photos = [
      getPhotoUrl(nom + "-1"),
      getPhotoUrl(nom + "-2"),
      getPhotoUrl(nom + "-3"),
    ];

    // Ajout du poisson au profil de l'utilisateur
    // Fait coté client car la fonction checkConnected
    // redirige vers la page de connexion en cas d'erreur
    if (browser) {
      // Vérification de la connexion + récupération du profil
      const profile = await checkConnected();
      const poissons = profile.poissons;
      // On vérifie que le poisson n'est pas déjà dans la collection
      if (poissons.filter((e) => e.id == nom).length == 0) {
        // Ajout du poisson à la collection (juste les informations nécessaires à l'affichage de l'aperçu)
        poissons.push({ id: obj.id, url: obj.url, zone: obj.zone });

        // Mise à jour de la carte des zones
        const zone = obj.zone.replace("des", "carte");
        const zones = profile.zones.filter((z) => {
          return z != zone;
        });

        // Mise à jour du profil utilisateur
        await updateProfile({
          poissons: poissons,
          ...ajoutPoints(profile, obj.zone),
          zones: zones,
        });
      }
    }

    return obj;
  }

  return null;
}

/**
 *
 * @param {object} profile Le profil de l'utilisateur
 * @param {string} zone la zone du poisson qu'il vient de rencontrer
 * @returns
 */
function ajoutPoints(profile, zone) {
  // Calcul de niveau : 1 point par poisson, 2 points par niveau

  // Point supplémentaire pour le premier poisson
  const pts = profile.poissons.length == 1 ? 2 : 1;
  const totalPts = profile.points + pts;

  // Préparation du profil utilisateur à mettre à jour
  const updater = {
    current_zone: zone,
    points: totalPts,
  };

  // Gestion de la progression de niveau
  // Si le nombre de points est un multiple de 2, une nouvelle récompense est débloquée
  if ((totalPts / 2) % 1 == 0) {
    // l'id de la récompense correspond au niveau atteint
    const rewards = profile.rewards;
    rewards.push({
      id: totalPts / 2,
      open: false,
    });
    // mise à jour des récompenses
    updater.rewards = rewards;

    showNotification(
      "Une nouvelle récompense est disponible !",
      "/rewards",
      5000
    );
  }

  return updater;
}

// Récupère le nombre de poissons dans une zone spécifique
// Utilisée dans la page d'accueil
export async function getAmountOfFishInZone(zone) {
  let { _, count } = await supabase
    .from("poissons")
    .select("*", { count: "exact" })
    .eq("zone", zone);
  return count;
}

/**
 * Récupère tous les poissons dans l'ordre alphabétique
 * @returns {Array<object>} un tableau de poissons ou vide si une erreur est survenue
 */
export async function getAllFish() {
  let { data, error } = await supabase
    .from("poissons")
    .select("*")
    .order("nom", { ascending: true });
  if (error) {
    showPopUp(translateErrors(error.message));
    return [];
  }
  return data;
}

/**
 * Crée un compte utilisateur
 * @param {string} email // email de l'utilisateur
 * @param {string} password // mot de passe
 * @param {string} name // nom de l'utilisateur
 * @returns {string | null} l'id de l'utilisateur ou null si une erreur est survenue
 *
 * Connecte automatiquement l'utilisateur
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
    showPopUp(translateErrors(error.message));
    return false;
  }

  return data.user.id;
}

/**
 * Connecte un utilisateur
 * @param {string} email // email de l'utilisateur
 * @param {string} password // mot de passe
 *
 * Ne récupère pas le profil de l'utilisateur
 */
export async function logIn(email, password) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    showPopUp(translateErrors(error.message));
    return false;
  }

  return true;
}

/**
 * Retourne le profil de l'utilisateur à partir de son id
 * Sinon affiche une erreur et retourne false
 * Met aussi à jour le profileStore
 * (et envoie un event pour mettre à jour les composants qui l'utilisent)
 * @param {string} user_id // id de l'utilisateur
 */
export async function getProfile(user_id) {
  const { data: user, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user_id)
    .limit(1)
    .single();

  if (error) {
    showPopUp(translateErrors(error.message));
    return false;
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

// Vérifie si un utilisateur est connecté et retourne son profil
// Sinon redirige vers la page de connexion
export async function checkConnected() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    // Redirection vers la page de connexion si l'utilisateur n'est pas connecté
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
 * Modifie la base de données avec les nouvelles informations du profil utilisateur
 * @param {object} updater
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

// Traduit les messages d'erreur en français
// Si le message n'est pas dans la liste, il est retourné tel quel
export function translateErrors(error) {
  const translations = {
    "Invalid login credentials": "Identifiants invalides",
    "User already registered": "Email déjà utilisé",
    "Password should be at least 6 characters.":
      "Le mot de passe doit contenir au moins 6 caractères",
  };

  return translations[error] || error;
}
