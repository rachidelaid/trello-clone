<script>
  import boardStore from '../store';

  const add = () => {
    boardStore.update((arr) => {
      arr.push({
        items: [],
        id: Date.now(),
        title: 'Enter a title ...',
      });
      localStorage.setItem('store', JSON.stringify(arr));
      return arr;
    });
  };
</script>

<nav>
  <div class="logo">
    <img src="favicon.png" alt="logo" />
    <h3>Trello Clone</h3>
  </div>

  <div class="link">
    <p on:click={add}>
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z"
        />
      </svg>add column
    </p>
  </div>
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
</style>
