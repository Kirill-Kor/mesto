

  function showInputError(input, errorField, message) {
    input.classList.add('edit-form__field_type_error');
    errorField.textContent = message;
  }

  function hideInputError(input, errorField) {
    input.classList.remove('edit-form__field_type_error');
    errorField.textContent = '';
  }

  function setButtonActive(config, form) {
    const submitButton = form.querySelector(config.submitButtonSelector);
    submitButton.classList.remove(config.inactiveButtonClass);
    submitButton.disabled = false;

  }

  function setButtonDisable(config, form) {
    const submitButton = form.querySelector(config.submitButtonSelector);
    submitButton.classList.add(config.inactiveButtonClass);
    submitButton.disabled = true;

  }

  function isValid(input) {
    return input.validity.valid;
  }

  function checkValidation(input, config, form) {
    const errorField = form.querySelector(`.${input.id}-error`);

    if (!isValid(input)) {
      showInputError(input, errorField, input.validationMessage);
      setButtonDisable(config, form);
    }
    else {
      hideInputError(input, errorField);
      if (Array.from(form.querySelectorAll(config.inputSelector)).every(isValid)) {
        setButtonActive(config, form);
      };
    }
  }

  function setHandlers(config, form) {
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    inputs.forEach((input) => {
      input.addEventListener('input', (evt) => {

        checkValidation(evt.target, config, form);

      })
    })
  }

  function enableValidation(config) {
    const forms = Array.from(document.querySelectorAll(config.formSelector));
    forms.forEach(form => {
      form.addEventListener('submit', (evt) => evt.preventDefault());
      setHandlers(config, form);
    })

  }



