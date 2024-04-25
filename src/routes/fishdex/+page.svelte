<script>
  import Navbar from "$components/navbar.svelte";
  import { fishStore } from "$lib/store.js";

  let items = [];

  fishStore.subscribe((value) => {
    items = value;
  });

  function clearDex() {
    fishStore.set([]);
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

<Navbar />
