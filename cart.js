// cart.js

document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.querySelector(".cart-items");
  const subtotalEl = document.querySelector(".cart-summary h3");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateSubtotal() {
    let subtotal = 0;

    cart.forEach(item => {
      let price = parseFloat(item.price.replace("$", ""));
      subtotal += price * item.quantity;
    });

    subtotalEl.textContent = `Subtotal: $${subtotal}`;
  }

  function displayCart() {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      subtotalEl.textContent = "Subtotal: $0";
      return;
    }

    cart.forEach((item, index) => {
      cartItemsContainer.innerHTML += `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p>${item.price}</p>

            <div class="qty-controls">
              <button class="decrease" data-index="${index}">-</button>
              <span>${item.quantity}</span>
              <button class="increase" data-index="${index}">+</button>
            </div>

            <button class="btn remove-btn" data-index="${index}">Remove</button>
          </div>
        </div>
      `;
    });

    updateSubtotal();

    // ➕ Increase
    document.querySelectorAll(".increase").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = btn.dataset.index;
        cart[i].quantity++;
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
      });
    });

    // ➖ Decrease
    document.querySelectorAll(".decrease").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = btn.dataset.index;
        if (cart[i].quantity > 1) {
          cart[i].quantity--;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
      });
    });

    // ❌ Remove
    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = btn.dataset.index;
        cart.splice(i, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
      });
    });
  }

  displayCart();
});