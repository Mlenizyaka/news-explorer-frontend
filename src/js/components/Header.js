/* eslint-disable no-undef */
export default class Header {
  constructor(props) {
    this.isLoggedIn = props.isLoggedIn;
    this.userName = props.userName
  }

  render() {
    if (this.isLoggedIn) {
      document.querySelector('.authorization__button_not-authorized').classList.add('button_is-hidden');
      document.querySelector('.authorization__button_authorized').classList.remove('button_is-hidden');
      document.querySelector('.header__link_authorized').classList.remove('link_is-hidden');
    }
  }
}
