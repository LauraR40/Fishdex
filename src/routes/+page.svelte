<script>
  import Navbar from "../components/navbar.svelte";
  import Profile from "../components/profile.svelte";
  import { zones } from "$lib/index.js";
  import { profileStore, fishStore } from "$lib/store.js";
  import { getAmountOfFishInZone } from "$lib/database.js";
  import { onMount } from "svelte";

  let derniersPoissons = $fishStore.slice(-3);

  let nombrePoissonsZone = 0;
  let nombrePoissonsAttrapésZone = $fishStore.filter(
    (poisson) => poisson.zone === $profileStore.zone
  ).length;

  onMount(async () => {
    nombrePoissonsZone = await getAmountOfFishInZone($profileStore.zone);
  });
</script>

<div class="disposition">
  <Profile />
  <div class="der-poisson bloc-default gradiant-left">
    <div class="ligne pad">
      <h2>Derniers Poissons Attrapés</h2>
    </div>
    <div class="pad">
      <div class="fond-couvert">
        {#each derniersPoissons as poisson}
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
  </div>
  <!-- TODO Zone actuelle -->
  <div class="actual-zone bloc-default gradiant-left">
    <div class="ligne pad">
      <h2>Zone Actuelle</h2>
    </div>
    <p class="sous-titres">Zone {zones[$profileStore.zone].nom}</p>
    <div class="pad">
      <img
        src={zones[$profileStore.zone].url}
        alt={zones[$profileStore.zone].nom}
      />
    </div>
  </div>
  <!-- TODO Poissons attrapés zone -->
  <div class="zone-pro bloc-default gradiant-right">
    <p>{nombrePoissonsAttrapésZone} / {nombrePoissonsZone}</p>
  </div>
  <div class="conseil bloc-default gradiant-left"></div>

  <a class="buttontemp" href="/scan">Aller à Scan QR</a>
</div>
<Navbar />
