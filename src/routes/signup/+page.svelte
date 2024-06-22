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
  style="background-image: url('/src/lib/assets/Vagues.svg'); background-repeat: no-repeat; background-size: 28rem; background-position: center; width: 100vw; gap:0;"
  class="disposition"
>
  <div class="glass-cadre">
    <section>
      <br />
      <h1>Créer mon compte</h1>
      <form on:submit|preventDefault={handleForm}>
        <input
          class="input-log"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          class="input-log"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <input
          style="margin-bottom: 10px;"
          class="input-log"
          type="text"
          name="name"
          placeholder="Anonyme"
          required
        />
        <button class="submit" type="submit">SignIn</button>
        <br />
      </form>
    </section>
  </div>
</div>

<!--  CSS de la page de connexion -->
<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
</style>
