let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
  <div class="product-container">
          <div class="product-image-container">
            <img class="product-image" src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="quantity-selector-${product.id}">
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

          <div class="product-spacer"></div>

          <div class="added-to-cart added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
  `;
});


document.querySelector('.products-grid').innerHTML = productsHTML;
document.querySelectorAll('.add-to-cart-button')
.forEach((button) => {
  button.addEventListener('click', () =>{

    const {productId} = button.dataset;
    let matchingItem;
    let inputEl = document.querySelector(`.quantity-selector-${productId}`);
    let input = Number(inputEl.value);

    cart.forEach((item) => {
      if(productId === item.productId) {
        matchingItem = item;
      }
    });
    if(matchingItem) {
      matchingItem.quantity += input;
    } else {
      cart.push({
        productId: productId,
        quantity: input,
      });  
    }
    let totalQuantity = 0;
    cart.forEach((item) => {
      totalQuantity += item.quantity;
    });
    const added = document.querySelector(`.added-to-cart-${productId}`);
    added.classList.add('added-active');
    setTimeout(() => {
      added.classList.remove('added-active');
    }, 2500);
    document.querySelector('.cart-quantity').innerHTML = `${totalQuantity}`;    
  });
});


