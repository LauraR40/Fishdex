<script>
  import Navbar from "$components/navbar.svelte";
  import {
    getAvatarUrl,
    checkConnected,
    updateProfile,
    profileStore,
  } from "$lib/database";
  import Switch from "$components/switch.svelte";

  async function changeAvatar() {
    // récup nombre aléatoire
    const numAlea = Math.floor(Math.random() * 9) + 1; // nb random [1,9]
    // construire nom avatar
    const nomAvatar = `${numAlea}.png`; // ex : 1.png
    // Récupération avatar URL
    const avatarUrl = getAvatarUrl(nomAvatar);

    // mettre à jour le profileStore
    await updateProfile({ avatar_id: numAlea });
  }

  async function openPartage() {
    const data = {
      title: "AquaDev",
      text: "Capturez les tous !",
      url: location.origin,
    };

    await navigator.share(data);
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#await checkConnected() then}
  <div class="disposition">
    <div
      on:click={changeAvatar}
      class="der-param bloc-default gradiant-left ligne space"
    >
      <div>
        <img
          alt="Mon Avatar"
          src={getAvatarUrl($profileStore.avatar_id + ".png")}
        />
      </div>
      <div>
        <p>Changer l’avatar</p>
        <p class="gris">Vos preferences</p>
      </div>
    </div>
    <div class="der-param bloc-default gradiant-left ligne space">
      <div
        class="poly"
        style="width: 56px;
    height: 56px;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;"
      >
        <span style="color: black; font-weight: 700;font-size: xx-large;"
          >{Math.trunc($profileStore.points / 2)}</span
        >
      </div>
      <div>
        <p>Vos récompenses</p>
        <p class="gris">Des fonds d’écran</p>
      </div>
    </div>
    <div class="der-param bloc-default gradiant-left ligne space">
      <div
        style="    width: 20vw;
    display: flex;
    justify-content: center;"
      >
        <img alt="icone vibre" src="src/lib/assets/icons/iconVibre.svg" />
      </div>
      <div style="margin-left: 2vw;">
        <p>Vibreur</p>
        <p class="gris">Vibre quand le scan est validé.</p>
      </div>
      <Switch
        clickEvent={(val) => {
          updateProfile({ vibreur: val });
        }}
        checked={$profileStore.vibreur}
      />
    </div>
    <div class="der-param bloc-default gradiant-left ligne space">
      <div
        style="    width: 20vw;
    display: flex;
    justify-content: center;"
      >
        <img alt="icone cloche" src="src/lib/assets/icons/Cloche.svg" />
      </div>
      <div style="margin-left: 2vw;">
        <p>Sonnerie</p>
        <p class="gris">Sonne quand le scan est valide.</p>
      </div>
      <Switch
        clickEvent={(val) => {
          updateProfile({ son: val });
        }}
        checked={$profileStore.son}
      />
    </div>
    <!-- <div class="der-param bloc-default gradiant-left ligne space">
    <img alt="valide" src="src/lib/assets/icons/Valide.svg" />
    <div>
      <p>Notez-nous</p>
      <p>Votre meilleur récompense pour nous</p>
    </div>
  </div> -->
    <div
      on:click={openPartage}
      class="der-param bloc-default gradiant-left ligne space"
    >
      <img alt="partage" src="src/lib/assets/icons/partage.svg" />
      <div>
        <p>Partager</p>
        <p class="gris">Partager l’application avec d’autres.</p>
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
          <p class="gris">Suivez nos politiques qui vous sont favorables</p>
        </div>
      </div>
    </a>
    <div class="fin-page"></div>
  </div>
{/await}
<Navbar />

<style>
  .gris {
    color: #c3c7c7;
  }

  p {
    margin: 0;
    user-select: none;
  }

  .der-param {
    height: 120px;
  }

  .space {
    justify-content: space-evenly;
  }
</style>
