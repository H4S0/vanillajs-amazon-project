import { cart, saveCartToLocalStorage } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let checkOutEl = document.querySelector('.return-to-home-link');
let checkOutItems = 0;

const updateCheckOutItems = () => {
  checkOutItems = 0;
  cart.forEach((item) => {
    checkOutItems += item.quantity;
  });
  checkOutEl.innerText = `${checkOutItems}`;
};

let checkOutHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  checkOutHTML += `
  <div class="cart-item-container cart-item-product-id-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image" src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">${matchingProduct.name}</div>
        <div class="product-price">${formatCurrency(matchingProduct.priceCents)}</div>
        <div class="product-quantity">
          <span>Quantity: <span class="quantity-label quantity-label-${matchingProduct.id}">${cartItem.quantity}</span></span>
          <div class="product-quantity-container">
            <select class="checkout-quantity-selector" data-product-id="${matchingProduct.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            </select>
          </div>
          <span class="update-quantity-link link-primary" data-product-id="${matchingProduct.id}">
            Update
          </span>
          <span class="delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">Choose a delivery option:</div>
        <div class="delivery-option">
          <input type="radio" checked class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">Tuesday, June 21</div>
            <div class="delivery-option-price">FREE Shipping</div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">Wednesday, June 15</div>
            <div class="delivery-option-price">$4.99 - Shipping</div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">Monday, June 13</div>
            <div class="delivery-option-price">$9.99 - Shipping</div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
});

let checkOutPage = document.querySelector('.order-summary');
checkOutPage.innerHTML = checkOutHTML;

const deleteButtons = document.querySelectorAll(`.delete-quantity-link`);

deleteButtons.forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;

    const newCart = cart.filter(cartItem => cartItem.productId !== productId);
    cart.length = 0;
    cart.push(...newCart);

    const cartContainer = document.querySelector(`.cart-item-product-id-${productId}`);
    if (cartContainer) {
      cartContainer.remove();
    }
    updateCheckOutItems();
    saveCartToLocalStorage();
  });
});


const updateButtons = document.querySelectorAll('.update-quantity-link');

updateButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    const updateQuantityEl = document.querySelector(`.checkout-quantity-selector[data-product-id="${productId}"]`);
    const updateButtonQuantity = parseInt(updateQuantityEl.value);
    const cartItem = cart.find(item => item.productId === productId);
    let quantityLabel = document.querySelector(`.quantity-label-${productId}`);
      
    cartItem.quantity = updateButtonQuantity;
    quantityLabel.innerHTML = cartItem.quantity;

    updateCheckOutItems();
    saveCartToLocalStorage();
  });
});

updateCheckOutItems();
