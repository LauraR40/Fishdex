<script>
  import NavBar from "$components/navbar.svelte";
  import Profile from "$components/profile.svelte";
  import Gift from "$components/gift.svelte";
  import Reward from "$components/reward.svelte";

  import { checkConnected, profileStore, updateProfile } from "$lib/database";
  import { get } from "svelte/store";

  async function updateReward(reward) {
    reward.open = true;
    const rewards = get(profileStore).rewards;
    await updateProfile({
      rewards: rewards,
    });
  }
</script>

{#await checkConnected()}
  <p>Chargement...</p>
{:then}
  <div class="disposition flex">
    <Profile user={$profileStore} showReward={false} />
    <h1 style="color: #476AAD">Récompenses</h1>
    <div class="container {$profileStore.rewards.length != 0 ? 'grid' : ''}">
      {#if $profileStore.rewards.length == 0}
        <div class="bloc-default gradiant-left">
          <h2 class="titre">Il n'y a aucune récompense à ouvrir</h2>
        </div>
        <div class="gift">
          <Gift
            imgSrc="/src/lib/assets/gift1.svg"
            size="44"
            openable={false}
            open={true}
          />
        </div>
      {:else}
        {#each $profileStore.rewards as reward, index}
          <div class="gift">
            {#key reward}
              {#if reward.open}
                <Reward rewardId={reward.id} />
              {:else}
                <Gift
                  size="25"
                  even={index % 2 != 0}
                  onOpenGift={async () => {
                    await updateReward(reward);
                  }}
                />
              {/if}
            {/key}
          </div>
        {/each}
        <div style="height: 5vh; width:100%;"></div>
      {/if}
    </div>

    <NavBar />
  </div>
{/await}

<style>
  div.disposition {
    width: 100%;
  }
  h1 {
    margin-bottom: -2rem;
    font-size: 2.5rem;
  }

  .flex {
    justify-content: start;
  }

  .container {
    margin-top: 2vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .container.grid {
    flex-wrap: wrap;
    flex-direction: row;
    gap: 1vw;

    justify-content: center;
    align-self: center;
  }

  .container h2 {
    padding: 2vw;
    text-align: center;
    text-transform: uppercase;
  }

  .gift {
    display: flex;
    justify-content: center;
    align-items: center;

    text-align: center;
  }

  .grid .gift {
    width: 40vw;
  }
</style>
