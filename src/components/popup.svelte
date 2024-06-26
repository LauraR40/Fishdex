<script>
  export let message = "";
  export let onClose;
  /**
   * Permet de fermer le popup
   */
  function closePopUp() {
    if (onClose) {
      // Callback qui s'effectue une fois le popup fermé
      onClose();
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="popup-overlay" on:click={closePopUp}>
  <div class="popup" on:click|stopPropagation>
    <div class="popup-header">
      <h2>Erreur</h2>
      <button class="close-button" on:click={closePopUp}>&times;</button>
    </div>
    <div class="popup-message">{message}</div>
    <div class="popup-actions">
      <button on:click={closePopUp}>OK</button>
    </div>
  </div>
</div>

<style>
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .popup {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    width: 60vw;
    max-height: 90%;
    text-align: center;

    animation:
      fadeIn 0.5s,
      slideIn 0.5s;
  }

  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .popup-header h2 {
    margin: 0;
    color: #333;
  }

  .popup-message {
    margin-bottom: 1rem;
    font-size: 1rem;
    color: #333;
  }

  .popup-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .popup-actions button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 8px;
    background-color: #0077be;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .popup-actions button:hover {
    background-color: #005f9e;
  }

  .close-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #333;
    cursor: pointer;
  }

  .close-button:hover {
    color: #000;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideIn {
    from {
      transform: translateY(-50px);
    }
    to {
      transform: translateY(0);
    }
  }
</style>
