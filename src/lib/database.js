import { createClient } from "@supabase/supabase-js";
import {
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY,
} from "$env/static/public";
import { browser } from "$app/environment";

export const supabase = createClient(
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY
);

export class SessionDatabase {
  loadDex() {
    let dex = localStorage.getItem("fishdex") ?? "[]";
    dex = JSON.parse(dex);
    return dex;
  }

  get items() {
    return this.loadDex();
  }

  set items(array) {
    localStorage.setItem("fishdex", JSON.stringify(array));
  }

  addItem(obj) {
    let dex = this.loadDex();
    if (dex.indexOf(obj) == -1) {
      dex.push(obj);
    }
    this.items = dex;
  }

  removeItem(obj) {
    let dex = this.loadDex();
    this.items = dex.filter((e) => e !== obj);
  }

  clearItems() {
    this.items = [];
  }
}

function getPhotoUrl(name) {
  const { data } = supabase.storage.from("photos").getPublicUrl(name + ".png");
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
    if (browser) {
      const dex = new SessionDatabase();
      if (dex.items.filter((e) => e.id == nom).length == 0) {
        dex.addItem(obj);
      }
    }

    return obj;
  }

  return null;
}
