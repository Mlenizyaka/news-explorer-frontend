export default class PopupSuccess {
  constructor(container) {
    this.container = container;
  }

  close(e) {
    if (
      e.target.classList.contains('popup__close') ||
      e.target.classList.contains('popup') ||
      e.target.classList.contains('popup__link_type_authorization')
    ) {
      this.container.classList.remove('popup_is-opened');
    }
  }
}
