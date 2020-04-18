import {createElement} from "../utils";

const createNotasksTemplate = () => {
  return (
    `<p class="board__no-tasks">
      Click «ADD NEW TASK» in menu to create your first task1
    </p>`
  );
};

export default class NoTasks {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNotasksTemplate();
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}
