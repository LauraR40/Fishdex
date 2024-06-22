<script>
  import Navbar from "$components/navbar.svelte";
  import Profile from "$components/profile.svelte";
  import Poisson from "$components/poisson.svelte";
  import { checkConnected, profileStore, getAllFish } from "$lib/database";

  async function loadData() {
    // On vérifie que l'utilisateur est connecté
    await checkConnected();

    // Récupération des poissons de la BDD
    let tousLesPoissons = await getAllFish();

    // On affiche d'abord les poissons déjà rencontrés
    // Sinon on affiche les poissons non rencontrés en noir
    tousLesPoissons = tousLesPoissons.sort((a, b) => {
      const vu = $profileStore.poissons.find((p) => p.id === a.id);
      const vu2 = $profileStore.poissons.find((p) => p.id === b.id);

      a.vu = vu ? true : false;
      b.vu = vu2 ? true : false;

      return a.vu === b.vu ? 0 : a.vu ? -1 : 1;
    });

    return tousLesPoissons;
  }
</script>

<!-- Page collection  -->

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
{#await loadData() then poissons}
  <div class="disposition-fishdex">
    <!-- Profile de l'utilisateur  -->
    <Profile user={$profileStore} />
    <!-- Affichage des poissons rencontrés  -->
    <h2 style="color: #476AAD">Votre collection de poissons</h2>
    <div id="collection">
      {#each poissons as poisson}
        <Poisson {poisson} />
      {/each}
    </div>
  </div>
{/await}

<!-- Menu  -->
<Navbar />

<!-- CSS de la page collection  -->
<style>
  h2 {
    text-align: center;
  }

  #collection {
    display: grid;
    grid-template-columns: 45vw 45vw;
    grid-template-rows: repeat(auto-fill, 45vw);
    grid-gap: 2vw;

    justify-items: center;
    align-items: center;
  }

  .disposition-fishdex {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 2vh;

    height: 95vh;
    padding: 20px;
    overflow: scroll;
    background-color: #c0d6ff;
    padding-bottom: 10vh;
  }
</style>
