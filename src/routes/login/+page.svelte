<script>
  import { logIn } from "$lib/database";

  async function handleForm(form) {
    const email = form.target.email.value;
    const password = form.target.password.value;
    await logIn(email, password);
    location.href = "/";
  }
</script>

<!-- Page de connexion -->
<div
  style="background-image: url('/src/lib/assets/Vagues.svg'); background-repeat: no-repeat; background-size: 28rem; background-position: center; width: 100vw; gap:0;"
  class="disposition"
>
  <h1
    style=" width:80vw; color: rgba(38, 88, 179, 0.60);; font-size:40px; height: 3vh; font-weight:900; font-family: Outfit, sans-serif;"
  >
    La Quête de l'Aquarium
  </h1>
  <div class="glass-cadre">
    <section>
      <h2 style="color:white; text-align: center;">Connexion</h2>
      <br />
      <form on:submit|preventDefault={handleForm}>
        <input type="email" name="email" placeholder="Email" required />
        <input
          style="margin-bottom: 10px;"
          type="password"
          name="password"
          placeholder="Mot de passe"
          required
        />
        <button class="submit" type="submit">Me connecter</button>
      </form>
      <br />
      <a
        style="color: white; text-decoration:none; font-weight:600;"
        href="/signup">Je n'ai pas de compte ➔</a
      >
    </section>
  </div>
  <div></div>
</div>

<!-- CSS de la page de connexion -->
<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
  }
  button {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    background-color: #007bff;
    color: white;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }

  .submit {
    border-radius: 5px;
    background-color: rgba(168, 192, 236, 0);
    border-color: white;
  }

  .glass-cadre {
    /* From https://css.glass */
    background: rgba(38, 88, 179, 0.46);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(9.3px);
    -webkit-backdrop-filter: blur(9.3px);
    border: 1px solid rgba(38, 88, 179, 0.4);

    width: 80vw;
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  input {
    background-color: white;
    border-radius: 5px;
  }
</style>
