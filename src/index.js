'use strict';
import { PixabayAPI } from './PixabayAPI';
import Notiflix from 'notiflix';

const searchForm = document.querySelector('#search-form');
const inputForm = document.querySelector('input[type="text"]');
const btnSubmit = document.querySelector('button[type="submit"]');
const galleryList = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const searchQuery = inputForm.value.trim();
});
