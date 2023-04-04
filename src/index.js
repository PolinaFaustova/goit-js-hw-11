'use strict';
import { PixabayAPI } from './PixabayAPI';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const searchForm = document.querySelector('#search-form');
const inputForm = document.querySelector('input[type="text"]');
const btnSubmit = document.querySelector('button[type="submit"]');
const galleryList = document.querySelector('.gallery');
let btnLoadMore = document.querySelector('button.load-more');

const pixabayApi = new PixabayAPI();

const renderGalleryCard = ({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => {
  return `
    <a href="${largeImageURL}" data-src="${largeImageURL}" data-caption="${tags}">
      <div class='photo-card'>
        <img src='${webformatURL}' alt='${tags}' loading='lazy' />
        <div class='info'>
          <p class='info-item'>
            <b>Likes</b> ${likes}
          </p>
          <p class='info-item'>
            <b>Views</b> ${views}
          </p>
          <p class='info-item'>
            <b>Comments</b> ${comments}
          </p>
          <p class='info-item'>
            <b>Downloads</b> ${downloads}
          </p>
        </div>
      </div>
    </a>
  `;
};

const createGalleryCards = images => {
  const galleryCards = images.map(renderGalleryCard);
  return galleryCards.join('');
};

const handleSearchFormSubmit = async event => {
  event.preventDefault();
  const searchQuery = inputForm.value.trim();

  if (!searchQuery) {
    Notiflix.Notify.warning(
      'Enter the correct data to search! Please try again.'
    );
    return;
  }

  pixabayApi.query = searchQuery;
  pixabayApi.page = 1;
  btnLoadMore.classList.add('is-hidden');

  try {
    const { data } = await pixabayApi.fetchPhoto();

    if (!data.hits.length) {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    const totalHits = data.totalHits;
    galleryList.innerHTML = createGalleryCards(data.hits);
    btnLoadMore.classList.remove('is-hidden');

    if (searchQuery !== '') {
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    }

    const lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh();
  } catch (err) {
    console.log(err);
  }
};

const handleBtnLoadMoreClick = async () => {
  pixabayApi.page += 1;

  try {
    const { data } = await pixabayApi.fetchPhoto();

    if (pixabayApi.page === Math.ceil(data.totalHits / 40)) {
      btnLoadMore.classList.add('is-hidden');
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    }
    galleryList.insertAdjacentHTML('beforeend', createGalleryCards(data.hits));
  } catch (err) {
    console.log(err);
  } finally {
    btnLoadMore.classList.add('is-hidden');
  }
};
searchForm.addEventListener('submit', handleSearchFormSubmit);
btnLoadMore.addEventListener('click', handleBtnLoadMoreClick);
