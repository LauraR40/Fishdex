<script>
  export let data;
  import Navbar from "$components/navbar.svelte";
  import Profile from "$components/profile.svelte";
  import { zones } from "$lib/index.js";
</script>

<div class="disposition">
  <img src={data.url} alt={data.nom} />
  <div class="milieu" style="flex-direction:column; align-items:center;">
    <div style="color: black;">Vous avez attrapé un ...</div>
    <div class="nom">
      {data.nom}
    </div>
    <div style="color: black; font-weight:700;" class="zone">
      <bold>Zone : {zones[data.zone].nom}</bold>
    </div>
  </div>

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

  <Profile />
  <div class="fin-page"></div>
</div>

<Navbar />

<style>
  .nom {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 25px;
    justify-content: center;
  }

  .der-desc1 {
    height: 70px;
  }
</style>
