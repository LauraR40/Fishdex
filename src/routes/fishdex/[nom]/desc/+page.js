import { error } from "@sveltejs/kit";
import { getFish } from "$lib/database";

/**
 * Préchargement des informations d'un poisson
 * @param {object} params les paramètres de la route
 * ici /fishdex/[nom]
 * @returns {object} les informations du poisson
 */
export async function load({ params }) {
  const nom = params.nom;
  let data = null;
  if (nom) {
    // On tente de récupérer les informations du poisson
    data = await getFish(nom);
    // On retourne les informations si elles existent
    if (data) return data;
  }
  // On retourne un 404 si on ne trouve pas le poisson
  error(404, "Not found");
}
