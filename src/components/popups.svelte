<script>
  import { popups, hidePopUp } from "$lib/index";
  import PopUp from "$components/popup.svelte";

  //Gestion de la fermeture d'un popup
  function closePopUp(id) {
    hidePopUp(id);
  }
</script>

<div class="popups">
  {#each $popups as { id, message }}
    <PopUp {message} onClose={() => closePopUp(id)} />
  {/each}
</div>

<style>
  .popups {
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1000;
  }
</style>
