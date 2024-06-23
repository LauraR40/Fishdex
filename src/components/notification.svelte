<script>
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  export let message = "";
  export let duration = 5000;
  export let redirectUrl = "/";

  let visible = true;
  let offset = tweened(-100, { duration: 300, easing: cubicOut });
  let translateX = 0;
  let startX;
  let startY;
  let isSwiping = false;

  onMount(() => {
    offset.set(0);

    const timeout = setTimeout(() => {
      hideNotification();
    }, duration);

    return () => clearTimeout(timeout);
  });

  function hideNotification() {
    offset.set(-100);
    setTimeout(() => {
      visible = false;
    }, 300);
  }

  function handleTouchStart(event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
    isSwiping = false;
  }

  function handleTouchMove(event) {
    const currentX = event.touches[0].clientX;
    const currentY = event.touches[0].clientY;
    const diffX = currentX - startX;
    const diffY = currentY - startY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      isSwiping = true;
      translateX = diffX;
    }
  }

  function handleTouchEnd() {
    if (isSwiping) {
      if (Math.abs(translateX) > 100) {
        hideNotification();
      } else {
        translateX = 0; // Reset position if not swiped enough
      }
    } else {
      // If not swiping, treat it as a click and redirect
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
