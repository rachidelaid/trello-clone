<script>
  import store from './store';

  import NavBar from './components/NavBar.svelte';
  import List from './components/List.svelte';

  import { dndzone } from 'svelte-dnd-action';

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
      <List {board} />
    {/each}
  </section>
</main>

<style>
</style>
