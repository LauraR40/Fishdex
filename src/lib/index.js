import { writable } from "svelte/store";

export const zones = {
  des_marees: {
    nom: "Des Marées",
    url: "src/lib/assets/cartes/zone des marées.png",
  },
  des_profondeurs: {
    nom: "Des Profondeurs",
    url: "src/lib/assets/cartes/ZoneDesProfondeurs.png.png",
  },
  des_nurserie: {
    nom: "Nurserie",
    url: "src/lib/assets/cartes/Nurserie.jpg",
  },
  des_embruns: {
    nom: "Des Embruns",
    url: "src/lib/assets/cartes/CarteEmbruns.png",
  },
};

export const notifications = writable([]);

export function showNotification(message, url, duration = 5000) {
  const id = Date.now();
  notifications.update((n) => [...n, { id, message, duration, url }]);

  setTimeout(() => {
    notifications.update((n) => n.filter((notif) => notif.id !== id));
  }, duration);
}
