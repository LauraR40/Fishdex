<script>
  import { SessionDatabase } from "$lib/database";
  import { browser } from "$app/environment";
  import Navbar from "$components/navbar.svelte";
  let items = [];
  const sessionDB = new SessionDatabase();
  if (browser) {
    items = sessionDB.items;
  }

  function clearDex() {
    sessionDB.clearItems();
    location.reload();
  }
</script>

<div class="col">
  <h1>FishDex</h1>
  <h3>Liste des poissons trouvés</h3>
  <ul>
    {#each items as item}
      <li><a href="/fishdex/{item.id}">{item.nom}</a></li>
    {/each}
  </ul>

  <div>
    <button on:click={clearDex} class="button">Effacer la liste</button>
    <a href="/scan" class="button">Scanner</a>
  </div>
</div>

<Navbar/>
