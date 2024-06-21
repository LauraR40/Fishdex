<script>
  import rondvert from "$lib/assets/rondvert.svg";
  import { getAvatarUrl } from "$lib/database";
  export let user;
</script>

<!-- Bloc de profil -->
<div class="profil-niveau bloc-default gradiant-right">
  <div class="ligne">
    <!-- Avatar de l'utilisateur -->
    <img
      style="margin-left: 20px;"
      alt="Avatar"
      src={getAvatarUrl(user.avatar_id + ".png")}
    />
    <!-- Pseudo de l'utilisateur -->
    <h4 style="margin-left: 10px; text-transform: capitalize;">{user.nom}</h4>
    <div>
      <!-- Niveau de l'utilisateur -->
      <div class="poly">
        <span style="color: black; margin-left: 26%; font-weight: 700;"
          >{Math.trunc(user.points / 2)}</span
        >
      </div>
    </div>
  </div>
  <!-- Lien vers la page récompense -->
  <div class="ligne">
    <img class="rond" alt="Point de couleur" src={rondvert} />
    <p style="font-weight: 700;">Voir les récompenses de niveau →</p>
  </div>
</div>

<!-- CSS du bloc de profil -->
<style>
  .rond {
    width: 4vw;
    padding-left: 27px;
    margin-right: 17px;
  }
</style>
