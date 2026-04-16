// cart.js

document.addEventListener("DOMContentLoaded", () => {
  const cartItems = document.querySelectorAll(".cart-item");
  const subtotalEl = document.querySelector(".cart-summary h3");

  function updateSubtotal() {
    let subtotal = 0;
    cartItems.forEach(item => {
      const price = parseFloat(item.querySelector("p").textContent.replace("Price: $", ""));
      const qty = parseInt(item.querySelector("input[type='number']").value);
      subtotal += price * qty;
    });
    subtotalEl.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
  }

  // Update subtotal on page load
  updateSubtotal();

  // Quantity change
  cartItems.forEach(item => {
    const qtyInput = item.querySelector("input[type='number']");
    qtyInput.addEventListener("change", () => {
      if (qtyInput.value < 1) qtyInput.value = 1; // Minimum quantity = 1
      updateSubtotal();
    });

    // Remove item
    const removeBtn = item.querySelector(".btn");
    removeBtn.addEventListener("click", () => {
      item.remove();
      updateSubtotal();
    });
  });
});


