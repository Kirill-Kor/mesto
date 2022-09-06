function enableValidation(config) {
  const inputs = Array.from(config.inputSelector);

  function showInputError(input, errorField, message) {
    input.classList.add('edit-form__field_type_error');
    errorField.textContent = message;
  }

  function hideInputError(input, errorField) {
    input.classList.remove('edit-form__field_type_error');
    errorField.textContent = '';
  }

  function setButtonActive(config) {
    config.submitButtonSelector.classList.remove(config.inactiveButtonClass);
    config.submitButtonSelector.disabled = false;

  }

  function setButtonDisable(config) {
    config.submitButtonSelector.classList.add(config.inactiveButtonClass);
    config.submitButtonSelector.disabled = true;

  }

  function isValid(input) {
    return input.validity.valid;
  }

  function checkValidation(input, config) {
    const errorField = document.querySelector(`.${input.id}-error`);

    if (!isValid(input)) {
      showInputError(input, errorField, input.validationMessage);
      setButtonDisable(config);
    }
    else {
      hideInputError(input, errorField);
      if (inputs.every(isValid)) {
        setButtonActive(config);
      };
    }
  }

  function setHandlers(config) {
    inputs.forEach((input) => {

      input.addEventListener('input', (evt) => {
        checkValidation(evt.target, config);
      })
    })
  }


  setHandlers(config);
  return {button: config.submitButtonSelector, disabled: config.submitButtonSelector.disabled};


}
