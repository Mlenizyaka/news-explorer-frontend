export default class Popup {
  constructor(container) {
    this.container = container;
    this.form = this.container.querySelector('.popup__form');
    this.button = this.container.querySelector('button');
  }

  deactivateButton() {
    this.button.setAttribute('disabled', true);
    this.button.classList.remove('popup__button_active');
  }

  activateButton() {
    this.button.removeAttribute('disabled');
    this.button.classList.add('popup__button_active');
  }

  removeErrors() {
    this.form.querySelectorAll(".error-message").forEach(error => {
      error.textContent = "";
    });
  }
}
