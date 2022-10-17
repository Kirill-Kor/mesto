export default class UserInfo {
  constructor(nameSelector, infoSelector) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
  }

  getUserInfo() {
    return {name: this._name.textContent, info: this._info.textContent};
  }

  setUserInfo({name, info}) {
    const profileName = document.querySelector('.profile__name');
    const profileDescription = document.querySelector('.profile__description');
    profileName.textContent = name;
    profileDescription.textContent = info;
  }
}
