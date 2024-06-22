<script>
  export let open = false;
  export let size = "20";
  export let openable = true;
  export let onOpenGift = () => {};
  export let even = false;

  function openGift() {
    if (openable && !open) {
      open = true;
      setTimeout(onOpenGift, 1100);
    }
  }

  size = size + "vw";
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="box"
  on:click={openGift}
  style="--size:{size};"
  data-direction={even}
>
  <div class="box-body" data-open={open}>
    <div class="box-lid">
      <div class="box-bowtie"></div>
    </div>
  </div>
</div>

<style>
  .box[data-direction="true"] {
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);
  }
  .box {
    position: relative;
  }
  .box-body {
    --box-size: calc(0.8 * var(--size));
    position: relative;
    height: var(--box-size);
    width: var(--box-size);
    margin-top: calc(0.5 * var(--size));
    background-color: #cc231e;
    border-bottom-left-radius: 5%;
    border-bottom-right-radius: 5%;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.3);
    background: linear-gradient(#762c2c, #ff0303);
  }
  .box-body[data-open="true"] {
    cursor: pointer;
    -webkit-animation: box-body 1s forwards ease-in-out;
    animation: box-body 1s forwards ease-in-out;
  }
  .box-body[data-open="true"] .box-lid {
    -webkit-animation: box-lid 1s forwards ease-in-out;
    animation: box-lid 1s forwards ease-in-out;
  }
  .box-body[data-open="true"] .box-bowtie::before {
    -webkit-animation: box-bowtie-left 1.1s forwards ease-in-out;
    animation: box-bowtie-left 1.1s forwards ease-in-out;
  }
  .box-body[data-open="true"] .box-bowtie::after {
    -webkit-animation: box-bowtie-right 1.1s forwards ease-in-out;
    animation: box-bowtie-right 1.1s forwards ease-in-out;
  }
  .box-body::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    width: calc(1 / 5 * var(--size));
    background: linear-gradient(#ffffff, #ffefa0);
  }
  .box-lid {
    position: absolute;
    z-index: 1;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    bottom: 90%;
    background-color: #cc231e;
    height: calc(1 / 5 * var(--size));
    width: var(--size);
    border-radius: 5%;
    box-shadow: 0 8px 4px -4px rgba(0, 0, 0, 0.3);
  }
  .box-lid::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    width: calc(1 / 5 * var(--size));
    background: linear-gradient(#ffefa0, #fff);
  }
  .box-bowtie {
    z-index: 1;
    height: 100%;
  }
  .box-bowtie::before,
  .box-bowtie::after {
    content: "";
    width: 33%;
    height: 33%;
    border: 16.6666666667px solid white;
    border-radius: 50% 50% 0 50%;
    position: absolute;
    bottom: 100%;
    z-index: -1;
  }
  .box-bowtie::before {
    left: 50%;
    -webkit-transform: translateX(-100%) skew(10deg, 10deg);
    transform: translateX(-100%) skew(10deg, 10deg);
  }
  .box-bowtie::after {
    left: 50%;
    -webkit-transform: translateX(0%) rotate(90deg) skew(10deg, 10deg);
    transform: translateX(0%) rotate(90deg) skew(10deg, 10deg);
  }

  @-webkit-keyframes box-lid {
    0%,
    42% {
      -webkit-transform: translate3d(-50%, 0%, 0) rotate(0deg);
      transform: translate3d(-50%, 0%, 0) rotate(0deg);
    }
    60% {
      -webkit-transform: translate3d(-85%, -230%, 0) rotate(-25deg);
      transform: translate3d(-85%, -230%, 0) rotate(-25deg);
    }
    90%,
    100% {
      -webkit-transform: translate3d(-119%, 225%, 0) rotate(-70deg);
      transform: translate3d(-119%, 225%, 0) rotate(-70deg);
    }
  }

  @keyframes box-lid {
    0%,
    42% {
      -webkit-transform: translate3d(-50%, 0%, 0) rotate(0deg);
      transform: translate3d(-50%, 0%, 0) rotate(0deg);
    }
    60% {
      -webkit-transform: translate3d(-85%, -230%, 0) rotate(-25deg);
      transform: translate3d(-85%, -230%, 0) rotate(-25deg);
    }
    90%,
    100% {
      -webkit-transform: translate3d(-119%, 225%, 0) rotate(-70deg);
      transform: translate3d(-119%, 225%, 0) rotate(-70deg);
    }
  }
  @-webkit-keyframes box-body {
    0% {
      -webkit-transform: translate3d(0%, 0%, 0) rotate(0deg);
      transform: translate3d(0%, 0%, 0) rotate(0deg);
    }
    25% {
      -webkit-transform: translate3d(0%, 25%, 0) rotate(20deg);
      transform: translate3d(0%, 25%, 0) rotate(20deg);
    }
    50% {
      -webkit-transform: translate3d(0%, -15%, 0) rotate(0deg);
      transform: translate3d(0%, -15%, 0) rotate(0deg);
    }
    70% {
      -webkit-transform: translate3d(0%, 0%, 0) rotate(0deg);
      transform: translate3d(0%, 0%, 0) rotate(0deg);
    }
  }
  @keyframes box-body {
    0% {
      -webkit-transform: translate3d(0%, 0%, 0) rotate(0deg);
      transform: translate3d(0%, 0%, 0) rotate(0deg);
    }
    25% {
      -webkit-transform: translate3d(0%, 25%, 0) rotate(20deg);
      transform: translate3d(0%, 25%, 0) rotate(20deg);
    }
    50% {
      -webkit-transform: translate3d(0%, -15%, 0) rotate(0deg);
      transform: translate3d(0%, -15%, 0) rotate(0deg);
    }
    70% {
      -webkit-transform: translate3d(0%, 0%, 0) rotate(0deg);
      transform: translate3d(0%, 0%, 0) rotate(0deg);
    }
  }
  @-webkit-keyframes box-bowtie-right {
    0%,
    50%,
    75% {
      -webkit-transform: translateX(0%) rotate(90deg) skew(10deg, 10deg);
      transform: translateX(0%) rotate(90deg) skew(10deg, 10deg);
    }
    90%,
    100% {
      -webkit-transform: translate(-50%, -15%) rotate(45deg) skew(10deg, 10deg);
      transform: translate(-50%, -15%) rotate(45deg) skew(10deg, 10deg);
      box-shadow: 0px 4px 8px -4px rgba(0, 0, 0, 0.3);
    }
  }
  @keyframes box-bowtie-right {
    0%,
    50%,
    75% {
      -webkit-transform: translateX(0%) rotate(90deg) skew(10deg, 10deg);
      transform: translateX(0%) rotate(90deg) skew(10deg, 10deg);
    }
    90%,
    100% {
      -webkit-transform: translate(-50%, -15%) rotate(45deg) skew(10deg, 10deg);
      transform: translate(-50%, -15%) rotate(45deg) skew(10deg, 10deg);
      box-shadow: 0px 4px 8px -4px rgba(0, 0, 0, 0.3);
    }
  }
  @-webkit-keyframes box-bowtie-left {
    0% {
      -webkit-transform: translateX(-100%) rotate(0deg) skew(10deg, 10deg);
      transform: translateX(-100%) rotate(0deg) skew(10deg, 10deg);
    }
    50%,
    75% {
      -webkit-transform: translate(-50%, -15%) rotate(45deg) skew(10deg, 10deg);
      transform: translate(-50%, -15%) rotate(45deg) skew(10deg, 10deg);
    }
    90%,
    100% {
      -webkit-transform: translateX(-100%) rotate(0deg) skew(10deg, 10deg);
      transform: translateX(-100%) rotate(0deg) skew(10deg, 10deg);
    }
  }
  @keyframes box-bowtie-left {
    0% {
      -webkit-transform: translateX(-100%) rotate(0deg) skew(10deg, 10deg);
      transform: translateX(-100%) rotate(0deg) skew(10deg, 10deg);
    }
    50%,
    75% {
      -webkit-transform: translate(-50%, -15%) rotate(45deg) skew(10deg, 10deg);
      transform: translate(-50%, -15%) rotate(45deg) skew(10deg, 10deg);
    }
    90%,
    100% {
      -webkit-transform: translateX(-100%) rotate(0deg) skew(10deg, 10deg);
      transform: translateX(-100%) rotate(0deg) skew(10deg, 10deg);
    }
  }
</style>
