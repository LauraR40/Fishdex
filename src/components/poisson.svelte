<script>
  export let poisson;
  import { getPhotoUrl } from "$lib/database";

  // CSS Dynamique, ajout de variable en fonction de l'objet poisson
  const generalColor = !poisson.vu ? "393939" : poisson.color;
  let styles = {
    "p-bg": "#" + generalColor, // Couleur de fond
  };

  $: cssVarStyles = Object.entries(styles)
    .map(([key, value]) => `--${key}:${value}`)
    .join(";");

  // On ajoute une variable css `p-bg` pour changer la couleur d'arrière plan du poisson
  // en fonction de la couleur reçu de la BDD.
  // Par défaut cela met un fond noir
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="poisson" data-vu={poisson.vu} style={cssVarStyles}>
  {#if poisson.vu}
    <!-- Si le poisson est vu, alors on affiche son nom, son image avec l'arrière plan de sa couleur -->
    <img
      src={getPhotoUrl(poisson.id)}
      alt={poisson.nom}
      on:click={() => {
        location.href = `/fishdex/${poisson.id}/desc`;
      }}
    />
    <h3>{poisson.nom}</h3>
  {:else}
    <!-- Si le poisson n'est pas découvert alors on met sa silhouette et des ????? en guise de nom -->
    <img src={getPhotoUrl(poisson.id)} alt="Poisson non découvert" />
    <h3>?????</h3>
  {/if}
</div>

<style>
  .poisson {
    --size: 35vw;
    height: var(--size);
    width: var(--size);
    grid-column: span 1;
    grid-row: span 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border-radius: 20px;
    padding: 10px;
    border: solid;
    border-width: 5px;

    background-color: var(--p-bg);
    border-color: rgba(255, 255, 255, 0.5);
  }

  .poisson[data-vu="false"] img {
    filter: brightness(0);
  }
  .poisson[data-vu="false"] h3 {
    color: whitesmoke;
  }

  .poisson img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .poisson h3 {
    --font-size: 0.8rem;
    margin: 0;
    color: #333;
    text-align: center;

    font-size: var(--font-size);
  }
</style>
