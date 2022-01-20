<script>
  import store from './store';

  import NavBar from './components/NavBar.svelte';
  import List from './components/List.svelte';
  import Modal from './components/Modal.svelte';

  import { dndzone } from 'svelte-dnd-action';
  import { flip } from 'svelte/animate';

  let modal;
  let position;

  const handleDrag = (e) => {
    store.update((arr) => {
      arr = e.detail.items;
      localStorage.setItem('store', JSON.stringify(arr));
      return arr;
    });
  };

  const showModal = (e) => {
    e.preventDefault();

    if (
      modal ||
      (!e.target.classList.contains('list') &&
        !e.target.classList.contains('card'))
    ) {
      return;
    }

    document
      .querySelectorAll('.on-top')
      .forEach((c) => c.classList.remove('on-top'));

    e.target.parentNode.classList.add('on-top');

    const { top, right, left } = e.target.getBoundingClientRect();
    position = { top, right };

    if (window.innerWidth < right + 105) {
      position.right = left - 105;
    }

    modal = true;
  };

  const handleModal = (e) => {
    if (e.target.id === 'delete') {
      const selectedElm = document.querySelector('.on-top');

      if (selectedElm.classList.contains('list-wrap')) {
        store.update((arr) => {
          arr = arr.filter((l) => l.id !== +selectedElm.id);
          localStorage.setItem('store', JSON.stringify(arr));
          return arr;
        });
      }
    }

    modal = false;
  };
</script>

<main>
  {#if modal}
    <Modal {position} on:click={handleModal} />
  {/if}
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
      <div animate:flip={{ duration: 200 }} id={board.id} class="list-wrap">
        <List {board} on:contextmenu={showModal} />
      </div>
    {/each}
  </section>
</main>

<style>
</style>
