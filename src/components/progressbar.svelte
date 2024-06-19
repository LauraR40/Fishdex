<script>
  export let val = 0;
  export let total = 100;
  const percent = Math.round((val / total) * 100);
</script>

<div class="progress-wrapper">
  <div class="progress" style="width: {percent}%;"></div>
</div>

<style>
  .progress-wrapper {
    border: 2px solid black;
    background-color: whitesmoke;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 90px;
  }

  .progress {
    width: 0%;
    display: block;
    height: 100%;

    background-image: repeating-linear-gradient(
      135deg,
      transparent,
      transparent 4px,
      blue 8px,
      blue 8px
    );
  }
</style>
