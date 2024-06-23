<script>
  import Navbar from "$components/navbar.svelte";
  import {
    getAvatarUrl,
    checkConnected,
    updateProfile,
    profileStore,
    logOut,
  } from "$lib/database";
  import Switch from "$components/switch.svelte";

  // imports des icones
  import vibreur from "$lib/assets/icons/iconVibre.svg";
  import sonnerie from "$lib/assets/icons/Cloche.svg";
  import partage from "$lib/assets/icons/partage.svg";
  import info from "$lib/assets/icons/info.svg";
  import logout from "$lib/assets/icons/logout.svg";

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

<!-- Page paramètres -->

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#await checkConnected() then}
  <div class="disposition">
    <!-- Bouton pour changer d'avatar -->
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

    <!-- Lien vers la page récompenses -->
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
      <div on:click={() => (location.href = "/rewards")}>
        <p>Vos récompenses</p>
        <p class="gris">Des fonds d’écran</p>
      </div>
    </div>

    <!-- Bouton pour activer / retirer le vibreur -->
    <div class="der-param bloc-default gradiant-left ligne space">
      <div
        style="    width: 20vw;
    display: flex;
    justify-content: center;"
      >
        <img alt="icone vibre" src={vibreur} />
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

    <!-- Bouton pour activer / retirer la sonnerie -->
    <div class="der-param bloc-default gradiant-left ligne space">
      <div
        style="    width: 20vw;
    display: flex;
    justify-content: center;"
      >
        <img alt="icone cloche" src={sonnerie} />
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

    <!-- Bouton pour partager la page -->
    <div
      on:click={openPartage}
      class="der-param bloc-default gradiant-left ligne space"
    >
      <img alt="partage" src={partage} />
      <div>
        <p>Partager</p>
        <p class="gris">Partager l’application avec d’autres.</p>
      </div>
    </div>

    <!-- Lien vers la politique de confidentialité de l'appli -->
    <a href="/politique" style="text-decoration:none; color:white;">
      <div class="der-param bloc-default gradiant-left ligne space">
        <div
          style="width: 20vw;
    display: flex;
    justify-content: center;"
        >
          <img alt="info" src={info} />
        </div>
        <div
          style="margin-left: 2vw; margin-right: 2vw; display:flex; justify-content: center; flex-direction: column;"
        >
          <p>Politique de confidentialité</p>
          <p class="gris">Suivez nos politiques qui vous sont favorables</p>
        </div>
      </div>
    </a>

    <!-- Déconnexion -->
    <div
      on:click={async () => {
        await logOut();
        location.href = "/";
      }}
      class="der-param bloc-default gradiant-left ligne space deconnexion"
    >
      <img alt="partage" src={logout} />
      <div>
        <p>Déconnexion</p>
        <p class="gris">Appuyer ici pour vous déconnecter</p>
      </div>
    </div>

    <div class="fin-page"></div>
    <div style="height: 10vh;"></div>
  </div>
{/await}

<!-- Menu -->
<Navbar />

<!-- CSS de la page paramètres -->
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

  .deconnexion {
    background-image: radial-gradient(
      farthest-side at 5px 20px,
      #e99d9d 20%,
      #792b2b 150%
    );
  }
</style>
