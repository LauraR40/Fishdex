<script>
  export let data;
  import { zones } from "$lib/index.js";
</script>

<div style="background-color: #76A4F9;" class="disposition">
  <div>
    <div onclick="history.back()" class="retour">&leftarrow;</div>
    <span
      style="font-weight: 900; text-transform:uppercase; font-size:2rem"
      class="nom">{data.nom}</span
    >
    <span style="color:black; font-weight:700;" class="zone"
      >Zone {zones[data.zone].nom}</span
    >
  </div>
  <div
    style="display: flex; justify-content:center; position:absolute; width:100vw; height:30vh; top: 8rem;"
  >
    <img src={data.url} alt={data.nom} />
  </div>
  <div
    style="background-color: white;
    width: 100vw;
    height: 75vh;
    top: 20vh;
    color: black;
    margin-top: 5rem;
    border-radius: 30px;"
  >
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
    font-size: 3.5rem;
    font-weight: bolder;
    color: white;
  }
</style>
