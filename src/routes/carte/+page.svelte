<script>
  import Navbar from "../../components/navbar.svelte";
  import { imagesb64 } from "$lib/index";
  import { checkConnected, profileStore } from "$lib/database";

  let caches = [];

  async function getData() {
    const profile = await checkConnected();
    caches = profile.zones;
  }

  function isCache(c) {
    return caches.includes(c) ? "cache" : "";
  }
</script>

<!-- Fond avec vagues de la page carte  -->
{#await getData()}
  <p>Chargement...</p>
{:then}
  <div
    style="background-repeat: no-repeat; background-size: 28rem; background-position: center; gap:0;"
    class="disposition-carte"
  >
    <!-- Bloc avec carte  -->
    <div class="der-carte bloc-default gradiant-left">
      <div class="ligne pad">
        <h2>Carte De L’aquarium</h2>
      </div>
      <p class="sous-titres">
        Il reste {$profileStore.zones.length} zone à débloquer
      </p>
      <div class="milieu">
        <!-- La carte  -->
        <div class="carte">
          <svg
            width="269"
            height="300"
            viewBox="0 0 269 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <rect
              y="154.082"
              width="158.684"
              height="145.918"
              fill="url(#pattern0_602_315)"
              id="carte_embruns"
              class={isCache("carte_embruns")}
            />
            <rect
              width="268.679"
              height="195.497"
              fill="url(#pattern1_602_315)"
              id="carte_profondeurs"
              class={isCache("carte_profondeurs")}
            />
            <rect
              x="128.996"
              y="88.0259"
              width="139.683"
              height="182.434"
              fill="url(#pattern2_602_315)"
              id="carte_marees"
              class={isCache("carte_marees")}
            />
            <rect
              x="136.566"
              y="177.833"
              width="132.113"
              height="122.167"
              fill="url(#pattern3_602_315)"
              id="carte_nurserie"
              class={isCache("carte_nurserie")}
            />
            <defs>
              <filter id="brightness-0">
                <feGaussianBlur stdDeviation="5" />
                <feComponentTransfer>
                  <feFuncR type="linear" slope="0.05" />
                  <feFuncG type="linear" slope="0.05" />
                  <feFuncB type="linear" slope="0.05" />
                </feComponentTransfer>
              </filter>
              <pattern
                id="pattern0_602_315"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use
                  xlink:href="#image0_602_315"
                  transform="scale(0.000935454 0.00101729)"
                />
              </pattern>
              <pattern
                id="pattern1_602_315"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use
                  xlink:href="#image1_602_315"
                  transform="scale(0.000552486 0.000759301)"
                />
              </pattern>
              <pattern
                id="pattern2_602_315"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use
                  xlink:href="#image2_602_315"
                  transform="scale(0.0010627 0.00081367)"
                />
              </pattern>
              <pattern
                id="pattern3_602_315"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use
                  xlink:href="#image3_602_315"
                  transform="scale(0.0011236 0.00121507)"
                />
              </pattern>
              <image
                id="image0_602_315"
                width="1069"
                height="983"
                xlink:href={imagesb64.carte_embruns}
              />
              <image
                id="image1_602_315"
                width="1810"
                height="1317"
                xlink:href={imagesb64.carte_profondeurs}
              />
              <image
                id="image2_602_315"
                width="941"
                height="1229"
                xlink:href={imagesb64.carte_marees}
              />
              <image
                id="image3_602_315"
                width="890"
                height="823"
                xlink:href={imagesb64.carte_nurserie}
              />
            </defs>
          </svg>
        </div>
      </div>
    </div>
  </div>
  <!-- Menu  -->
  <Navbar />
{/await}

<!-- CSS de la page carte  -->
<style>
  .der-carte {
    height: 424px;
    margin-top: 100px;
  }

  .disposition-carte {
    margin: 0;
    justify-content: center;
    display: grid;
    grid-gap: 30px;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    overflow: scroll;
    padding: 20px;
    background-image: url("$lib/assets/Vagues.svg");
    height: 95vh;
  }

  .milieu {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .carte svg {
    border-radius: 20px;
  }

  .cache {
    filter: url(#brightness-0);
  }
</style>
