<script>
  import Navbar from "../../components/navbar.svelte";
  import { getAvatarUrl } from "$lib/database";
  import { profileStore } from "$lib/store.js";

  function changeAvatar() {
    // récup nombre aléatoire
    const numAlea = Math.floor(Math.random() * 9) + 1; // nb random [1,9]
    // construire nom avatar
    const nomAvatar = `${numAlea}.png`; // ex : 1.png
    // Récupération avatar URL
    const avatarUrl = getAvatarUrl(nomAvatar);

    // mettre à jour le profileStore
    $profileStore.avatarUrl = avatarUrl;
  }
</script>

<div class="disposition">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    on:click={changeAvatar}
    class="der-param bloc-default gradiant-left ligne space"
  >
    <div>
      <img alt="Mon Avatar" src={$profileStore.avatarUrl} />
    </div>
    <div>
      <p>Changer l’avatar</p>
      <p>Vos preferences</p>
    </div>
  </div>
  <div class="der-param bloc-default gradiant-left ligne space">
    <div>
      <img alt="niveau" src="src/lib/assets/niveauTemp.svg" />
    </div>
    <div>
      <p>Vos récompenses</p>
      <p>Des fonds d’écran</p>
    </div>
  </div>
  <!-- <div class="der-param bloc-default gradiant-left ligne space">
    <div>
      <img alt="icone vibre" src="src/lib/assets/icons/iconVibre.svg" />
    </div>
    <div>
      <p>Vibreur</p>
      <p>Vibration quand le scan est validé.</p>
    </div>
    <div>
      <img alt="bouton" src="src/lib/assets/Switch1.svg" />
    </div>
  </div> -->
  <div class="der-param bloc-default gradiant-left ligne space">
    <div>
      <img alt="icone cloche" src="src/lib/assets/icons/Cloche.svg" />
    </div>
    <div>
      <p>Sonnerie</p>
      <p>Sonne quand le scan est valide.</p>
    </div>
    <div>
      <img alt="bouton" src="src/lib/assets/Switch2.svg" />
    </div>
  </div>
  <!-- <div class="der-param bloc-default gradiant-left ligne space">
    <img alt="valide" src="src/lib/assets/icons/Valide.svg" />
    <div>
      <p>Notez-nous</p>
      <p>Votre meilleur récompense pour nous</p>
    </div>
  </div> -->
  <div class="der-param bloc-default gradiant-left ligne space">
    <img alt="partage" src="src/lib/assets/icons/partage.svg" />
    <div>
      <p>Partager</p>
      <p>Partager l’application avec d’autres.</p>
    </div>
  </div>
  <a href="/politique" style="text-decoration:none; color:white;">
    <div class="der-param bloc-default gradiant-left ligne space">
      <div
        style="width: 20vw;
    display: flex;
    justify-content: center;"
      >
        <img alt="info" src="src/lib/assets/icons/info.svg" />
      </div>
      <div
        style="margin-left: 2vw; margin-right: 2vw; display:flex; justify-content: center; flex-direction: column;"
      >
        <p>Politique de confidentialité</p>
        <p>Suivez nos politiques qui vous sont favorables</p>
      </div>
    </div>
  </a>
  <div class="fin-page"></div>
</div>
<Navbar />
