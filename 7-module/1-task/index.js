import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    const categoriesElements = categories.map(category => {
      const categoryElement = createElement(`<a href="#" class="ribbon__item" data-id=${category.id}>${category.name}</a>`);

      categoryElement.addEventListener('click', (event) => {
        event.preventDefault();
        this.value = category;
        event.target.dispatchEvent(new CustomEvent('ribbon-select', {
          detail: category.id,
          bubbles: true
        }));
      });

      return categoryElement;
    });

    const ribbonMenu = createElement(`
    <div class="ribbon">
       <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
       </button>

      <nav class="ribbon__inner" />

      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>`);

    const ribbonInner = ribbonMenu.querySelector('.ribbon__inner');
    ribbonInner.append(...categoriesElements);

    ribbonInner.addEventListener('scrollend', (event) => {
      let scrollLeft = ribbonInner.scrollLeft;
      let scrollWidth = ribbonInner.scrollWidth;
      let clientWidth = ribbonInner.clientWidth;

      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft === 0) {
        ribbonMenu.querySelector('.ribbon__arrow_left').classList.remove('ribbon__arrow_visible');
      } else {
        ribbonMenu.querySelector('.ribbon__arrow_left').classList.add('ribbon__arrow_visible');
      }

      if (scrollRight < 1) {
        ribbonMenu.querySelector('.ribbon__arrow_right').classList.remove('ribbon__arrow_visible');
      } else {
        ribbonMenu.querySelector('.ribbon__arrow_right').classList.add('ribbon__arrow_visible');
      }
    });

    ribbonMenu.querySelector('.ribbon__arrow_left').addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);
    });

    ribbonMenu.querySelector('.ribbon__arrow_right').addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0);
    });

    this.elem = ribbonMenu;
  }
}
