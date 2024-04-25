<script>
  export let data;
  import Navbar from "$components/navbar.svelte";
  import Profile from "$components/profile.svelte";
  import { zones } from "$lib/index.js";
</script>

<div class="disposition">
  <img src={data.url} alt={data.nom} />
  <div>
    <div>Vous avez attrapé un ...</div>
    <div class="nom">
      {data.nom}
    </div>
    <div class="zone">Zone : {zones[data.zone].nom}</div>
  </div>

  <a href="/fishdex/{data.id}/desc">En savoir plus sur le {data.nom}</a>

  <Profile />
</div>

<Navbar />

<style>
  /* TODO faire le design de la page */
</style>
