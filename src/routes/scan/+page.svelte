<script>
  import { Html5Qrcode } from "html5-qrcode";
  import { onMount, onDestroy } from "svelte";
  import Modal from "$components/modal.svelte";

  let showModal = true;

  function qrCodeScanne(texte, _) {
    location.href = "/fishdex/" + texte;
  }

  const qrconfig = { fps: 10, qrbox: { width: 250, height: 250 } };
  let qrcode = null;

  // Initialisation du scanner
  onMount(async () => {
    qrcode = new Html5Qrcode("reader");
    const perms = await navigator.permissions.query({ name: "camera" });
    const state = perms?.state;
    if (state == "granted")
      qrcode.start({ facingMode: "user" }, qrconfig, qrCodeScanne);
  });

  onDestroy(async () => {
    if (!qrcode) return;
    await qrcode.stop();
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

    <div>
      <a href="/" class="button">retour</a>
      <a href="/fishdex" class="button">Fishdex</a>
    </div>
  </div>
</div>

<!-- Modal de permission caméra -->

<Modal bind:showModal>
  <h2 slot="header">
    "Fishdex" souhaite accéder à votre caméra <br />
    <small id="modal-litleText"> Pour lire un QR code</small>
  </h2>
</Modal>
