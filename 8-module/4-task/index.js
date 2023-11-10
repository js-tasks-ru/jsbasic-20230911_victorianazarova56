import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) {
      return;
    }
    const existingItemId = this.cartItems.findIndex(existingProduct => existingProduct.product.id === product.id);
    if (existingItemId > -1) {
      this.cartItems[existingItemId].count = this.cartItems[existingItemId].count + 1;
      this.onProductUpdate(this.cartItems[existingItemId]);
    } else {
      this.cartItems.push({product, count: 1});
      this.onProductUpdate({product, count: 1});
    }
  }

  updateProductCount(productId, amount) {
    const existingItemId = this.cartItems.findIndex(existingProduct => existingProduct.product.id === productId);
    this.cartItems[existingItemId].count = this.cartItems[existingItemId].count + amount;
    this.onProductUpdate(this.cartItems[existingItemId]);
    if (!this.cartItems[existingItemId].count) {
      this.cartItems = this.cartItems.filter(cartItem => cartItem.product.id !== productId);
    }
  }

  isEmpty() {
    return !this.cartItems.length;
  }

  getTotalCount() {
    return this.cartItems.reduce((acc, curr) => {
      acc = acc + curr.count;
      return acc;
    }, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((acc, curr) => {
      acc = acc + (curr.count * curr.product.price);
      return acc;
    }, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
  product.id
}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
    2
  )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    const modal = new Modal();
    modal.setTitle("Your order");

    const body = createElement(`<div id="modal-body">`);

    const productsArray = this.cartItems.map(cartItem => {
      const productElement = this.renderProduct(cartItem.product, cartItem.count);

      productElement.querySelector('.cart-counter__button_minus').addEventListener('click', () => {
        this.updateProductCount(cartItem.product.id, -1);
      });
      productElement.querySelector('.cart-counter__button_plus').addEventListener('click', () => {
        this.updateProductCount(cartItem.product.id, 1);
      });

      return productElement;
    });

    body.append(...productsArray, this.renderOrderForm());


    body.querySelector('.cart-form').addEventListener("submit", (event) => {
      this.onSubmit(event);
    });


    modal.setBody(body);
    modal.open();
    this.modal = modal;
  }

  onProductUpdate(cartItem) {
    if (this.getTotalCount() === 0) {
      this.modal.close();
      this.cartIcon.update(this);
      return;
    }

    if (!document.querySelector('body').classList.contains('is-modal-open')) {
      this.cartIcon.update(this);
      return;
    }

    let productId = cartItem.product.id;
    let modalBody = document.querySelector('#modal-body');
    let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
    let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
    let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

    productCount.innerHTML = cartItem.count;
    productPrice.innerHTML = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`;
    infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
    this.cartIcon.update(this);
  }

  onSubmit(event) {
    event.preventDefault();
    document.querySelector('button[type="submit"]').classList.add('is-loading');
    const formData = new FormData(document.querySelector('.cart-form'));
    fetch('https://httpbin.org/post', {method: "POST", body: formData}).then(() => {
      this.modal.setTitle('Success!');
      this.cartItems = [];
      this.modal.setBody(createElement(
        `<div class="modal__body-inner">
  <p>
    Order successful! Your order is being cooked :) <br>
    We’ll notify you about delivery time shortly.<br>
    <img src="/assets/images/delivery.gif">
  </p>
</div>`));
    });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

