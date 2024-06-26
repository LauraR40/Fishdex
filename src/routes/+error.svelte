<script>
  import NavBar from "$components/navbar.svelte";
</script>

<div class="conteneur">
  <div class="bloc-default gradiant-left">
    <h1 class="titre">Erreur 404</h1>
  </div>

  <div class="bloc-default gradiant-left" id="text">
    <p>Hoy Hoy moussaillon,<br />On confond tribord et bâbord ?</p>
    <p>
      Tu sembles égaré, <br /> retourne au bateau en cliquant
      <a href="/">ici</a>
    </p>
  </div>

  <img src="/images/capitaine.png" alt="capitaine" id="capitaine" />

  <NavBar />
</div>

<style>
  .conteneur {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: 80vw;
  }

  #text {
    padding: 2vw;
    text-align: center;
  }

  #capitaine {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80vw;
  }
</style>
