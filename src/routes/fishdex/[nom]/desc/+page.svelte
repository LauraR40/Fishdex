<script>
  export let data;
  import { zones } from "$lib/index.js";
  import Navbar from "$components/navbar.svelte";
</script>

<!-- Page description -->
<div
  style="background-color: #76A4F9;position:relative;overflow:hidden;"
  class="disposition"
>
  <!-- Retour a la page poisson en arrière -->
  <div style="width: 100%; margin-left: 7vh;">
    <div onclick="history.back()" class="retour">&leftarrow;</div>
    <!-- Nom du poisson -->
    <div style="display:flex; align-items: flex-end;">
      <span
        style="font-weight: 900; text-transform:uppercase; font-size:2rem; margin-right: 10px;"
        class="nom">{data.nom}</span
      >
      <!-- Zone du poisson -->
      <div id="zone-pois">
        <span style="color:black; font-weight:700;" class="zone"
          >Zone {zones[data.zone].nom}</span
        >
      </div>
    </div>
  </div>
  <!-- Image du poisson -->
  <div
    style="display: flex; justify-content:center; position:absolute; width:100vw; height:30vh; top: 8rem;"
  >
    <img src={data.url} alt={data.nom} />
  </div>
  <!-- Bloc d'informations -->
  <div id="bloc-infos">
    <div style="margin-top: 5vh;">
      <div
        class="ligne"
        style="display: flex; justify-content:space-around; max-width: 90vw;
    margin-left: 5vw;"
      >
        <!-- Taille du poisson -->
        <div class="categorie">
          <span class="big">{data.taille} cm</span>
          <span class="mini">Taille</span>
        </div>
        <!-- Type de poisson -->
        <div class="categorie">
          <span class="big">{data.type}</span>
          <span class="mini">Type</span>
        </div>
        <!-- Famille de poisson -->
        <div class="categorie">
          <span class="big">{data.famille}</span>
          <span class="mini">Famille</span>
        </div>
      </div>
      <br />
      <hr
        style="margin-left: 7vw; margin-right: 7vw; background-color: #ABBBDA;"
      />

      <!-- 3 Photos du poisson -->
      <!-- <div class="Illustrations">
        <img src="#" alt="" />
        <img src="#" alt="" />
        <img src="#" alt="" />
      </div> 
      
      TODO: ajouter des illustrations pour chaque poisson dans partie galerie-->

      <!-- Texte de description des caratéristiques du poisson -->
      <div
        class="description"
        style="margin-top: 2vh; margin-left: 7vw; margin-right: 7vw; font-family: Outfit, sans-serif;"
      >
        <h2 style="color: #476AAD;">Description</h2>
        <p>{data.description}</p>
      </div>
    </div>
  </div>
</div>

<!-- Menu -->
<Navbar />

<!-- CSS de la page description -->
<style>
  @font-face {
    font-family: "Outfit";
    src: url(‘/fonts/Outfit-VariableFont_wght.ttf’) format(‘truetype’);
  }

  .retour {
    cursor: pointer;
    font-size: 3.5rem;
    font-weight: bolder;
    color: white;
  }

  .categorie {
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
  }

  .big {
    font-weight: 700;
    font-size: 18px;
  }

  .mini {
    font-size: small;
    color: #757474;
  }

  #zone-pois {
    background-color: #21efb1;
    border-radius: 200px;
    height: 3vh;
    /* justify-content: center; */
    display: flex;
    align-items: center;
    padding: 0px 15px 0px 15px;
    margin-bottom: 10px;
    font-size: small;
  }

  #bloc-infos {
    background-color: white;
    width: 100vw;
    height: 75vh;
    top: 20vh;
    color: black;
    margin-top: 5rem;
    border-radius: 30px;
  }
</style>
