import Popup from "./Popup";

export default class PopupAuth extends Popup {
  constructor(container, formValidation) {
    super(container);
    this.formValidation = formValidation;
  }

  open(e) {
    if (e.target.classList.contains('authorization__button_not-authorized') || e.target.classList.contains('popup__link_type_authorization')) {
      this.container.classList.add('popup_is-opened');
      this.deactivateButton();
      this.removeErrors();
      this.form.reset();
    }
  }

  close(e) {
    if (e.target.classList.contains('popup__close') || e.target.classList.contains('popup') || e.target.classList.contains('popup__link_type_registration')) {
      this.container.classList.remove('popup_is-opened');
    }
  }
}
