<script>
  import { profileStore } from "$lib/store.js";
  import rondvert from "$lib/assets/rondvert.svg";
</script>

<div class="profil-niveau bloc-default gradiant-right">
  <div class="ligne">
    <img
      style="margin-left: 20px;"
      alt="Avatar"
      src={$profileStore.avatarUrl}
    />
    <!--TODO: Il faut trouver un moyen pour que le lien de l'image sois toujours valable -->
    <h4 style="margin-left: 10px;">{$profileStore.nom}</h4>
    <div>
      <div class="poly">
        <span style="color: black; margin-left: 26%; font-weight: 700;"
          >{Math.trunc($profileStore.points / 2)}</span
        >
      </div>
    </div>
  </div>
  <div class="ligne">
    <img class="rond" alt="Point de couleur" src={rondvert} />
    <p>Voir les récompenses de niveau →</p>
  </div>
</div>
