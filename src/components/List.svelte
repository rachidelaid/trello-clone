<script>
  import titleStore from '../store/titles';
  import boardStore from '../store/boards';
  import Card from './Card.svelte';

  export let title = '...';
  export let id;

  let container;

  const handleChange = () => {
    titleStore.update((titles) => {
      titles[id] = title;
      localStorage.setItem('titles', JSON.stringify(titles));
      return titles;
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
        if (!boards[title]) {
          boards[title] = [];
        }

        boards[title].push({
          description: inp.value.trim(),
          index: boards[title].length,
        });

        localStorage.setItem('boards', JSON.stringify(boards));

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
    bind:value={title}
    on:change={handleChange}
  />
  <div class="list-container" bind:this={container}>
    {#if $boardStore[title]}
      {#each $boardStore[title] as task}
        <Card description={task.description} />
      {/each}
    {/if}
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
