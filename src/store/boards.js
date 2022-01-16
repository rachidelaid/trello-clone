import { writable } from 'svelte/store';

const boards = localStorage.getItem('boards')
  ? JSON.parse(localStorage.getItem('boards'))
  : null;

const boardStore = writable(boards);

export default boardStore;
