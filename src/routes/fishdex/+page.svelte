<script>
  import Navbar from "$components/navbar.svelte";
  import Profile from "$components/profile.svelte";
  import { fishStore } from "$lib/store.js";

  let poissons = $fishStore;
</script>

<div class="disposition">
  <Profile />
  <div class="collection">
    {#each poissons as poisson}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <img
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
    border: 1px solid whitesmoke;
    padding: 12px;
    width: 90vw;
  }
</style>
