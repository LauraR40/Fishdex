<script>
  import Navbar from "../components/navbar.svelte";
  import Profile from "../components/profile.svelte";
  import { zones } from "$lib/index.js";
  import { profileStore, fishStore } from "$lib/store.js";
  import { getAmountOfFishInZone } from "$lib/database.js";
  import { onMount } from "svelte";

  let derniersPoissons = $fishStore.slice(-3);

  let nombrePoissonsZone = 0;
  let nombrePoissonsAttrapésZone = 0;

  onMount(async () => {
    nombrePoissonsZone = await getAmountOfFishInZone($profileStore.zone);
    nombrePoissonsAttrapésZone = $fishStore.filter(
      (poisson) => poisson.zone === $profileStore.zone
    ).length;
  });
</script>

<div class="disposition">
  <Profile />

  <!-- Derniers poissons attrapés -->
  <div class="der-poisson bloc-default gradiant-left">
    <div class="ligne pad">
      <h2>Derniers Poissons Attrapés</h2>
    </div>
    <div class="pad">
      <div class="fond-couvert">
        {#if derniersPoissons.length == 0}
          <p>Pas de poisson.</p>
        {/if}
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

  <!-- Zone actuelle -->
  <div class="actual-zone bloc-default gradiant-left">
    <div class="ligne pad">
      <h2>Zone Actuelle</h2>
    </div>
    <p class="sous-titres">Zone {zones[$profileStore.zone].nom}</p>
    <a href="/carte">
      <div class="pad milieu">
        <img
          src={zones[$profileStore.zone].url}
          alt={zones[$profileStore.zone].nom}
          style=" width: 70vw;
                  height: 30vh;
                  border-radius: 20px;"
        />
      </div>
    </a>
  </div>

  <!-- TODO Poissons attrapés zone -->
  <!-- Ajouter barre-->
  <div class="zone-pro bloc-default gradiant-right">
    <div class="pad">
      <h2>Zone {zones[$profileStore.zone].nom}</h2>
      <p>{nombrePoissonsAttrapésZone} / {nombrePoissonsZone}</p>
    </div>
  </div>

  <!-- TODO Conseils du capitaine -->
  <!-- Ajouter capitaine-->
  <div
    style="position: relative; height:34vh;"
    class="conseil bloc-default gradiant-left"
  >
    <div class="pad">
      <h2>Les Conseils du capitaine Trégastel !</h2>
      <img class="pad" alt="conseil" src="src/lib/assets/conseil.svg" />
    </div>
    <img
      style="position:absolute; bottom:0; left:50%; transform:translateX(-50%);"
      src="/images/capitaine.png"
      alt="captain"
    />
  </div>
  <div class="fin-page"></div>
</div>

<Navbar />
