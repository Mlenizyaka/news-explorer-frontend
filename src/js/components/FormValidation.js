/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
export default class FormValidation {
  constructor(errors) {
    this.errors = errors;
  }

  // поле пустое?
  _isInputEmpty(e, ...inputs) {

    if (e.target.value.length === 0) {
      inputs.forEach(input => {
        if (e.target.name === input.name) {
          document.querySelector(`#${input.name}`).textContent = this.errors.emptyInput;
        }
      });
    }
  }

  // длина поля достаточна?
  _isLengthValid(e, ...inputs) {
    if (e.target.value.length < 3 || e.target.value.length > 30) {
      inputs.forEach(input => {
        if (e.target.name === input.name) {
          document.querySelector(`#${input.name}`).textContent = this.errors.wrongLength;
        }
      });
    }
  }

  // длина пароля достаточна?
  _isPasswordLengthValid(e, ...inputs) {
    if (e.target.value.length < 9 || e.target.value.length > 16) {
      inputs.forEach(input => {
        if (e.target.name === input.name) {
          document.querySelector(`#${input.name}`).textContent = this.errors.wrongLengthPassword;
        }
      });
    }
  }

  // поле корректно?
  _isInputCorrect(e, ...inputs) {
    if (e.target.validity.valid) {
      inputs.forEach(input => {
        if (e.target.name === input.name) {
          document.querySelector(
            `#${input.name}`
          ).textContent = this.errors.correctInput;
        }
      });
    }
  }

  // почта соответствует шаблону?
  _isEmailCorrect(e, ...inputs) {
    if (!e.target.validity.patternMismatch) {
      this._isInputEmpty(e, ...inputs);
    } else {
      inputs.forEach(input => {
        if (e.target.name === input.name) {
          document.querySelector(`#${input.name}`).textContent = this.errors.invalidEmail;
        }
      });
    }
  }

  _removeErrors(e) {
    e.currentTarget.querySelectorAll('.error-message').forEach(error => {
      error.textContent = '';
    });
  }

  _activateButton(e) {
    const button = e.currentTarget.querySelector('button');
    button.removeAttribute('disabled');
    button.classList.add('button_active');
  }

  _deactivateButton(e) {
    const button = e.currentTarget.querySelector('button');
    button.setAttribute('disabled', true);
    button.classList.remove('button_active');
  }

  // валидно по всем признакам?
  // форма авторизации
  validateAuth(e) {
    const [authEmail, authPassword] = e.currentTarget.elements;

    if (!authEmail.validity.valid || !authPassword.validity.valid) {
      this._isInputEmpty(e, authPassword);
      this._isPasswordLengthValid(e, authPassword);
      this._isInputCorrect(e, authEmail, authPassword);
      this._isEmailCorrect(e, authEmail);
      this._deactivateButton(e);
    } else {
      this._removeErrors(e);
      this._activateButton(e);
    }
  }

  // форма регистрации
  validateReg(e) {
    const [regEmail, regPassword, regName] = e.currentTarget.elements;

    if (!regEmail.validity.valid || !regPassword.validity.valid || !regName.validity.valid) {
      this._isInputEmpty(e, regPassword, regName);
      this._isPasswordLengthValid(e, regPassword);
      this._isLengthValid(e, regName);
      this._isInputCorrect(e, regEmail, regPassword, regName);
      this._isEmailCorrect(e, regEmail);
      this._deactivateButton(e);
    } else {
      this._removeErrors(e);
      this._activateButton(e);
    }
  }

  // форма поиска новостей
  validateSearch(e) {
    const [search] = e.currentTarget.elements;

    if (!search.validity.valid) {
      this._isInputEmpty(e, search);
      this._isLengthValid(e, search);
      this._deactivateButton(e);
    } else {
      this._removeErrors(e);
      this._activateButton(e);
    }
  }
}
