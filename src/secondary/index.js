/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
import "./index.css";

import MainApi from "../js/api/MainApi";
import MAIN_API_DATA from "../js/constants/main-api";

// import NewsCard from "../js/components/NewsCard";
import NewsCardList from "../js/components/NewsCardList";
import saveAndDelete from "../js/utils/saveAndDelete";
import sortArray from "../js/utils/sortArray";

// API
const api = new MainApi(MAIN_API_DATA);

// константы
const headerLogoutButton = document.querySelector('.authorization__button_username');
const notFoundBlock = document.querySelector('.no-results');
const savedSection = document.querySelector('.saved-news');
const savedNewsList = document.querySelector('.news-list');

const amountOfCards = document.querySelector('.amount-of-cards');
const phraseEnding = document.querySelector('.phrase-ending');

const keywordsBlock = document.querySelector('.user-data__keywords');
const mainKeywords = document.querySelector('.user-data__main-keywords');
const otherKeywords = document.querySelector('.user-data__other-keywords');

headerLogoutButton.textContent = localStorage.getItem("name");
document.querySelector('.user-name').textContent = localStorage.getItem("name");

headerLogoutButton.addEventListener('click', () => {
  localStorage.clear();
  location.href = '../';
});

if (!localStorage.getItem('name') && !localStorage.getItem('token')) {
  location.href = '../';
};

api.getSavedCards('/articles')
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(res)
  })
  .then(res => {
    const savedCards = new NewsCardList(res.data, savedNewsList);
    savedCards.renderSaved();
    amountOfCards.textContent = res.data.length;

    if (res.data.length === 0) {
      savedSection.classList.add('saved-news_is-hidden');
      keywordsBlock.classList.add('user-data__keywords_is-hidden');
      notFoundBlock.classList.add('no-results_is-opened');
    };

    const lengthStr = res.data.length.toString();
    const lastDigit = lengthStr.slice(-1);
    const digitToNumber = Number(lastDigit);

    if (digitToNumber === 1) {
      phraseEnding.textContent = 'сохранённая статья';
    } else if (digitToNumber >= 2 && digitToNumber <= 4) {
      phraseEnding.textContent = 'сохранённых статьи';
    } else {
      phraseEnding.textContent = 'сохранённых статей';
    }

    const finalArray = sortArray(res.data);

    if (finalArray.length === 1) {
      mainKeywords.textContent = finalArray[0].keyword
    } else if (finalArray.length === 2) {
      mainKeywords.textContent = `${finalArray[0].keyword}, ${finalArray[1].keyword}`;
    } else if (finalArray.length === 3) {
      console.log(finalArray)
      mainKeywords.textContent = `${finalArray[0].keyword}, ${finalArray[1].keyword} и ${finalArray[2].keyword}`;
    } else {
      mainKeywords.textContent = `${finalArray[0].keyword}, ${finalArray[1].keyword}`
      otherKeywords.textContent = ` и ${finalArray.length - 2} другим`
    }
  })
  .then(() => {
    savedNewsList.addEventListener('click', saveAndDelete);
  })
