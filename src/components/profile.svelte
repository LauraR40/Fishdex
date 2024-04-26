<script>
  import { profileStore } from "$lib/store.js";
  import rondvert from "$lib/assets/rondvert.svg";
</script>

<div class="profil-niveau bloc-default gradiant-right">
  <div class="ligne">
    <img
      style="margin-left: 20px;"
      alt="Avatar"
      src="src/lib/assets/AvatarTemps.svg"
    />
    <!--{$profileStore.avatarUrl} -->
    <h4 style="margin-left: 10px;">{$profileStore.nom}</h4>
    <div style="margin-left: 20px;">{Math.trunc($profileStore.points / 2)}</div>
  </div>
  <div class="ligne">
    <img class="rond" alt="Point de couleur" src={rondvert} />
    <p>Voir les récompenses de niveau →</p>
  </div>
</div>
