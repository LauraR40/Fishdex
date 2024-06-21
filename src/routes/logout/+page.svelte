<script>
  import { logOut } from "$lib/database";

  async function handleForm() {
    await logOut();
    location.href = "/login";
  }
</script>

<!-- Page de déconnexion -->
<section>
  <h1>Logout</h1>
  <form on:submit|preventDefault={handleForm}>
    <button type="submit">Logout</button>
  </form>
</section>

<!-- CSS de la page de déconnexion -->
<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
