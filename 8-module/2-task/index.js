import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    const productsGrid = createElement(
      `<div class="products-grid">
              <div class="products-grid__inner" />
            </div>`);

    const initialProducts = products.map(product => new ProductCard(product).elem);
    productsGrid.querySelector('.products-grid__inner').append(...initialProducts);

    this.elem = productsGrid;
  }

  updateFilter(filters) {
    this.filters = {...this.filters, ...filters};

    const filteredProducts = this.products.filter(product => {
      if (product.nuts && this.filters.noNuts) {
        return false;
      }
      if (!product.vegeterian && this.filters.vegeterianOnly) {
        return false;
      }
      if (product.spiciness > this.filters.maxSpiciness) {
        return false;
      }
      if (this.filters.category && product.category !== this.filters.category) {
        return false;
      }
      return true;
    }).map(product => new ProductCard(product).elem);

    this.elem.querySelector('.products-grid__inner').innerHTML = "";
    this.elem.querySelector('.products-grid__inner').append(...filteredProducts);
  }
}
