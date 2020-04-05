export const createFilterTemplate = () => {
  return `<section class="main__filter filter container">
  <input checked class="filter__input visually-hidden" id="filter__all" name="filter" type="radio"/>
  <label class="filter__label" for="filter__all"> All <span class="filter__all-count">13</span></label>
  <input class="filter__input visually-hidden" disabled id="filter__overdue" name="filter" type="radio"/>
  <label class="filter__label" for="filter__overdue">Overdue <span class="filter__overdue-count">0</span></label>
  <input class="filter__input visually-hidden" disabled id="filter__today" name="filter" type="radio"/>
  <label class="filter__label" for="filter__today">Today <span class="filter__today-count">0</span></label>
  <input class="filter__input visually-hidden" id="filter__favorites" name="filter" type="radio"/>
  <label class="filter__label" for="filter__favorites">Favorites <span class="filter__favorites-count">1</span></label>
  <input class="filter__input visually-hidden" id="filter__repeating" name="filter" type="radio"/>
  <label class="filter__label" for="filter__repeating">Repeating <span class="filter__repeating-count">1</span></label>
  <input class="filter__input visually-hidden" id="filter__archive" name="filter" type="radio"/>
  <label class="filter__label" for="filter__archive">Archive <span class="filter__archive-count">115</span></label>
</section>
`;
};
