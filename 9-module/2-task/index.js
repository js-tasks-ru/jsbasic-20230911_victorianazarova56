import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    this.carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    this.stepSlider = new StepSlider({steps: 5, value: 3});
    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon);

  }

  async render() {
    document.querySelector('[data-carousel-holder]').append(this.carousel.elem);
    document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);
    document.querySelector('[data-slider-holder]').append(this.stepSlider.elem);
    document.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem);


    const productsResponse = await fetch('products.json');
    const products = await productsResponse.json();

    this.productsGrid = new ProductsGrid(products);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    document.querySelector('[data-products-grid-holder]').append(this.productsGrid.elem);

    document.querySelector('body').addEventListener('product-add', (event) => {
      const productId = event.detail;
      const productToAdd = products.filter(product => product.id === productId);
      this.cart.addProduct(productToAdd);
    });

    document.querySelector('body').addEventListener('slider-change', (event) => {
      const value = event.detail;
      this.productsGrid.updateFilter({
        maxSpiciness: value
      });
    });

    document.querySelector('body').addEventListener('ribbon-select', (event) => {
      const categoryId = event.detail;
      this.productsGrid.updateFilter({
        category: categoryId
      });
    });

    const noNutsCheckbox = document.querySelector('#nuts-checkbox');

    noNutsCheckbox.addEventListener('change', () => {
      this.productsGrid.updateFilter({
        noNuts: noNutsCheckbox.checked
      });
    });

    const vegeterianOnlyCheckbox = document.querySelector('#vegeterian-checkbox');
    vegeterianOnlyCheckbox.addEventListener('change', () => {
      this.productsGrid.updateFilter({
        vegeterianOnly: vegeterianOnlyCheckbox.checked
      });
    });
  }
}
