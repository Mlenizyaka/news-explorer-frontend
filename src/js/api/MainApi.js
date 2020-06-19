export default class MainApi {
  constructor(options) {
    this.url = options.url;
  }

  signup(name, email, password) {
    // eslint-disable-next-line no-undef
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      //  credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      })
    })
  }

  signin(email, password) {
    // eslint-disable-next-line no-undef
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      })
    })
  }

  getUserData() {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
  }

  logout() {
    return fetch(`${this.url}/logout`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  getArticles(path) {
    return fetch(`${this.url}${path}`, {
      method: 'GET',
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
  }

  createArticle(path, e) {
    return fetch(`${this.url}${path}`, {
      method: 'POST',
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        keyword: document.forms.search.elements.search.value,
        title: e.target.closest('.news-card').querySelector('.news-card__title').innerHTML,
        text: e.target.closest('.news-card').querySelector('.news-card__text').innerHTML,
        date: e.target.closest('.news-card').querySelector('.news-card__date').innerHTML,
        source: e.target.closest('.news-card').querySelector('.news-card__sourse').innerHTML,
        link: e.target.closest('.news-card').href,
        image: e.target.closest('.news-card').querySelector('.news-card__image').src,
      })
    })
  }

  removeArticle(path, e) {
    return fetch(`${this.url}${path}`, {
      method: 'DELETE',
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
  }
}
