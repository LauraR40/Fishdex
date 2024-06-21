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
<section>
  <h1>Login</h1>
  <form on:submit|preventDefault={handleForm}>
    <input type="email" name="email" placeholder="Email" required />
    <input type="password" name="password" placeholder="Password" required />
    <button type="submit">Login</button>
  </form>

  <a href="/signup">Signup</a>
</section>

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
</style>
