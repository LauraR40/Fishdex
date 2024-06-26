<script>
  import { Html5Qrcode } from "html5-qrcode";
  import { onMount, onDestroy } from "svelte";
  import Modal from "$components/cameraModal.svelte";
  import Navbar from "../../components/navbar.svelte";
  import { checkConnected } from "$lib/database";

  // Initialisation des variables de la page
  let showModal = true;
  let audioPlayer = null;

  /**
   * Fonction exécutée lorsqu'on trouve un QRCode
   * @param {string} texte le texte du QRCode
   * @param {object} scanner l'object du scanner de QrCode
   * @param {object} options les options de l'utilisateur
   *
   * Si les options sont activées :
   * - Joue un son
   * - Fait vibrer le téléphone
   *
   * Redirige l'utilisateur vers la page `/fishdex/<texte>`
   */
  function qrCodeScanne(texte, scanner, options) {
    if (scanner.isScanning) {
      scanner.stop();
    }
    // activation vibreur
    if (options.vibreur) {
      let _ = navigator.vibrate(2500); // vibre pendant 200ms
    }
    //activation son
    if (audioPlayer && options.son) {
      audioPlayer.play();
    }
    // affichage de la page du poisson
    setTimeout(() => {
      window.location.href = `/fishdex/${texte}`;
    }, 500);
  }

  // Initialisation du scanner de QRCode
  // Utilisation de : https://github.com/mebjas/html5-qrcode
  const qrconfig = { fps: 10 };
  let qrcode = null;

  // Lorsque la page est chargée
  onMount(async () => {
    // On vérifie que l'utilisateur est connecté
    const profile = await checkConnected();
    // On prépare le son
    audioPlayer = new Audio("/sons/camera.mp3");
    // On prépare le scanner
    qrcode = new Html5Qrcode("reader");

    // On demande la permission d'utiliser la caméra
    // On commence à scanner uniquement si la permission est donnée
    const perms = await navigator.permissions.query({ name: "camera" });
    const state = perms?.state;
    if (state == "granted")
      // par défaut on utilise la caméra arrière
      qrcode.start({ facingMode: "environment" }, qrconfig, (o) => {
        qrCodeScanne(o, qrcode, { son: profile.son, vibreur: profile.vibreur });
      });
  });

  // Lorsque la page est déchargée on stoppe le scanner pour ne pas perdre de ressources
  onDestroy(async () => {
    if (!qrcode) return;
    await qrcode.stop();
  });
</script>

<!-- Page Sacnner de QR code -->
<div
  style="background-color: #4E5869;
width: 100vw;
height: 100vh;
justify-content: center;
    display: flex;"
>
  <div class="bod">
    <div class="row">
      <div class="col">
        <!-- Le scanner -->
        <div id="reader"></div>
        <img
          style="width: 10rem; height: 10rem; position: absolute;"
          src="/images/decor code.png"
          alt=""
        />
      </div>
      <p>Approchez-vous du QR code...</p>
    </div>
  </div>
</div>

<!-- Menu -->
<Navbar />

<!-- Modal de permission caméra -->
<Modal bind:showModal>
  <h2 slot="header">
    "Fishdex" souhaite accéder à votre caméra <br />
    <small id="modal-litleText"> Pour lire un QR code</small>
  </h2>
</Modal>

<!-- CSS du Sacnner de QR code -->
<style>
  .bod {
    margin: 0;
    display: flex;
    place-items: center;
  }

  .row {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
    flex-direction: column;
    place-items: center;
    display: flex;
  }

  .col {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #reader {
    width: 500px;
    width: 80vw !important;
  }
</style>
