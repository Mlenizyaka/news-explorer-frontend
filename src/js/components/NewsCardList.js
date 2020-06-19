
// import NewsCard from './NewsCard';

const noResults = document.querySelector('.no-results');
const newsBlock = document.querySelector('.news');
const newsList = document.querySelector('.news-list');
const showMoreButton = document.querySelector('.news__show-more');

class NewscardList {
  constructor(arrayOfcards, container, chunk) {
    this.arrayOfcards = arrayOfcards;
    this.container = container;
    this.chunk = chunk
  }

  render() {
    if (this.arrayOfcards.length === 0) {
      noResults.classList.add('no-results_is-opened');
      newsBlock.classList.remove('news_is-opened');
    } else {
      noResults.classList.remove('no-results_is-opened');
      newsBlock.classList.add('news_is-opened');
    }
  }
}
