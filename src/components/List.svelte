<script>
  import boardStore from '../store';
  import Card from './Card.svelte';
  export let board;

  import { dndzone } from 'svelte-dnd-action';
  import { flip } from 'svelte/animate';

  let container;

  const handleDrag = (e) => {
    boardStore.update((arr) => {
      const curBoard = arr.find((b) => b.id === board.id);
      curBoard.items = e.detail.items;

      localStorage.setItem('store', JSON.stringify(arr));
      return arr;
    });
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

  const onDraging = (element, data) => {
    element.innerHTML = `<div class="card dragging">${data.description}</div>`;
  };
</script>

<div class="list" on:contextmenu>
  <input
    type="text"
    placeholder="..."
    bind:value={board.title}
    on:change={handleChange}
  />
  <div
    class="list-container"
    bind:this={container}
    use:dndzone={{
      items: board.items,
      flipDurationMs: 200,
      dropTargetStyle: '',
      transformDraggedElement: onDraging,
    }}
    on:consider={handleDrag}
    on:finalize={handleDrag}
  >
    {#each board.items as task (task.id)}
      <div
        class="card-wrap"
        animate:flip={{ duration: 200 }}
        id={`${board.id}-${board.id}`}
        on:contextmenu
      >
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
