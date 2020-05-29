//module7-task1
import LoadMoreButtonComponent from "../components/load-more-button.js";
import NoTasksComponent from "../components/no-tasks.js";
import SortComponent, {SortType} from "../components/sort.js";
import TaskController from "./task";
import TasksComponent from "../components/tasks.js";
import {render, remove, RenderPosition} from "../utils/render.js";

//Сначала мы работали кусками htmal кода задач, потом с элеменатми задач, потом выделели их в компоненты, теперь мы обращаемся к контролеру и его методам.

// 1
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;
// Если раньше мы просто рендерили компоненты то теперь мы проходимся по всем таскам и на каждую задачу создаём отдельный инстанс (экзмепляр)( такс контроллера
// У каждого инстанса вызываем метод рендер и передаём ему данные задачи
const renderTasks = (taskListElement, tasks, onDataChange, onViewChange) => {
  return tasks.map((task) => {
    const taskController = new TaskController(taskListElement, onDataChange, onViewChange);

    taskController.render(task);
    // Возвращаем инстанс таск контроллера
    return taskController;
  });
};

const getSortedTasks = (tasks, sortType, from, to) => {
  let sortedTasks = [];
  const showingTasks = tasks.slice();

  switch (sortType) {
    case SortType.DATE_UP:
      sortedTasks = showingTasks.sort((a, b) => a.dueDate - b.dueDate);
      break;
    case SortType.DATE_DOWN:
      sortedTasks = showingTasks.sort((a, b) => b.dueDate - a.dueDate);
      break;
    case SortType.DEFAULT:
      sortedTasks = showingTasks;
      break;
  }

  return sortedTasks.slice(from, to);
};

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._tasks = [];
    this._showedTaskControllers = [];
    this._showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();


    this._onDataChange = this._onDataChange.bind(this);

    // Чтоб внутри обработчика зис ссылался на наш класс доски
    // ///// Протестить
    // /////////////////
    // Связываем метод класа боард с зис класса. Т.к. метод будем навешивать через эвенет листенер.
    // А в эвент листенере, этот метод потеряется. Т.к. зис станет источник эвента.
    // Т.е. чтобы внутри обработчика события зис ссылался на класс доски а не на тот элемент, где произошлои событие 9как он это делает по умолчанию)
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    // Когда закрываем одну карточку, то закрываем остальные
    // Этот метод будет вызываться из контролера таска.
    // И если не прописать бинд. то метод будет искаться в самом контролере таска
    // Мы могли бы вызвать метод контролера борд из контролера таска без бинда.
    // Вот так: board._onViewchange. Однако, тогда контролер карточки уже не будет независимым,
    // т.к. будет знать о внутреннем устройства контролера доски.
    // По сути дела,замы сел заключается в том, что контроллер доски не должен знать, какой
    // метод он вызывает. Он вызывет любой мтеод, которы будет передан в качестве колбека
    // при создании его инстанса (т.е. инстанса контролера доски)
    this._onViewChange = this._onViewChange.bind(this);
    // Передаём этот метод, в интерфейс сорт компонента, где его и навесим для обработки события.
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  render(tasks) {
    this._tasks = tasks;

    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTasksComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._tasksComponent, RenderPosition.BEFOREEND);

    const taskListElement = this._tasksComponent.getElement();
    // renderTasks возвращает массив из инстансов контроллеров
    const newTasks = renderTasks(taskListElement, this._tasks.slice(0, this._showingTasksCount), this._onDataChange, this._onViewChange);
    this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);

    this._renderLoadMoreButton();
  }

  _renderLoadMoreButton() {

    remove(this._loadMoreButtonComponent);

    if (this._showingTasksCount >= this._tasks.length) {
      return;
    }

    const container = this._container.getElement();
    render(container, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = this._showingTasksCount;
      const taskListElement = this._tasksComponent.getElement();
      this._showingTasksCount = this._showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

      const sortedTasks = getSortedTasks(this._tasks, this._sortComponent.getSortType(), prevTasksCount, this._showingTasksCount);
      const newTasks = renderTasks(taskListElement, sortedTasks, this._onDataChange, this._onViewChange);

      this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);

      if (this._showingTasksCount >= this._tasks.length) {
        remove(this._loadMoreButtonComponent);
      }
    });
  }

  _onDataChange(oldData, newData) {
    const index = this._tasks.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }
    console.log(index);
    this._tasks = [].concat(this._tasks.slice(0, index), newData, this._tasks.slice(index + 1));
    this._showedTaskControllers[index].render(this._tasks[index]);
  }

  // _onDataChange(taskController, oldData, newData) {
  //   const index = this._tasks.findIndex((it) => it === oldData);
  //
  //   if (index === -1) {
  //     return;
  //   }
  //
  //   const fuck = this._showedTaskControllers.find((it) =>
  //     it._taskComponent._task === oldData);
  //   console.log(fuck);
  //   // console.log(oldData);
  //   // console.log(this._showedTaskControllers);
  //
  //   this._tasks = [].concat(this._tasks.slice(0, index), newData, this._tasks.slice(index + 1));
  //   // console.log(this._tasks[1].isArchive);
  //   fuck.render(this._tasks[index]);
  // }
  _onViewChange() {
    // console.log(this);
    // Реализация разделена. То что вызывает описнао в борде, потом, что это задача патеран обзервер.
    // А то что происходит,описано в контролере конкретно карточке.
    // В таск контролере.
    // Для патерна обсервер у нас есть 2 сущности.
    //     //   Первый это контроллер доски который сам и есть реализация паттерна обсервер
    //     // в нем есть свойство для хранения всех,кто подписался. В неём есть метод, который уведомляет
    //     // тех кто подписался на уведомление. А сама реализация описана непосредственно в контролере задачи, который подписывался на эти изменения.
    this._showedTaskControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    this._showingTasksCount = SHOWING_TASKS_COUNT_BY_BUTTON;

    const sortedTasks = getSortedTasks(this._tasks, sortType, 0, this._showingTasksCount);
    const taskListElement = this._tasksComponent.getElement();

    taskListElement.innerHTML = ``;

    const newTasks = renderTasks(taskListElement, sortedTasks, this._onDataChange, this._onViewChange);
    this._showedTaskControllers = newTasks;

    this._renderLoadMoreButton();
  }
}
