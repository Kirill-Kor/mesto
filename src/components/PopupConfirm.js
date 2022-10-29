import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(selector, submit) {
    super(selector);
    this._submitForm = submit;
    this._submitButton = this._popup.querySelector('.save-button');
  }

  open(data, callback) {
    super.open();
    this._data = data;
    this._callback = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._submitForm(this._data, this._callback);
      this.close();
    } )
  }
}
