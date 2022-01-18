import { writable } from 'svelte/store';

const arr = localStorage.getItem('store')
  ? JSON.parse(localStorage.getItem('store'))
  : [];

const store = writable(arr);

export default store;
