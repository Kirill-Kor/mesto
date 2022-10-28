export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(renderedItems) {
    renderedItems.forEach((item) => {
      this._renderer(item);

    })
  }

  addItem(element, toEnd) {
    if(toEnd) {
      this._container.append(element)
    }
    else {
      this._container.prepend(element);
    }

  }
}
