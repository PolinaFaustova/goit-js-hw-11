'use strict';
import Notiflix from 'notiflix';
import axios from 'axios';

export class PixabayAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '34956140-3027e5abb464d64a1ffd53e5a';
  #perPage = 40;

  page = 1;
  query = null;

  async fetchPhoto() {
    try {
      return await axios.get(`${this.#BASE_URL}/search/photos`, {
        params: {
          key: this.#API_KEY,
          q: this.query,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          page: this.page,
          per_page: this.#perPage,
        },
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
