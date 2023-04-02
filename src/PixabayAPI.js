'use strict';
import Notiflix from 'notiflix';
import axios from 'axios';

export class PixabayAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '34956140-3027e5abb464d64a1ffd53e5a';

  page = 1;
  query = null;

  async fetchPhoto() {
    try {
      return axios.get(`${this.#BASE_URL}/search/photos`, {
        params: {
          key: this.#API_KEY,
          q: this.query,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          per_page: 40,
        },
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
