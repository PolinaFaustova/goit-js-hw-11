'use strict';
import { PixabayAPI } from './PixabayAPI';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const searchForm = document.querySelector('#search-form');
const inputForm = document.querySelector('input[type="text"]');
const btnSubmit = document.querySelector('button[type="submit"]');
const galleryList = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');

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
  return ` <div class='photo-card'>
  //   <img src='${webformatURL}' alt='${tags}' loading='lazy' />
  //   <div class='info'>
  //     <p class='info-item'>
  //       <b>Likes</b> ${likes}
  //     </p>
  //     <p class='info-item'>
  //       <b>Views</b> ${views}
  //     </p>
  //     <p class='info-item'>
  //       <b>Comments</b> ${comments}
  //     </p>
  //     <p class='info-item'>
  //       <b>Downloads</b> ${downloads}
  //     </p>
  //   </div>
  // </div>`;
};

const createGalleryCards = images => {
  const galleryCards = images.map(renderGalleryCard);
  return galleryCards.join('');
};

const handleSearchFormSubmit = async event => {
  event.preventDefault();
  const searchQuery = inputForm.value.trim();
  pixabayApi.query = searchQuery;
  pixabayApi.page = 1;

  try {
    const { data } = await pixabayApi.fetchPhoto();

    if (!data.hits.length) {
      console.log(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    galleryList.innerHTML = createGalleryCards(data.hits);
    btnLoadMore.classList.remove('is-hidden');
  } catch (err) {
    console.log(err);
  } finally {
    btnLoadMore.classList.add('is-hidden');
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
  }
};
searchForm.addEventListener('submit', handleSearchFormSubmit);
btnLoadMore.addEventListener('click', handleBtnLoadMoreClick);
