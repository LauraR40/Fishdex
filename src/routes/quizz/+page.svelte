<!-- Page type de quizz a texte a trou -->
<!-- Préparation pour futur version de l'application -->

<script>
  import Navbar from "../../components/navbar.svelte";

  let answers = ["dolor", "scelerisque", "Nullam"];
  /**
   * Vérifie les réponses du texte à trou
   */
  function verifier() {
    // On récupère toutes les réponses
    const spans = [...document.querySelectorAll("input.answer")];
    // pour chaque réponse on vérifie si c'est la bonne
    for (let i = 0; i < spans.length; i++) {
      const span = spans[i];
      span.classList.remove("wrong", "right");
      if (span.value != "...") {
        if (span.value == answers[i]) {
          span.classList.add("right");
        } else {
          span.classList.add("wrong");
        }
      }
    }
  }
</script>

<div class="col" style="padding: 5vw;">
  <p>
    Lorem ipsum <input placeholder="..." class="answer" />
    sit amet, consectetur adipiscing elit. Proin at blandit nisl. Orci varius natoque
    penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent vestibulum,
    sem nec mattis semper, tellus sapien iaculis nunc, at
    <input placeholder="..." class="answer" /> ipsum ante dictum lectus. Nunc eu
    elementum ex, ut pretium leo. Praesent nibh leo, varius et facilisis sit
    amet, pellentesque ac eros. Etiam odio lacus, dignissim ac nibh sit amet,
    pellentesque rutrum quam. Duis placerat diam a turpis lacinia, id auctor
    ipsum sollicitudin. Nulla consequat orci nec nulla facilisis, sed
    condimentum diam imperdiet. Sed aliquam magna erat, et tempus ipsum egestas
    ut.
    <input placeholder="..." class="answer" /> elementum sodales malesuada. Quisque
    vitae nunc eleifend, dignissim purus vitae, sollicitudin ex. Praesent fringilla
    ultricies eros sit amet laoreet. Maecenas et lectus ex.
  </p>

  <p>
    <span class="right">Bonne réponse</span> et
    <span class="wrong">Mauvaise réponse</span>
  </p>

  <button class="button" on:click={verifier}>vérifier</button>
</div>
<Navbar />

<style>
  .answer {
    font-weight: 900;
    padding: 0 5px;
  }

  .wrong {
    color: red;
  }
  .right {
    color: green;
  }
</style>
