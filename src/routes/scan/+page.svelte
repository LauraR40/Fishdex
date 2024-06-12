<script>
  import { Html5Qrcode } from "html5-qrcode";
  import { onMount, onDestroy } from "svelte";
  import Modal from "$components/modal.svelte";
  import Navbar from "../../components/navbar.svelte";

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

<Navbar />

<!-- Modal de permission caméra -->

<Modal bind:showModal>
  <h2 slot="header">
    "Fishdex" souhaite accéder à votre caméra <br />
    <small id="modal-litleText"> Pour lire un QR code</small>
  </h2>
</Modal>
