class NewsCard {
  constructor() { }

  create(data) {
    return `
      <div class="news-card">
        <a href="${data.url}" class="news-card__link" target="_blank">
          <div class="news-card__image" style="background-image: url(${data.urlToImage});"></div>
          <button class="news-card__icon news-card__icon_type_save" type="button"></button>
          <div class="news-card__tooltip">
            <p class="news-card__tooltip-text">Войдите, чтобы сохранять статьи</p>
          </div>
          <div class="news-card__article">
            <span class="news-card__date">${data.publishedAt}</span>
            <h3 class="news-card__title">${data.title}</h3>
            <p class="news-card__text">${data.description}</p>
            <p class="news-card__sourse">${data.source.name}</p>
          </div>
        </a>
      </div>`;
  }



}
