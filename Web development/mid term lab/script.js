/* ==========================================================================
   TASK 3: PERSISTENT PLAIN JAVASCRIPT CART BADGE & MINI-CART
   - Works seamlessly on both index.html and product.html
   - Synchronizes cart across pages using localStorage
   - Uses Array.prototype.reduce() for total calculation
   - Enforces limit: (N mod 4) + 2 = (52 % 4) + 2 = 2 items
   ========================================================================== */

(function () {
  'use strict';

  // Personal Exam Variables (N = 52)
  const N = 52;
  const MAX_PRODUCT_LIMIT = (N % 4) + 2; // = 2

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

  function setMiniCartOpen(isOpen) {
    if (!miniCartDropdown) return;
    miniCartDropdown.classList.toggle('open', isOpen);
    if (cartIconBtn) cartIconBtn.setAttribute('aria-expanded', String(isOpen));
  }

  // 1. Toggle Mini-Cart Dropdown (click icon to open, click again to close)
  if (cartIconBtn) {
    cartIconBtn.setAttribute('aria-expanded', 'false');
    cartIconBtn.addEventListener('click', function (e) {
      if (miniCartDropdown) {
        e.preventDefault();
        setMiniCartOpen(!miniCartDropdown.classList.contains('open'));
      }
    });
  }

  // Clicks inside the panel (e.g. "Remove") must not count as "outside" clicks.
  // Without this, removing an item re-renders the list, the clicked button is no
  // longer in the page, and the outside-click check below closed the panel.
  if (miniCartDropdown) {
    miniCartDropdown.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  }

  // Close on outside clicks. Add-to-cart buttons are skipped: they open the panel
  // themselves, and the same click bubbling up here would close it straight away.
  document.addEventListener('click', function (e) {
    if (miniCartDropdown && !e.target.closest('.cart-btn-wrapper, .add-to-cart-btn, .add-to-cart-large')) {
      setMiniCartOpen(false);
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMiniCartOpen(false);
  });

  // 2. Wire "Add to Cart" on Product Cards (Listing Page)
  // Only real <button>s: the "View" links on product.html share the class
  // but must keep working as links.
  productCards.forEach(function (card) {
    const titleEl = card.querySelector('.card-title');
    const priceEl = card.querySelector('.card-price');
    const addBtn = card.querySelector('button.add-to-cart-btn');

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

    // Open mini-cart to show item was added
    setMiniCartOpen(true);
  }

  // How many of one product are already in the cart
  function getQty(productName) {
    const item = cart.find(item => item.name === productName);
    return item ? item.qty : 0;
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
      const addBtn = card.querySelector('button.add-to-cart-btn');
      if (!titleEl || !addBtn) return;

      const productName = titleEl.textContent.trim();

      if (getQty(productName) >= MAX_PRODUCT_LIMIT) {
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
      miniCartItemsList.innerHTML = '';

      if (cart.length === 0) {
        const empty = document.createElement('li');
        empty.className = 'mini-cart-empty';
        empty.textContent = 'Your bag is empty';
        miniCartItemsList.appendChild(empty);
      }

      // Built with textContent (not innerHTML) so saved names are shown as plain text
      cart.forEach(function (item) {
        const li = document.createElement('li');
        li.className = 'mini-cart-item';

        const info = document.createElement('div');
        const name = document.createElement('div');
        name.className = 'mini-cart-item-name';
        name.textContent = item.name;
        const meta = document.createElement('div');
        meta.className = 'mini-cart-item-meta';
        meta.textContent = '$' + item.price.toFixed(2) + ' × ' + item.qty;
        info.append(name, meta);

        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'mini-cart-item-remove';
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', function () {
          removeItem(item.name);
        });

        li.append(info, removeBtn);
        miniCartItemsList.appendChild(li);
      });
    }

    // Let other scripts (product.html) react to cart changes
    document.dispatchEvent(new CustomEvent('cartchange'));
  }

  // Expose API for product.html page
  window.CartAPI = {
    addItem: addItem,
    removeItem: removeItem,
    getQty: getQty,
    limit: MAX_PRODUCT_LIMIT
  };

  // Initial boot
  updateCardButtons();
  renderCart();

})();