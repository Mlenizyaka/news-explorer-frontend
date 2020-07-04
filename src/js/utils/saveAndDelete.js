import MainApi from "../api/MainApi";
import MAIN_API_DATA from "../constants/main-api";

const api = new MainApi(MAIN_API_DATA);

export default function saveAndDelete(e) {
  if (e.target.classList.contains('news-card__icon')) {
    e.preventDefault();
  }

  // сохранить карточку
  if (e.target.classList.contains('news-card__icon_type_save')) {
    e.preventDefault();

    api.createArticle('/articles', e)
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(res)
        }
        return res.json()
      })
      .then(res => {
        const createdArticle = e.target.closest('.news-card');

        createdArticle.id = res.data._id;
        e.target.classList.remove('news-card__icon_type_save');
        e.target.classList.add('news-card__icon_type_saved');
      })
      .catch(err => console.log(err))
  }

  // удалить карточку
  if (e.target.classList.contains('news-card__icon_type_delete')) {
    e.preventDefault();
    api.removeArticle(`/articles/${e.target.closest('.news-card__link').id}`, e)
      .then(res => {
        if (!res.ok) {
          return Promise.reject(res)
        }
        return res.json()
      })
      .then(() => {
        e.target.closest('.news-card').remove();
      })
      .catch(err => console.log(err))
  }
}
