<script>
  import { onMount } from "svelte";
  import Modal from "$components/rewardModal.svelte";
  import { getRewardUrl } from "$lib/database";

  export let rewardId = 1;

  let showModal = false;

  onMount(async () => {});

  //Affichage du modal de récompense (un fond d'écran)
  function openModal() {
    showModal = true;
  }
  //Fermeture du modal de récompense
  function closeModal() {
    showModal = false;
  }
  // Récupération de l'url de la récompense
  const rewardUrl = getRewardUrl(rewardId);
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="reward" on:click={openModal}>
  <img src={rewardUrl} alt="Récompense de niveau" />
</div>

<Modal
  show={showModal}
  onClose={closeModal}
  imageUrl={rewardUrl}
  rewardName="Récompense n°{rewardId}"
/>

<style>
  .reward {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    cursor: pointer;
  }

  .reward img {
    width: 50%;
    aspect-ratio: 9/16;
    height: auto;
    padding: 4px;
    border: 2px solid #ffffffaa;
    border-radius: 12px;
  }
</style>
