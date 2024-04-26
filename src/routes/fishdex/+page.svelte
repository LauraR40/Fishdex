<script>
  import Navbar from "$components/navbar.svelte";
  import Profile from "$components/profile.svelte";
  import { fishStore } from "$lib/store.js";

  let poissons = $fishStore;
</script>

<div class="disposition-fishdex">
  <Profile />
  <div class="collection">
    <h2 style="color: #476AAD; margin-bottom: 15px;">
      Votre collection de poissons
    </h2>
    {#each poissons as poisson}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <img
        style="width: 20vw;"
        src={poisson.url}
        alt={poisson.nom}
        on:click={() => {
          location.href = `/fishdex/${poisson.id}/desc`;
        }}
      />
    {/each}
  </div>
</div>

<Navbar />

<style>
  /* TODO faire le design */

  .collection {
    border: 1px solid;
    padding: 12px;
    background-color: #e8e7ff;
    border-radius: 20px;
    border: solid;
    border-color: #f7f6ff;
    border-width: 5px;
    margin-bottom: 1000px;
  }

  .disposition-fishdex {
    margin: 0;
    justify-content: center;
    display: grid;
    grid-gap: 30px;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    overflow: scroll;
    padding: 20px;
    background-color: #c0d6ff;
    height: 95vh;
  }
</style>
