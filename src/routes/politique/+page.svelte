<script>
  import Navbar from "../../components/navbar.svelte";
</script>

<!-- Page politique de confidentialité -->
<div
  style="background-color: #c0d6ff; max-width: 100vw;
    overflow: hidden;"
>
  <div
    style="margin-left: 7vw;
    margin-right: 7vw;
    margin-bottom: 10vh;
    height: 120vh;
    color: black;"
  >
    <br />
    <!-- Bouton de retour en arrière -->
    <a
      style="text-decoration: none; color: black; font-family:Inter, system-ui, Avenir, Helvetica, Arial, sans-serif; font-weight: 700;"
      href="/parametres">← Retour</a
    >
    <br /><br />
    <!-- Titre page -->
    <div class="bloc-default gradiant-left" style="width: 85vw;">
      <h1 style="color: white;">Mentions Légales</h1>
    </div>
    <br />
    <!-- Les mentions légales -->
    <div>
      <h2>Éditeur du site :</h2>

      <p>
        Propriétaire du site :<br />
        Email :
      </p>

      <hr class="separ" />

      <h2>Hébergement</h2>

      <p>*Ajouter adresse hébergeur ici</p>

      <hr class="separ" />

      <h2>Propriété intellectuelle</h2>

      <p>
        Le contenu de ce site est protégé par les lois en vigueur sur la
        propriété intellectuelle et le droit d'auteur. Toute reproduction non
        autorisée des contenus, marques ou logos est interdite.
      </p>

      <hr class="separ" />

      <h2>Données personnelles</h2>

      <p>
        Nous vous recommendons d'autoriser l'accès de votre caméra pour le bon
        fonctionnement de l'application. <br /><br />
        Nous ne collectons pas vos données, toute information vous concernant que
        vous fournirez à l'application seront effacées une fois votre session terminée.
      </p>

      <hr class="separ" />

      <h2>Liens hypertextes</h2>

      <p>Ce site n'utilise pas de liens externes.</p>

      <hr class="separ" />

      <h2>Cookies</h2>

      <p>Ce site n'utilise pas de cookies.</p>
    </div>
  </div>
  <div style="height: 13vh;"></div>
</div>

<!-- Menu -->
<Navbar />

<!-- CSS des mentions légales -->
<style>
  .separ {
    background-color: #322b79;
    height: 2px;
    border-style: none;
  }
</style>
