import AbstractComponent from "./abstract-component.js";

const createNotasksTemplate = () => {
  return (
    `<p class="board__no-tasks">
      Click «ADD NEW TASK» in menu to create your first task1
    </p>`
  );
};

export default class NoTasks extends AbstractComponent {
  getTemplate() {
    return createNotasksTemplate();
  }
}
