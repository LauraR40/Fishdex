<script>
  import Navbar from "../../components/navbar.svelte";
</script>

<div
  style="background-image: url('/src/lib/assets/Vagues.svg'); background-repeat: no-repeat; background-size: 28rem; background-position: center; gap:0;"
  class="disposition-carte pos2"
>
  <div class="der-carte bloc-default gradiant-left">
    <div class="ligne pad">
      <h2>Carte De L’aquarium</h2>
    </div>
    <p class="sous-titres">Il reste 1 zone a débloquer</p>
    <div class="milieu">
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
<Navbar />
