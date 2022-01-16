<script>
  import boardStore from '../store/boards';
  import Card from './Card.svelte';

  export let title = '...';
</script>

<div class="list">
  <input type="text" placeholder="..." bind:value={title} />
  <div class="list-container">
    {#if $boardStore}
      {#each $boardStore[title] as task}
        <Card description={task.description} />
      {/each}
    {/if}
  </div>
  <p>
    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
    </svg> Add a Card
  </p>
</div>

<style>
  .list {
    padding: 8px;
    background-color: var(--bg-light);
    width: 300px;
    border-radius: 5px;
    max-height: 85vh;
    align-self: flex-start;
  }

  .list > input {
    width: 100%;
    background-color: transparent;
    border: none;
    color: var(--text-color);
    margin-bottom: 5px;
    padding: 5px;
    font-weight: bold;
    outline: none;
    font-size: 16px;
  }

  .list > input:focus {
    background-color: var(--text-color);
    color: var(--bg-dark);
    outline: auto;
    border-radius: 5px;
  }

  .list-container {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    max-height: 73vh;
  }
</style>
