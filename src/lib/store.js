import { writable } from "svelte/store";
import { persist, createSessionStorage } from "@macfja/svelte-persistent-store";

export const profileStore = persist(
  writable({
    nom: "Anonyme",
    avatarUrl: "",
    points: 0,
    zone: "des_marees",
  }),
  createSessionStorage(),
  "profile"
);

export const fishStore = persist(writable([]), createSessionStorage(), "fish");
