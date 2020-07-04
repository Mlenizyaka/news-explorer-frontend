/* eslint-disable no-restricted-globals */
/* eslint-disable func-names */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-undef */
import "./index.css";
import Header from "./js/components/Header";
import PopupAuth from "./js/components/PopupAuth";
import PopupReg from "./js/components/PopupReg";
import PopupSuccess from "./js/components/PopupSuccess";
import { getDateForApi } from "./js/utils/dates";
import renderLoading from "./js/utils/renderLoading";
import saveAndDelete from "./js/utils/saveAndDelete";
import NewsCard from "./js/components/NewsCard";
import NewsCardList from "./js/components/NewsCardList";

import MainApi from "./js/api/MainApi";
import MAIN_API_DATA from "./js/constants/main-api";
import NewsApi from "./js/api/NewsApi";

import SearchForm from "./js/components/SearchForm";
import FormValidation from "./js/components/FormValidation";
import ERRORS from "./js/constants/errors";

// Попапы
const page = document.querySelector('.page');
const formValidation = new FormValidation(ERRORS.ru);

const popupAuth = new PopupAuth(document.querySelector('.popup_type_authorization'), formValidation);
const popupReg = new PopupReg(document.querySelector('.popup_type_registration'), formValidation);
const popupSuccess = new PopupSuccess(document.querySelector('.popup_type_registered'));
const searchForm = new SearchForm(document.querySelector('.search'), formValidation);

// Кнопки
const headerAuthButton = document.querySelector('.authorization__button_not-authorized');
const headerLogoutButton = document.querySelector('.authorization__button_authorized');
const headerLogoutUsername = document.querySelector('.authorization__button_username');
const savedArticlesLink = document.querySelector('.header__link_authorized');
const showMoreButton = document.querySelector('.news__show-more');

const card = new NewsCard();
const newsBlock = document.querySelector('.news');
const newsList = document.querySelector('.news-list');
const notFoundBlock = document.querySelector('.no-results');

// API
const api = new MainApi(MAIN_API_DATA);

const header = new Header({ isLoggedIn: true, userName: document.forms.authorization.elements.name });

// Проверяем авторизацию
const logged = localStorage.getItem("header");
const token = localStorage.getItem('token');
const name = localStorage.getItem("name");

// если вход был выполнен, будут отрисованы кнопки СохрСтатьи и Логаут с именем
if (logged && token) {
  header.render();
  headerLogoutUsername.textContent = name;
};

// Слушатели

page.addEventListener('click', e => {
  popupAuth.open(e);
  popupAuth.close(e);

  popupReg.open(e);
  popupReg.close(e);

  popupSuccess.close(e);
})

// валидация формы автооризации
popupAuth.form.addEventListener('input', e => {
  popupAuth.formValidation.validateAuth(e);
});

// авторизация
popupAuth.form.addEventListener('submit', e => {
  e.preventDefault();

  api.signin(popupAuth.form.elements.authEmail.value, popupAuth.form.elements.authPassword.value)
    .then(res => {
      if (res.ok) {
        return res.json()
      } if (res.status === 400) {
        return Promise.reject('Неправильные почта или пароль')
      }
      return Promise.reject('Сервер не отвечает')
    })
    .then(res => {
      localStorage.setItem("token", res.token)
      localStorage.setItem("header", header.isLoggedIn)
      header.render();
      popupAuth.container.classList.remove('popup_is-opened');
    })
    .then(() => {
      api.getUserData()
        .then(res => {
          if (res.ok) {
            return res.json()
          }
          return Promise.reject(res)
        })
        .then((res) => {
          localStorage.setItem("name", res.name)
          headerLogoutUsername.textContent = res.name
          location.reload();
        })
        .catch((err) => {
          console.log('Ошибка', err.status)
        })
    })
    .catch((err) => {
      console.log(err);
    })
});

// валидация формы регистрации
popupReg.form.addEventListener('input', e => {
  popupReg.formValidation.validateReg(e);
});

// регистрация
popupReg.form.addEventListener('submit', e => {
  e.preventDefault();

  api.signup(
    popupReg.form.elements.regName.value,
    popupReg.form.elements.regEmail.value,
    popupReg.form.elements.regPassword.value,
  )
    .then(res => {
      if (res.ok) {
        return res.json()
      } if (res.status === 400) {
        return Promise.reject('Неправильные почта или пароль')
      }
      return Promise.reject('Сервер не отвечает')
    })
    .then(() => {
      popupReg.container.classList.remove('popup_is-opened');
      popupSuccess.container.classList.add('popup_is-opened');
    })
    .catch((err) => {
      console.log(err);
    })
});

// выход из системы
headerLogoutButton.addEventListener('click', e => {
  api.logout()
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    })
    .then(() => {
      localStorage.clear();
      location.reload();
      headerAuthButton.classList.remove('button_is-hidden');
      headerLogoutButton.classList.add('button_is-hidden');
      savedArticlesLink.classList.add('link_is-hidden');
      searchForm.clearInput();
      newsBlock.classList.remove('news_is-opened');
    })
    .catch((err) => {
      console.log(err);
    });
})

// валидация формы поиска новостей
searchForm.form.addEventListener('input', e => {
  searchForm.formValidation.validateSearch(e);
});
searchForm.form.addEventListener('submit', e => {
  e.preventDefault();
  renderLoading(true);

  const startDate = new Date().toISOString().substr(0, 10);
  const endDate = getDateForApi(7);
  const pageSize = 100;

  const newsApi = new NewsApi({
    q: searchForm.form.elements.search.value,
    from: startDate,
    to: endDate,
    pageSize,
  });

  newsApi.getNews()
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res)
      }
      return res.json()
    })
    .then(res => {
      const newsCardList = new NewsCardList(res.articles, newsList, 3);
      newsCardList.removePreviousResults();
      newsCardList.renderResults();

      if (logged) {
        console.log('logged');
        card.renderIconLoggedIn();
      } else {
        console.log('not logged');
        card.renderIconLoggedOut();
      }

      showMoreButton.addEventListener('click', () => {
        newsCardList.renderResults.call(newsCardList);
      })
    })
    .then(() => {
      newsList.addEventListener('click', saveAndDelete);
    })
    .catch(() => {
      notFoundBlock.classList.add('no-results_is-opened');
    })
    .finally(() => {
      renderLoading(false);
    })
});
