export default class SearchForm {
  constructor(container, formValidation) {
    this.container = container;
    this.form = this.container.querySelector('.search__form');
    this.button = this.container.querySelector('button');
    this.formValidation = formValidation;
  }

  clearInput() {
    this.form.reset();
  }
}
