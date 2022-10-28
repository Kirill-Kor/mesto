import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(selector, submit) {
    super(selector);
    this._submitForm = submit;
    this._submitButton = this._popup.querySelector('.edit-form__save-button');
  }

  open(data, deleteHandler) {
    super.open();
    this._data = data;
    this._deleteHandler = deleteHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._submitForm(this._data);
      this._deleteHandler();
      this.close();
    } )
  }
}
