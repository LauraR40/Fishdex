import { error } from "@sveltejs/kit";
import { getFish } from "$lib/database";

export async function load({ params }) {
  const nom = params.nom;
  let data = null;
  if (nom) {
    data = getFish(nom);
    if (data) return data;
  }

  error(404, "Not found");
}
