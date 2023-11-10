export default class Cart {
  cartItems = [];

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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
      this.cartItems.push({ product, count: 1 });
      this.onProductUpdate({ product, count: 1 });
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

