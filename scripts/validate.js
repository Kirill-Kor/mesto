
  class FormValidator {
    constructor(config, form) {
      this._config = config;
      this._form = form;
    }

    enableValidation() {
       this._form.addEventListener('submit', (evt) => evt.preventDefault());
       this._setHandlers();
    }

    _setHandlers() {
      const inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector));
      inputs.forEach((input) => {
        input.addEventListener('input', (evt) => {
          this._checkValidation(evt.target);
        })
      })
    }

    _checkValidation(input) {
      const errorField = this._form.querySelector(`.${input.id}-error`);

      if (!this._isValid(input)) {
        this._showInputError(errorField, input);
        this.setButtonDisable();
      }
       else {
         this.hideInputError(errorField, input);

         if (Array.from(this._form.querySelectorAll(this._config.inputSelector)).every(this._isValid)) {
           this.setButtonActive();
         };
       }
    }

    _isValid(input) {
      return input.validity.valid;
    }

    _showInputError(errorField, input) {
      input.classList.add(this._config.inputErrorClass);
      errorField.textContent = input.validationMessage;
    }

    hideInputError(errorField, input) {
      input.classList.remove(this._config.inputErrorClass);
      errorField.textContent = '';
    }

    setButtonDisable() {
      const submitButton = this._form.querySelector(this._config.submitButtonSelector);
      submitButton.classList.add(this._config.inactiveButtonClass);
      submitButton.disabled = true;
    }

    setButtonActive() {
      const submitButton = this._form.querySelector(this._config.submitButtonSelector);
      submitButton.classList.remove(this._config.inactiveButtonClass);
      submitButton.disabled = false;

    }
  }





