<script>
  import store from './store';

  import NavBar from './components/NavBar.svelte';
  import List from './components/List.svelte';

  import { dndzone } from 'svelte-dnd-action';
  import { flip } from 'svelte/animate';

  const handleDrag = (e) => {
    store.update((arr) => {
      arr = e.detail.items;
      localStorage.setItem('store', JSON.stringify(arr));
      return arr;
    });
  };
</script>

<main>
  <NavBar />
  <section
    use:dndzone={{
      items: $store,
      flipDurationMs: 200,
      type: 'lists',
      dropTargetStyle: '',
    }}
    on:consider={handleDrag}
    on:finalize={handleDrag}
  >
    {#each $store as board (board.id)}
      <div animate:flip={{ duration: 200 }}>
        <List {board} />
      </div>
    {/each}
  </section>
</main>

<style>
</style>
