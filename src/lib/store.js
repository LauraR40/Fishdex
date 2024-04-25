import { writable } from "svelte/store";

export const profileStore = writable({
  nom: "Anonyme",
  avatarUrl: "",
  points: 0,
  zone: "des_marees",
});

export const fishStore = writable([]);
