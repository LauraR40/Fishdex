<script>
  export let show = false;
  export let onClose;
  export let imageUrl;
  export let rewardName = "Récompense";

  function handleClose() {
    if (onClose) {
      onClose();
    }
  }

  async function downloadImage() {
    const blob = await fetch(imageUrl).then((r) => r.blob());
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = rewardName;
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if show}
  <div class="modal-overlay" on:click={handleClose}>
    <div class="modal" on:click|stopPropagation>
      <img src={imageUrl} alt={rewardName} />
      <div class="modal-actions">
        <button on:click={downloadImage}>Télécharger</button>
        <button on:click={handleClose} class="fermer">Fermer</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal {
    position: relative;
    background: white;
    padding: 20px;
    border-radius: 12px;
    max-width: 90%;
    max-height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .modal img {
    max-width: 100%;
    max-height: 70vh;
    border-radius: 12px;
    margin-bottom: 20px;
  }

  .modal-actions {
    display: flex;
    gap: 10px;
  }

  .modal-actions button {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .modal-actions button:hover {
    background-color: #0056b3;
  }

  .modal-actions button.fermer {
    background-color: #dc3545;
  }
  .modal-actions button.fermer:hover {
    background-color: #bd2130;
  }
</style>
