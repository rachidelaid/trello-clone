<script>
  import boardStore from '../store';
  import Card from './Card.svelte';
  export let board;

  import { dndzone } from 'svelte-dnd-action';
  import { flip } from 'svelte/animate';
  const flipDurationMs = 200;

  let container;

  const handleConsider = (e) => {
    // items = e.detail.items;
    console.log(e.detail.items);
  };
  const handleFinal = (e) => {
    // items = e.detail.items;
    console.log(e.detail.items);
  };

  const handleChange = (e) => {
    boardStore.update((boards) => {
      const curBoard = boards.find((b) => b.id === board.id);
      curBoard.title = e.target.value.trim();

      localStorage.setItem('store', JSON.stringify(boards));
      return boards;
    });
  };

  const addCard = () => {
    const card = document.createElement('div');
    card.classList.add('card');
    const inp = document.createElement('input');
    inp.placeholder = 'Enter a title for this card...';

    card.append(inp);
    container.append(card);

    inp.focus();

    inp.addEventListener('focusout', () => {
      card.remove();
    });

    inp.addEventListener('change', () => {
      boardStore.update((boards) => {
        const curBoard = boards.find((b) => b.id === board.id);
        curBoard.items.push({
          description: inp.value.trim(),
          id: Date.now(),
        });

        localStorage.setItem('store', JSON.stringify(boards));

        return boards;
      });

      inp.blur();
    });
  };
</script>

<div class="list">
  <input
    type="text"
    placeholder="..."
    bind:value={board.title}
    on:change={handleChange}
  />
  <div
    class="list-container"
    bind:this={container}
    use:dndzone={{ items: board.items, flipDurationMs }}
    on:consider={handleConsider}
    on:finalize={handleFinal}
  >
    {#each board.items as task (task.id)}
      <div animate:flip={{ duration: flipDurationMs }}>
        <Card description={task.description} />
      </div>
    {/each}
  </div>
  <p on:click={addCard}>
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

  .list-container {
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    max-height: 73vh;
  }
</style>
