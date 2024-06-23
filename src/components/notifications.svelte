<script>
  import { notifications } from "$lib/index.js";
  import Notification from "$components/notification.svelte";
</script>

<div class="notifications">
  {#each $notifications as { id, message, duration, url }}
    <Notification {message} {duration} key={id} redirectUrl={url} />
  {/each}
</div>

<style>
  .notifications {
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1000;
  }
</style>
