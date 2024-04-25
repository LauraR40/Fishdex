import { createClient } from "@supabase/supabase-js";
import {
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY,
} from "$env/static/public";
import { fishStore, profileStore } from "./store";

export const supabase = createClient(
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY
);

function getPhotoUrl(name) {
  const { data } = supabase.storage.from("photos").getPublicUrl(name + ".jpg");
  return data.publicUrl;
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
    fishStore.update((fish) => {
      if (fish.filter((e) => e.id == nom).length == 0) {
        fish.push(obj);
        ajoutPoints(fish);
      }
      return fish;
    });

    return obj;
  }

  return null;
}

function ajoutPoints(fishes) {
  // 1 poisson = 1 points
  // si premier poisson alors 2 points
  profileStore.update((profile) => {
    profile.points += fishes.length == 1 ? 2 : 1;
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
