/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
import { getDateForCards } from "../utils/dates";

export default class NewsCard {

  create(data) {
    return `
      <a href="${data.url}" class="news-card__link link" target="_blank">
        <div class="news-card">
          <img class="news-card__image" src="${data.urlToImage}">
          <button class="news-card__icon news-card__icon_type_save" type="button"></button>
          <div class="news-card__tooltip news-card__tooltip_is-hidden">
            <p class="news-card__tooltip-text">Войдите, чтобы сохранять статьи</p>
          </div>
          <div class="news-card__article">
            <span class="news-card__date">${getDateForCards(new Date(data.publishedAt))}</span>
            <h3 class="news-card__title">${data.title}</h3>
            <p class="news-card__text">${data.description}</p>
            <p class="news-card__sourse">${data.source.name}</p>
          </div>
        </div>
      </a>`;
  }

  createSaved(data) {
    return `
      <a href="${data.link}" class="news-card__link link" target="_blank" id="${data._id}">
        <div class="news-card">
          <img class="news-card__image" src="${data.image}">
          <div class="news-card__keyword">
              <p class="news-card__keyword-text">${data.keyword}</p>
            </div>
          <button class="news-card__icon news-card__icon_type_delete" type="button"></button>
          <div class="news-card__tooltip">
            <p class="news-card__tooltip-text">Убрать из сохранённых</p>
          </div>
          <div class="news-card__article">
            <span class="news-card__date">${data.date}</span>
            <h3 class="news-card__title">${data.title}</h3>
            <p class="news-card__text">${data.text}</p>
            <p class="news-card__sourse">${data.source}</p>
          </div>
        </div>
      </a>`;
  }

  renderIconLoggedOut() {
    document.querySelectorAll('.news-card__tooltip').forEach(item => {
      item.classList.remove('news-card__tooltip_is-hidden');
    })
  }

  renderIconLoggedIn() {
    document.querySelectorAll('.news-card__tooltip').forEach(item => {
      item.classList.add('news-card__tooltip_is-hidden');
    })
  }

}
