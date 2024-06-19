<script>
  import Navbar from "../components/navbar.svelte";
  import Profile from "../components/profile.svelte";
  import { zones } from "$lib/index.js";
  import { getAmountOfFishInZone, checkConnected } from "$lib/database.js";
  import Progressbar from "../components/progressbar.svelte";

  async function fetchData() {
    const profile = await checkConnected();

    const nombrePoissonsAttrapésZone = profile.poissons.filter(
      (poisson) => poisson.zone === profile.current_zone
    ).length;

    const derniersPoissons = profile.poissons.slice(-3) || [];

    return {
      nombrePoissonsZone: await getAmountOfFishInZone(profile.current_zone),
      nombrePoissonsAttrapésZone: nombrePoissonsAttrapésZone,
      profile: profile,
      derniersPoissons: derniersPoissons,
    };
  }
</script>

{#await fetchData()}
  <p>Chargement...</p>
{:then data}
  <div class="disposition">
    <Profile user={data.profile} />

    <!-- Derniers poissons attrapés -->
    <div class="der-poisson bloc-default gradiant-left">
      <div class="ligne pad">
        <h2>Derniers Poissons Attrapés</h2>
      </div>
      <div class="pad">
        <div class="fond-couvert">
          {#if data.derniersPoissons.length == 0}
            <p>Pas de poisson.</p>
          {/if}
          {#each data.derniersPoissons as poisson}
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
      <p class="sous-titres">Zone {zones[data.profile.current_zone].nom}</p>
      <a href="/carte">
        <div class="pad milieu">
          <img
            src={zones[data.profile.current_zone].url}
            alt={zones[data.profile.current_zone].nom}
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
      <div style="padding-bottom: 0;" class="pad">
        <h2>Zone {zones[data.profile.current_zone].nom}</h2>
        <p>{data.nombrePoissonsAttrapésZone} / {data.nombrePoissonsZone}</p>
      </div>
      <div
        style="height: 3vh;
    width: 80vw;
    padding: 2vh;
    padding-top: 0px;"
      >
        <Progressbar
          val={data.nombrePoissonsAttrapésZone}
          total={data.nombrePoissonsZone}
        />
      </div>
    </div>

    <!-- TODO Conseils du capitaine -->
    <!-- Corriger fautes -->
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
{/await}

<Navbar />
