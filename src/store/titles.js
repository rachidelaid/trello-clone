import { writable } from 'svelte/store';

const titles = localStorage.getItem('titles')
  ? JSON.parse(localStorage.getItem('titles'))
  : [];

const titleStore = writable(titles);

export default titleStore;
