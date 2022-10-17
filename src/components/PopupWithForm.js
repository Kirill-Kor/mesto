import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, submitForm, getPrimaryValues) {
    super(selector);
    this._formElement = this._popup.querySelector('.edit-form');
    this._submit = submitForm;
    this._formFields = Array.from(this._formElement.querySelectorAll('.edit-form__field'));
    this._getPrimaryValues = getPrimaryValues;
  }

  _getInputValues() {
    return this._formFields.reduce((inputValues, value)=> {
      inputValues[value.name] = value.value;
      return inputValues;
    }, {});

  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt)=> {
      evt.preventDefault();
      this._submit(this._getInputValues());
      this.close();

    });
  }

  open() {
    super.open();
    if(this._getPrimaryValues) {
      this._formFields[0].value = this._getPrimaryValues().name;
      this._formFields[1].value = this._getPrimaryValues().info;
    }
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
