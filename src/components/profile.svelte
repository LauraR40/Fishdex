<script>
  import rondvert from "$lib/assets/rondvert.svg";
  import { getAvatarUrl } from "$lib/database";
  export let user;
</script>

<div class="profil-niveau bloc-default gradiant-right">
  <div class="ligne">
    <img
      style="margin-left: 20px;"
      alt="Avatar"
      src={getAvatarUrl(user.avatar_id + ".png")}
    />
    <!--TODO: Il faut trouver un moyen pour que le lien de l'image sois toujours valable -->
    <h4 style="margin-left: 10px;">{user.nom}</h4>
    <div>
      <div class="poly">
        <span style="color: black; margin-left: 26%; font-weight: 700;"
          >{Math.trunc(user.points / 2)}</span
        >
      </div>
    </div>
  </div>
  <div class="ligne">
    <img class="rond" alt="Point de couleur" src={rondvert} />
    <p>Voir les récompenses de niveau →</p>
  </div>
</div>
