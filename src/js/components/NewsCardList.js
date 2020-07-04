/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */

import NewsCard from "./NewsCard";

const noResults = document.querySelector('.no-results');
const newsBlock = document.querySelector('.news');
// const newsList = document.querySelector('.news-list');
const showMoreButton = document.querySelector('.news__show-more');

export default class NewsCardList {
  constructor(arrayOfcards, container, chunk) {
    this.arrayOfcards = arrayOfcards;
    this.container = container;
    this.chunk = chunk;
  }

  _render() {
    if (this.arrayOfcards.length === 0) {
      noResults.classList.add('no-results_is-opened');
      newsBlock.classList.remove('news_is-opened');
    } else {
      noResults.classList.remove('no-results_is-opened');
      newsBlock.classList.add('news_is-opened');
    }
  }

  renderResults() {
    const card = new NewsCard();

    this._render();
    const chunkOfCards = this.arrayOfcards.splice(0, this.chunk);
    chunkOfCards.forEach(data => {
      this.container.insertAdjacentHTML('beforeend', card.create(data));
      this._showMoreCards();

    });

    /* console.log("not logged");
    if (logged) {
      console.log("not logged");
      // card.renderIconLoggedIn();
    } */
  }

  renderSaved() {
    const card = new NewsCard();
    this.arrayOfcards.forEach(data => {
      this.container.insertAdjacentHTML('beforeend', card.createSaved(data));
    })
  }

  _showMoreCards() {
    if (this.arrayOfcards.length === 0) {
      showMoreButton.classList.add('news__show-more_is-hidden');
    } else {
      showMoreButton.classList.remove('news__show-more_is-hidden');
    }
  }

  removePreviousResults() {
    while (this.container.firstChild) this.container.removeChild(this.container.firstChild);
  }
}
