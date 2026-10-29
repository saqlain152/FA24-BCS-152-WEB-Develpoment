/* ==========================================================================
   TASK 3: PERSISTENT PLAIN JAVASCRIPT CART BADGE & MINI-CART
   - Works seamlessly on both index.html and product.html
   - Synchronizes cart across pages using localStorage
   - Uses Array.prototype.reduce() for total calculation
   - Enforces limit: (N mod 4) + 2 = (74 % 4) + 2 = 4 items
   ========================================================================== */

(function () {
  'use strict';

  // Personal Exam Variables (N = 74)
  const N = 74;
  const MAX_PRODUCT_LIMIT = (N % 4) + 2; // = 4

  // Load state from localStorage or initialize
  let cart = [];
  try {
    const saved = localStorage.getItem('kith_midterm_cart');
    if (saved) cart = JSON.parse(saved);
  } catch (err) {
    cart = [];
  }

  function saveCart() {
    try {
      localStorage.setItem('kith_midterm_cart', JSON.stringify(cart));
    } catch (e) {}
  }

  // DOM Elements
  const cartBadge = document.getElementById('cart-count-badge');
  const cartIconBtn = document.getElementById('cart-icon-btn');
  const miniCartDropdown = document.getElementById('mini-cart');
  const miniCartItemsList = document.getElementById('mini-cart-items');
  const miniCartTotalSpan = document.getElementById('mini-cart-total');
  const miniCartQtySpan = document.getElementById('mini-cart-qty');
  const productCards = document.querySelectorAll('.product-card');

  function parsePrice(priceStr) {
    return parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
  }

  // 1. Toggle Mini-Cart Dropdown
  if (cartIconBtn) {
    cartIconBtn.addEventListener('click', function (e) {
      if (miniCartDropdown) {
        e.preventDefault();
        miniCartDropdown.classList.toggle('open');
      }
    });
  }

  document.addEventListener('click', function (e) {
    if (miniCartDropdown && !e.target.closest('.cart-btn-wrapper')) {
      miniCartDropdown.classList.remove('open');
    }
  });

  // 2. Wire "Add to Cart" on Product Cards (Listing Page)
  productCards.forEach(function (card) {
    const titleEl = card.querySelector('.card-title');
    const priceEl = card.querySelector('.card-price');
    const addBtn = card.querySelector('.add-to-cart-btn');

    if (!addBtn || !titleEl || !priceEl) return;

    const productName = titleEl.textContent.trim();
    const productPrice = parsePrice(priceEl.textContent);

    addBtn.addEventListener('click', function (e) {
      e.preventDefault();
      addItem(productName, productPrice, 1);
    });
  });

  // Core Add Item Method
  function addItem(productName, productPrice, quantity) {
    const existing = cart.find(item => item.name === productName);
    const currentQty = existing ? existing.qty : 0;

    if (currentQty >= MAX_PRODUCT_LIMIT) {
      alert(`Limit reached! You can add at most ${MAX_PRODUCT_LIMIT} units of this product.`);
      return;
    }

    const qtyToAdd = Math.min(quantity, MAX_PRODUCT_LIMIT - currentQty);

    if (existing) {
      existing.qty += qtyToAdd;
    } else {
      cart.push({
        name: productName,
        price: productPrice,
        qty: qtyToAdd
      });
    }

    saveCart();
    updateCardButtons();
    renderCart();

    // Open mini-cart temporarily to show item was added
    if (miniCartDropdown) {
      miniCartDropdown.classList.add('open');
    }
  }

  // Remove Item Method
  function removeItem(productName) {
    const idx = cart.findIndex(item => item.name === productName);
    if (idx > -1) {
      if (cart[idx].qty > 1) {
        cart[idx].qty -= 1;
      } else {
        cart.splice(idx, 1);
      }
    }
    saveCart();
    updateCardButtons();
    renderCart();
  }

  // Update card buttons if limit reached
  function updateCardButtons() {
    productCards.forEach(function (card) {
      const titleEl = card.querySelector('.card-title');
      const addBtn = card.querySelector('.add-to-cart-btn');
      if (!titleEl || !addBtn) return;

      const productName = titleEl.textContent.trim();
      const inCart = cart.find(item => item.name === productName);
      const currentQty = inCart ? inCart.qty : 0;

      if (currentQty >= MAX_PRODUCT_LIMIT) {
        addBtn.disabled = true;
        addBtn.textContent = 'Limit reached';
      } else {
        addBtn.disabled = false;
        addBtn.textContent = 'Add to Cart';
      }
    });
  }

  // Render Mini-Cart, Badge, & calculate total using reduce()
  function renderCart() {
    const totalCount = cart.reduce(function (sum, item) {
      return sum + item.qty;
    }, 0);

    // EXAM REQUIREMENT: total calculated with reduce()
    const totalPrice = cart.reduce(function (sum, item) {
      return sum + (item.price * item.qty);
    }, 0);

    if (cartBadge) {
      cartBadge.textContent = totalCount;
      cartBadge.style.transform = 'scale(1.25)';
      setTimeout(() => { cartBadge.style.transform = 'scale(1)'; }, 200);
    }

    if (miniCartQtySpan) miniCartQtySpan.textContent = totalCount;
    if (miniCartTotalSpan) miniCartTotalSpan.textContent = '$' + totalPrice.toFixed(2);

    if (miniCartItemsList) {
      if (cart.length === 0) {
        miniCartItemsList.innerHTML = '<li style="font-size: 12px; color: #888; text-align: center; padding: 20px 0;">Your bag is empty</li>';
        return;
      }

      miniCartItemsList.innerHTML = '';
      cart.forEach(function (item) {
        const li = document.createElement('li');
        li.className = 'mini-cart-item';
        li.innerHTML = `
          <div>
            <div class="mini-cart-item-name">${item.name}</div>
            <div class="mini-cart-item-meta">$${item.price.toFixed(2)} &times; ${item.qty}</div>
          </div>
          <button type="button" class="mini-cart-item-remove" data-name="${item.name}">Remove</button>
        `;
        miniCartItemsList.appendChild(li);
      });

      miniCartItemsList.querySelectorAll('.mini-cart-item-remove').forEach(function (btn) {
        btn.addEventListener('click', function () {
          removeItem(this.getAttribute('data-name'));
        });
      });
    }
  }

  // Expose API for product.html page
  window.CartAPI = {
    addItem: addItem,
    removeItem: removeItem
  };

  // Initial boot
  updateCardButtons();
  renderCart();

})();