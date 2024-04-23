<script>
  export let data;
</script>

<div class="col">
  <div class="card">
    <img src={data.url} alt="image de {data.nom}" style="width:100%" />
    <div class="container">
      <h4><b>{data.nom}</b></h4>
      <p>{data.description}</p>
    </div>
  </div>

  <a href="/fishdex" class="button">Fishdex</a>
</div>

<style>
  .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    width: 40%;
  }

  .card:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  .container {
    padding: 2px 16px;
  }
</style>
