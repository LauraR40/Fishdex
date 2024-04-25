<script>
  import { profileStore } from "$lib/store.js";
  import rondvert from "$lib/assets/rondvert.svg";
</script>

<div class="profil-niveau bloc-default gradiant-right">
  <div class="ligne space">
    <img alt="Avatar" src={$profileStore.avatarUrl} />
    <h4>{$profileStore.nom}</h4>
    <div>{Math.trunc($profileStore.points / 2)}</div>
  </div>
  <div class="ligne">
    <img class="rond" alt="Point de couleur" src={rondvert} />
    <p>Voir les récompenses de niveau →</p>
  </div>
</div>
