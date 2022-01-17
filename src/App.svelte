<script>
  import titleStore from './store/titles';

  import NavBar from './components/NavBar.svelte';
  import List from './components/List.svelte';
</script>

<main>
  <NavBar />
  <section>
    {#each $titleStore as title, id}
      <List {title} {id} />
    {/each}
  </section>
</main>

<style>
</style>
