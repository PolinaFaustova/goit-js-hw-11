'use strict';
import Notiflix from 'notiflix';

const searchForm = document.querySelector('#search-form');
const inputForm = document.querySelector('input[type="text"]');
const btnSubmit = document.querySelector('button[type="submit"]');

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const searchQuery = inputForm.value.trim();
});
