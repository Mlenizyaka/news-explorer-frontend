/* eslint-disable func-names */
/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-undef */
import "./index.css";
import Header from "./js/components/Header";
// import Popup from "./js/components/Popup";
import PopupAuth from "./js/components/PopupAuth";
import PopupReg from "./js/components/PopupReg";
import PopupSuccess from "./js/components/PopupSuccess";
// import { getDateForApi } from './js/utils/dates';

import MainApi from "./js/api/MainApi";
// import NewsApi from "./js/api/NewsApi";

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
// const popupWayReg = document.querySelector('.popup__link_type_registration');
// const popupClose = document.querySelector('.popup__close');


// API
const api = new MainApi({
  url: 'https://api.mlews.site',
});

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
      //  article.renderIconAuth();
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
          // location.reload();
        })
        .catch((err) => {
          console.log('Ошибка', err.status)
        })
    })
  /*
.catch(err => commonAuthError.textContent = err)
.finally(() => {
 loginFormClass.unlockButton(e.target);
 loginFormClass.unlockInputs(e.target)
}) */
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
  /*
  .catch(err => commonRegError.textContent = err)
  .finally(() => {
    registrationFormClass.unlockButton(event.target);
    registrationFormClass.unlockInputs(event.target);
  }) */
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
    .then((res) => {
      /* сохр статьи - скрыты
      * кнопка с именем - скрыта
      * кнопка авторизоваться - появилась
      * инпут поиска новостей - очищен
      *
      * найденные статьи - стерты
      * иконки статей:
      * надпись войдите чтобы сохранить
      * нет возможности сохранить
      */
      localStorage.clear();
      headerAuthButton.classList.remove('button_is-hidden');
      headerLogoutButton.classList.add('button_is-hidden');
      savedArticlesLink.classList.add('link_is-hidden');
      searchForm.clearInput();
    })
    .catch((err) => {
      console.log(err);
      // alert(texts.errorPlusInternet);
    });
})

// валидация формы поиска новостей
searchForm.form.addEventListener('input', e => {
  searchForm.formValidation.validateSearch(e);
});
searchForm.form.addEventListener('submit', e => {
  e.preventDefault();

  const url = `https://newsapi.org/v2/everything?` +
    `q=Apple&` +
    `from=2020-06-18&` +
    `sortBy=popularity&` +
    `apiKey=ce6a234ec3974768af2db89e96451532`;

  const req = new Request(url);

  fetch(req)
    .then(function (response) {
      console.log(response.json());
    })

});

  // console.log(newsApi);
/*

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
      if (res.ok) {
        console.log(res.json);
        // return res.json()
      }
      return Promise.reject(res)
    })
*/

