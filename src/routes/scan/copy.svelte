<script>
  import { Html5QrcodeScanner } from "html5-qrcode";
  import { onMount } from "svelte";
  import Modal from "$components/modal.svelte";

  let showModal = true;

  // Fonctions de gestion du scanner
  function onScanSuccess(qrCodeMessage) {
    document.getElementById("result").innerHTML =
      '<span class="result">' + qrCodeMessage + "</span>";
  }

  function onScanError(errorMessage) {
    // ne pas prendre en compte le message d'erreur pour le moment
    // console.error(errorMessage);
  }

  // Initialisation du scanner
  onMount(async () => {
    const html5QrCodeScanner = await new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 250,
    });
    html5QrCodeScanner
      .render(onScanSuccess, onScanError)
      .catch((error) =>
        console.error("Erreur lors de l'initialisation du scanner", error)
      );
  });

  console.log("Component mounted, scanner setup initiated");
</script>

<div class="bod">
  <div class="row">
    <div class="col">
      <div id="reader"></div>
    </div>
    <div class="col" style="padding: 30px">
      <h4>Résultat du scan</h4>
      <div id="result">Résultat ici</div>
    </div>

    <a href="/" class="button">retour</a>
  </div>
</div>

<!-- Modal de permission caméra -->

<Modal bind:showModal>
  <h2 slot="header">
    "Fishdex" souhaite accéder à votre caméra <br />
    <small id="modal-litleText"> Pour lire un QR code</small>
  </h2>
</Modal>
