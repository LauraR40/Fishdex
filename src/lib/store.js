import { writable } from "svelte/store";

export const profileStore = writable({
  nom: "Anonyme",
  avatarUrl: "",
  points: 0,
});

export const fishStore = writable([]);
