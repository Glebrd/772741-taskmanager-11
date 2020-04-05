export const createTaskTemplate = () => {
  return (
    `<article class="card card--black">
  <div class="card__form">
    <div class="card__inner">
      <div class="card__control">
        <button class="card__btn card__btn--edit" type="button">
          edit
        </button>
        <button class="card__btn card__btn--archive" type="button">
          archive
        </button>
        <button class="card__btn card__btn--favorites card__btn--disabled" type="button">
          favorites
        </button>
      </div>

      <div class="card__color-bar">
        <svg class="card__color-bar-wave" height="10" width="100%">
          <use xlink:href="#wave"></use>
        </svg>
      </div>

      <div class="card__textarea-wrap">
        <p class="card__text">Example default task with default color.</p>
      </div>

      <div class="card__settings">
        <div class="card__details">
          <div class="card__dates">
            <div class="card__date-deadline">
              <p class="card__input-deadline-wrap">
                <span class="card__date">23 September</span> <span class="card__time">16:15</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</article>`
  );
};
