import { writable } from "svelte/store";
import marees from "$lib/assets/cartes/marees.png";
import embruns from "$lib/assets/cartes/embruns.png";
import nurserie from "$lib/assets/cartes/nurserie.png";
import profondeurs from "$lib/assets/cartes/profondeurs.png";
export const zones = {
  des_marees: {
    nom: "Des Marées",
    url: marees,
  },
  des_profondeurs: {
    nom: "Des Profondeurs",
    url: profondeurs,
  },
  des_nurserie: {
    nom: "Nurserie",
    url: nurserie,
  },
  des_embruns: {
    nom: "Des Embruns",
    url: embruns,
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
