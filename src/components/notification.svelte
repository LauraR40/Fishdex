<script>
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  // une notification c'est un message pendant une durée et une url de redirection
  export let message = "";
  export let duration = 5000;
  export let redirectUrl = "/";

  let visible = true;
  // Animation lors de l'apparition et la désapparition
  let offset = tweened(-100, { duration: 300, easing: cubicOut });
  let translateX = 0;
  let startX;
  let startY;
  let isSwiping = false;

  /**
   * Au chargement de la notification
   */
  onMount(() => {
    // On place au début de l'animation
    offset.set(0);

    // Au bout du timer on cache la notification
    const timeout = setTimeout(() => {
      hideNotification();
    }, duration);

    // Quand on décharge la notification on clear le timer associé
    return () => clearTimeout(timeout);
  });

  // Fonction pour cacher la notification
  function hideNotification() {
    offset.set(-100);
    setTimeout(() => {
      visible = false;
    }, 300);
  }

  // Fonction pour enregister le point de départ de la gestuelle (swipe)
  function handleTouchStart(event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
    isSwiping = false;
  }
  // Fonction pour gérer la gestuelle (swipe)
  function handleTouchMove(event) {
    const currentX = event.touches[0].clientX;
    const currentY = event.touches[0].clientY;
    const diffX = currentX - startX;
    const diffY = currentY - startY;
    // On vérifie si la position n'est plus la même qu'au départ
    if (Math.abs(diffX) > Math.abs(diffY)) {
      // Cela veut dire qu'on swipe
      // On enregistre le delta de position
      isSwiping = true;
      translateX = diffX;
    }
  }
  // Lorsqu'on relache la notification
  function handleTouchEnd() {
    if (isSwiping) {
      if (Math.abs(translateX) > 100) {
        // Si c'était un swipe et que le mouvement était assez grand
        // alors on cache la notification
        hideNotification();
      } else {
        translateX = 0; // Sinon on reset le delta car ce n'était pas assez grand
      }
    } else {
      // Si c'était un simple appuie alors on redirige sur l'url de redirection
      location.href = redirectUrl;
    }
  }
</script>

{#if visible}
  <div
    class="notification"
    style="transform: translateY({$offset}%) translateX({translateX}px);"
    on:touchstart={handleTouchStart}
    on:touchmove={handleTouchMove}
    on:touchend={handleTouchEnd}
  >
    <div class="message">{message}</div>
  </div>
{/if}

<style>
  .notification {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(to right, #0077be, #00aaff);
    color: white;
    padding: 1rem 2rem;
    border-radius: 0 0 12px 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    cursor: pointer;
    transition: transform 0.3s;
  }

  .message {
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
    user-select: none;
  }
</style>
