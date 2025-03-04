// Function to render filtered products
const productsHTML = () => {
  let filteredProducts = products;

  // Get selected filter value from the dropdown
  const filterValue = document.querySelector('.product-filter').value;

  // If a filter value is selected, filter products accordingly
  if (filterValue) {
    filteredProducts = products.filter(product => {
      // Check if the product type or keywords match the selected filter value
      if (filterValue === 'electronics') {
        return product.keywords.some(keyword => keyword.includes("appliances") || keyword.includes("electronics"));
      } else if (filterValue === 'books') {
        return product.keywords.some(keyword => keyword.includes("kitchen") || keyword.includes("utensils"));
      } else if (filterValue === 'clothing') {
        return product.keywords.some(keyword => keyword.includes("apparel") || product.type === "clothing");
      } else if (filterValue === 'toys') {
        return product.keywords.some(keyword => keyword.includes("shoes") || keyword.includes("sneakers"));
      }
      return true;
    });
  }

  let productsHTML = '';
  
  // Render filtered products
  filteredProducts.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}" alt="${product.name}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png" alt="rating">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          NLE ${(product.priceCents / 100).toFixed(2)}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
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

        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png" alt="added">
          Product Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
          Add Product
        </button>
      </div>
    `;
  });

  // Insert the filtered products into the page
  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  function updateCartQuantity() {
    let cartQuantity = 0;
    
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    document.querySelector('.js-cart-quantity')
      .innerHTML = cartQuantity;
  }

  updateCartQuantity();

  // Add event listeners to each 'Add to Cart' button
  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
    
     let addedMessageTimeoutId; 

    button.addEventListener('click', (event) => {
      const productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity();

      const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);

      addedMessage.classList.add('added-to-cart-visible');

        if (addedMessageTimeoutId) {
          clearTimeout(addedMessageTimeoutId);
        }
        
        const timeoutId = setTimeout(() => {
          addedMessage.classList.remove('added-to-cart-visible');
        }, 2000);

        addedMessageTimeoutId = timeoutId;
    });
  });
};

// Listen for changes on the filter dropdown
document.querySelector('.product-filter').addEventListener('change', productsHTML);

// Initial render of products when the page loads
productsHTML();
