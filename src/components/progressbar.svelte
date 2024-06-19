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
    border-color: rgba(0, 0, 0, 0.19);
    background-color: whitesmoke;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 90px;
  }

  .progress {
    width: 25%;

    display: block;
    height: 100%;
    border-radius: 90px;

    background-image: repeating-linear-gradient(
      135deg,
      #fff080,
      #fff0805a 4px,
      #93ade0 8px,
      #93ade0 8px
    );
  }
</style>
