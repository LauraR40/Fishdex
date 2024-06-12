<script>
  export let data;
  import { zones } from "$lib/index.js";
</script>

<div
  class="disposition"
>
  <div onclick="history.back()" class="retour">&leftarrow;</div>

  <div>
    <span class="nom">{data.nom}</span>
    <span class="zone">Zone {zones[data.zone].nom}</span>
  </div>
  <div>
    <img src={data.url} alt={data.nom} />
  </div>

  <div class="infos">
    <div class="ligne">
      <div class="categorie">
        <span>{data.taille}</span>
        <span>Taille</span>
      </div>
      <div class="categorie">
        <span>{data.type}</span>
        <span>Type</span>
      </div>
      <div class="categorie">
        <span>{data.famille}</span>
        <span>Famille</span>
      </div>
    </div>

    <div class="description">
      <h2>Description</h2>
      <p>{data.description}</p>
    </div>

    <div class="galerie">
      <!-- TODO : à voir plus tard -->
    </div>
  </div>
</div>

<style>
  /* TODO design à faire */
  .retour {
    cursor: pointer;
    font-size: xx-large;
    font-weight: bolder;
    color: #333;
  }
</style>
