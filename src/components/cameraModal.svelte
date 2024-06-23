<script>
  import { browser } from "$app/environment";
  export let showModal; // boolean

  let dialog; // HTMLDialogElement

  async function onButtonClick() {
    try {
      const promise = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      //fermer le bouton
      dialog.close();
      location.reload();
    } catch (error) {
      changeModal();
    }
  }

  function changeModal() {
    // modification du texte du modal

    const header = document.querySelector('[slot="header"]');
    if (!header) return;
    header.textContent =
      "Vous n'autorisez pas l'accès à la caméra, l'application ne peut pas fonctionner.";
    // header.innerHTML = `
    // Blablacar
    // <br>
    // <small id="modal-litleText">small</small>
    // `

    // modification des boutons du modal

    const ligne = document.getElementById("ligne");
    if (!ligne) return;

    ligne.querySelector("button").remove();
    ligne.querySelector("a").textContent = "revenir en arrière";
  }

  async function checkPerms() {
    const perms = await navigator.permissions.query({ name: "camera" });
    const state = perms?.state;

    // vérifier permissions
    // si permissions "prompt" -> app veut utiliser caméra.
    // si permission "denied" -> caméra non autorisée retour à la page d'accueil
    // si permission "granted" -> pas de modal

    switch (state) {
      case "granted":
        if (dialog && showModal) {
          showModal = false;
          dialog.close();
        }
        break;
      case "denied":
        changeModal();
        break;
      case "prompt":
        break;
    }
  }

  // à effectuer sur le client pas sur le serveur
  if (browser) {
    checkPerms();
  }
  $: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<!-- <dialog
  bind:this={dialog}
  
  on:click|self={() => dialog.close()}
> -->
<dialog bind:this={dialog} on:close={() => (showModal = false)}>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div>
    <slot name="header" />
    <!-- <slot id="modal-litleText" /> -->
    <!-- svelte-ignore a11y-autofocus -->
    <div id="ligne">
      <a id="close-modal" href="/">Je refuse</a>
      <button id="close-modal" autofocus on:click={() => onButtonClick()}
        >OK</button
      >
    </div>
  </div>
</dialog>

<style>
  @keyframes zoom {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }
  dialog[open]::backdrop {
    animation: fade 0.2s ease-out;
  }
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* modal perm appareil photo*/

  dialog {
    max-width: 80vw;
    border-radius: 1.6em;
    border: none;
    padding: 0;
    text-align: center;
  }
  dialog::backdrop {
    background: rgba(29, 42, 86, 0.6);
  }
  dialog > div {
    padding: 1em;
  }
  dialog[open] {
    animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  #close-modal {
    background-color: #4665a9;
    border: 1px solid transparent;
    border-radius: 0.75rem;
    box-sizing: border-box;
    color: #ffffff;
    cursor: pointer;
    flex: 0 0 auto;
    font-family:
      "Inter var",
      ui-sans-serif,
      system-ui,
      -apple-system,
      system-ui,
      "Segoe UI",
      Roboto,
      "Helvetica Neue",
      Arial,
      "Noto Sans",
      sans-serif,
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
      "Noto Color Emoji";
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.5rem;
    padding: 0.75rem 1.2rem;
    text-align: center;
    text-decoration: none #6b7280 solid;
    text-decoration-thickness: auto;
    transition-duration: 0.2s;
    transition-property: background-color, border-color, color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    width: auto;
  }

  #ligne {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
</style>
