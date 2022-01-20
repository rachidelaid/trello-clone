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

  const conxDelete = () => {
    const selectedElm = document.querySelector('.on-top');

    if (selectedElm.classList.contains('card-wrap')) {
      const [brdId, cardId] = selectedElm.id.split('-');

      store.update((arr) => {
        const list = arr.find((l) => l.id === +brdId);
        list.items = list.items.filter((c) => c.id !== +cardId);

        localStorage.setItem('store', JSON.stringify(arr));
        return arr;
      });
    }

    if (selectedElm.classList.contains('list-wrap')) {
      store.update((arr) => {
        arr = arr.filter((l) => l.id !== +selectedElm.id);
        localStorage.setItem('store', JSON.stringify(arr));
        return arr;
      });
    }
  };

  const conxCopy = () => {
    const selectedElm = document.querySelector('.on-top');

    if (selectedElm.classList.contains('card-wrap')) {
      const [brdId, cardId] = selectedElm.id.split('-');

      store.update((arr) => {
        const list = arr.find((l) => l.id === +brdId);
        const cardCopy = { ...list.items.find((c) => c.id === +cardId) };
        cardCopy.id = Date.now();
        list.items.push(cardCopy);

        localStorage.setItem('store', JSON.stringify(arr));
        return arr;
      });
    }

    if (selectedElm.classList.contains('list-wrap')) {
      store.update((arr) => {
        const listCopy = { ...arr.find((l) => l.id === +selectedElm.id) };
        listCopy.title += '-copy';
        listCopy.id = Date.now();

        arr.push(listCopy);

        localStorage.setItem('store', JSON.stringify(arr));
        return arr;
      });
    }
  };

  const conxEdit = () => {
    const selectedElm = document.querySelector('.on-top');

    if (selectedElm.classList.contains('card-wrap')) {
      const [brdId, cardId] = selectedElm.id.split('-');

      const val = selectedElm.querySelector('.card');
      const inp = document.createElement('input');
      inp.value = val.innerText;
      val.innerHTML = '';
      val.append(inp);
      inp.focus();

      inp.addEventListener('change', () => {
        store.update((arr) => {
          const curBoard = arr.find((b) => b.id === +brdId);
          const curCard = curBoard.items.find((c) => c.id === +cardId);

          curCard.description = inp.value.trim();

          localStorage.setItem('store', JSON.stringify(arr));
          return arr;
        });
        val.innerHTML = inp.value.trim();
      });
    }

    if (selectedElm.classList.contains('list-wrap')) {
      selectedElm.querySelector('input').focus();
    }
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
      conxDelete();
    }

    if (e.target.id === 'copy') {
      conxCopy();
    }

    if (e.target.id === 'edit') {
      conxEdit();
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
