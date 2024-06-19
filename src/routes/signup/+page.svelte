<script>
  import { signIn, updateStores } from "$lib/database";

  async function handleForm(form) {
    const email = form.target.email.value;
    const password = form.target.password.value;
    const name = form.target.name.value;

    const id = await signIn(email, password, name);
    console.log(email, password, name, id);
    if (id) {
      await updateStores(id);
      location.href = "/";
    }
  }
</script>

<section>
  <h1>SignIn</h1>
  <form on:submit|preventDefault={handleForm}>
    <input type="email" name="email" placeholder="Email" required />
    <input type="password" name="password" placeholder="Password" required />
    <input type="text" name="name" placeholder="Anonyme" required />
    <button type="submit">SignIn</button>
  </form>
</section>

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
