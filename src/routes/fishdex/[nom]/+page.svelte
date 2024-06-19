<script>
  export let data;
  import Navbar from "$components/navbar.svelte";
  import Profile from "$components/profile.svelte";
  import { zones } from "$lib/index.js";
  import { profileStore, checkConnected } from "$lib/database";
</script>

{#await checkConnected() then}
  <div
    style="background-image: url('/src/lib/assets/Vagues.svg'); background-repeat: no-repeat; background-size: 28rem; background-position: center; gap:0;"
    class="disposition"
  >
    <div
      class="milieu"
      style="flex-direction:column; align-items:center; position:relative;"
    >
      <img src="/images/fond.png" alt="fond" />
      <img
        style="position:absolute; top: 6%; width: 45vw; border-radius: 50px;"
        src={data.url}
        alt={data.nom}
      />
      <div style="color: black;">Vous avez rencontré un ...</div>
      <div style="" class="nom">
        {data.nom}
      </div>
      <div style="color: black; font-weight:700;" class="zone">
        <bold>Zone : {zones[data.zone].nom}</bold>
      </div>

      <br />
      <div
        style="justify-content: center; display: flex; align-items: center;"
        class="der-desc1 bloc-default gradiant-left"
      >
        <img
          style="margin-right: 20px;"
          alt="ampoule"
          src="../src/lib/assets/ampoule.svg"
        />
        <a
          style="color:white; text-decoration:none; font-weight:700;"
          href="/fishdex/{data.id}/desc">En savoir plus sur le {data.nom}</a
        >
      </div>
      <br />
      <Profile user={$profileStore} />
    </div>

    <div class="fin-page"></div>
  </div>
{/await}

<Navbar />

<style>
  .nom {
    font-family: inherit;
    font-size: 30px;
    justify-content: center;
    -webkit-text-stroke: 2px #947eff;
    font-weight: 900;
    text-transform: uppercase;
  }

  .der-desc1 {
    height: 70px;
  }
</style>
