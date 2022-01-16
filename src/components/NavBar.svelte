<script>
  import titleStore from '../store/titles';

  let modal = false;
  let name = '';

  const add = (e) => {
    if (e.target.id === 'add' && name.trim() !== '') {
      titleStore.update((titles) => {
        localStorage.setItem('titles', JSON.stringify([...titles, name]));
        return [...titles, name];
      });
      modal = false;
    }
  };
</script>

<nav>
  <div class="logo">
    <img src="favicon.png" alt="logo" />
    <h3>Trello Clone</h3>
  </div>

  <div class="link">
    <p on:click={() => (modal = true)}>
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z"
        />
      </svg>add column
    </p>
  </div>

  {#if modal}
    <div class="modal-wrap" on:click={add}>
      <div class="modal">
        <input type="text" placeholder="List Name" bind:value={name} />
        <button id="add">add</button>
      </div>
    </div>
  {/if}
</nav>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .logo img {
    width: 35px;
  }

  .modal-wrap {
    top: 0;
    left: 0;
    position: fixed;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
  }
</style>
