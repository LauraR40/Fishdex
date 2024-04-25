<script>
</script>

<nav>
  <a href="/">
    <span class="icon accueil"></span>
    <span>Accueil</span>
  </a>
  <a href="/fishdex"
    ><span class="icon collection"></span>
    <span>Collection</span></a
  >
  <a href="/scan" style="width: 32px;">
    <span class="icon peche-pas-au-sens-du-fruit"> </span>
    <span style="display: none;">Scanner</span>
  </a>
  <a href="/carte"
    ><span class="icon map"> </span>
    <span>Carte</span></a
  >
  <a href="/parametres"
    ><span class="icon parametres"> </span>
    <span>Paramètres</span></a
  >
</nav>

<style>
  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    text-decoration: none;
    color: whitesmoke;
    width: 80px;
  }
  .icon {
    --size: 32px;
    width: var(--size);
    height: var(--size);
    display: block;

    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  .icon.accueil {
    background-image: url("$icons/accueil.svg");
  }
  .icon.collection {
    background-image: url("$icons/collection.svg");
  }
  .icon.map {
    background-image: url("$icons/map.svg");
  }
  .icon.peche-pas-au-sens-du-fruit {
    --size: 92px;
    width: var(--size);
    height: var(--size);
    position: absolute;
    transform: translateY(-50%);
    background-image: url("$icons/peche-pas-au-sens-du-fruit.svg");
  }
  .icon.parametres {
    background-image: url("$icons/parametres.svg");
  }

  nav {
    /* Glassmorphism */
    background: rgba(0, 0, 0, 0.3);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(6.5px);
    -webkit-backdrop-filter: blur(6.5px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);

    position: fixed;
    bottom: 16px;
    padding: 8px;
    display: flex;
    justify-content: space-evenly;
    width: 90vw;
  }
</style>
