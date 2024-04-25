<script>
  import rondvert from "$lib/assets/rondvert.svg";
  import Navbar from "../components/navbar.svelte";

  import { profileStore } from "$lib/store.js";
  let profile;
  profileStore.subscribe((value) => {
    profile = value;
  });

  function ajoutPoints() {
    profileStore.update((value) => {
      value.points += 10;
      return value;
    });
  }
</script>

<div class="disposition">
  <div class="profil-niveau bloc-default gradiant-right">
    <div class="ligne space">
      <img alt="Avatar" src={profile.avatarUrl} />
      <h4>{profile.nom}</h4>
      <div>{Math.trunc(profile.points / 2)}</div>
      <button
        on:click={() => {
          ajoutPoints(12);
        }}>Ajouter</button
      >
    </div>
    <div class="ligne">
      <img class="rond" alt="Point de couleur" src={rondvert} />
      <p>Voir les récompenses de niveau →</p>
    </div>
  </div>
  <div class="der-poisson bloc-default gradiant-left">
    <div class="ligne pad">
      <h2>Derniers Poissons Attrapés</h2>
    </div>
    <div class="pad">
      <div class="fond-couvert">
        <img alt="Poisson1" />
        <img alt="Poisson2" />
        <img alt="Poisson3" />
      </div>
    </div>
  </div>
  <div class="actual-zone bloc-default gradiant-left">
    <div class="ligne pad">
      <h2>Zone Actuelle</h2>
    </div>
    <p class="sous-titres">Zone des Embruns</p>
  </div>
  <div class="zone-pro bloc-default gradiant-right"></div>
  <div class="conseil bloc-default gradiant-left"></div>

  <a class="buttontemp" href="/scan">Aller à Scan QR</a>
</div>
<Navbar />
