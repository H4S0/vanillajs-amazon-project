

export let cart = JSON.parse(localStorage.getItem('cart')) || [{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2,
}, {
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1,
}];

export const saveCartToLocalStorage = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
};


export const addToCart = (productId, quantity) => {
  let matchingItem = cart.find((item) => productId === item.productId);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
    });
  }
  updateQuantity();
  saveCartToLocalStorage();
}

export const addedText = (productId) => {
  const added = document.querySelector(`.added-to-cart-${productId}`);
  added.classList.add('added-active');
  setTimeout(() => {
    added.classList.remove('added-active');
  }, 2500);
}


export const updateQuantity = () => {
  let totalQuantity = 0;

  cart.forEach((item) => {
    totalQuantity += item.quantity;
  });
  document.querySelector('.cart-quantity').innerHTML = `${totalQuantity}`;
}

document.addEventListener('DOMContentLoaded', () => {
  updateQuantity();
});

let paymentCheckoutItems = document.querySelector('.payment-checkout-items');
export const  paymentCheckout = () => {
  let checkOutItems = 0;
  cart.forEach((item) => {
    checkOutItems += item.quantity;
  });
  paymentCheckoutItems.innerText = `Items (${checkOutItems}):`;
}

let checkOutEl = document.querySelector('.return-to-home-link');
export const updateCheckOutItems = () => {
  let checkOutItems = 0;
  cart.forEach((item) => {
    checkOutItems += item.quantity;
  });
  checkOutEl.innerText = `${checkOutItems}`;
};
//staviti ovo za računanje u jednu funkciju zbog ponavljanja
export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveCartToLocalStorage();
}
