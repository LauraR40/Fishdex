<script>
  import Navbar from "../../components/navbar.svelte";
</script>

<!-- Fond avec vagues de la page carte  -->
<div
  style="background-image: url('/src/lib/assets/Vagues.svg'); background-repeat: no-repeat; background-size: 28rem; background-position: center; gap:0;"
  class="disposition-carte"
>
  <!-- Bloc avec carte  -->
  <div class="der-carte bloc-default gradiant-left">
    <div class="ligne pad">
      <h2>Carte De L’aquarium</h2>
    </div>
    <p class="sous-titres">Il reste 1 zone a débloquer</p>
    <div class="milieu">
      <!-- La carte  -->
      <img
        style="width: 80vw;
        height: 36vh;
        border-radius: 20px;"
        alt="carteAqua"
        src="src/lib/assets/cartes/carteAqua.png"
      />
    </div>
  </div>
</div>
<!-- Menu  -->
<Navbar />

<!-- CSS de la page carte  -->
<style>
  .der-carte {
    height: 424px;
    margin-top: 100px;
  }

  .disposition-carte {
    margin: 0;
    justify-content: center;
    display: grid;
    grid-gap: 30px;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    overflow: scroll;
    padding: 20px;
    background-image: url("src/lib/assets/Vagues.svg");
    height: 95vh;
  }
</style>
