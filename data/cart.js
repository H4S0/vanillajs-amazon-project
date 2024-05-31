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
  saveCartToLocalStorage();
}

export const addedText = (productId) => {
  const added = document.querySelector(`.added-to-cart-${productId}`);
  added.classList.add('added-active');
  setTimeout(() => {
    added.classList.remove('added-active');
  }, 2500);
}


export const updateQuantity = (productIdm) => {
  let totalQuantity = 0;

  cart.forEach((item) => {
    totalQuantity += item.quantity;
  });
  document.querySelector('.cart-quantity').innerHTML = `${totalQuantity}`;
}

