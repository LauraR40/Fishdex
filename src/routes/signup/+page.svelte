<script>
  import { signIn } from "$lib/database";

  async function handleForm(form) {
    const email = form.target.email.value;
    const password = form.target.password.value;
    const name = form.target.name.value;

    const id = await signIn(email, password, name);
    if (id) {
      location.href = "/";
    }
  }
</script>

<!-- Page de connexion -->
<div
  style=" background-repeat: no-repeat; background-size: 28rem; background-position: center; width: 100vw; gap:0;"
  class="disposition flex"
>
  <h1>La Quête de l'Aquarium</h1>
  <div class="glass-cadre">
    <section>
      <h2 style="color:white; text-align: center;">Créer mon compte</h2>
      <br />

      <form on:submit|preventDefault={handleForm}>
        <input
          class="input-log"
          type="text"
          name="name"
          placeholder="Pseudo"
          required
        />
        <input
          class="input-log"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          style="margin-bottom: 10px; "
          class="input-log"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button class="submit" type="submit">Créer</button>
      </form>
      <br />
      <a
        style="color: white; text-decoration:none; font-weight:600; text-align:center;"
        href="/login">J'ai déjà un compte ➔</a
      >
    </section>
  </div>
</div>

<!--  CSS de la page de connexion -->
<style>
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
  button {
    padding: 0.5rem;
    border: 2px solid #ccc;
    border-radius: 0.25rem;
    background-color: #007bff;
    color: white;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }

  .submit {
    border-radius: 8px;
    background-color: rgba(168, 192, 236, 0);
    border-color: white;
    font-size: 15px;
  }

  h1 {
    width: 80vw;
    color: rgba(38, 88, 179, 0.6);
    height: 25vh;
    font-size: 40px;
    font-weight: 900;
    font-family: Outfit, sans-serif;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .disposition {
    background-image: url("$lib/assets/Vagues.svg");
  }
</style>
