import { cart, paymentCheckout, saveCartToLocalStorage, updateCheckOutItems } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { deliveryOptions } from "../data/deliveryOptions.js"; 
import  dayjs  from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


function calculateCheckoutPrice () {
  let total = 0;
  cart.forEach((cartItem) => {
    const product = products.find(product => product.id === cartItem.productId);
    if(product) {
      total += cartItem.quantity * product.priceCents;
    }
  })
  return total;
}

let paymantCheckoutPrice = document.querySelector('.payment-summary-money');
const updateTotalPrice = () => {
  const totalPriceCents = calculateCheckoutPrice();
  if (paymantCheckoutPrice) {
    paymantCheckoutPrice.innerText = formatCurrency(totalPriceCents);
  }
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
        ${deliveryOptionsHTML(matchingProduct)}
      </div>
    </div>
  </div>`;
});


function deliveryOptionsHTML(matchingProduct) {
  let html = '';
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryTime,
      'days'
    );
    const dateString = deliveryDate.format('dddd, MMMM D');
    const priceString = deliveryOption.priceCents === 0 ? 'Free' : `$${formatCurrency(deliveryOption.deliveryPrice)} - `;
    html += `<div class="delivery-option">
    <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
    <div>
      <div class="delivery-option-date">${dateString}</div>
      <div class="delivery-option-price">${priceString} Shipping</div>
    </div>
  </div>`;
  });
  return html;
}

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
    paymentCheckout();
    updateTotalPrice();
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
    paymentCheckout();
    updateTotalPrice();
    saveCartToLocalStorage();
  });
});

updateCheckOutItems();
paymentCheckout();
updateTotalPrice();

