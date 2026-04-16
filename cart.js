
document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.querySelector(".cart-items");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function displayCart() {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    cart.forEach((item, index) => {
      cartItemsContainer.innerHTML += `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p>${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <button class="btn remove-btn" data-index="${index}">Remove</button>
          </div>
        </div>
      `;
    });

    const removeButtons = document.querySelectorAll(".remove-btn");

    removeButtons.forEach(button => {
      button.addEventListener("click", () => {
        const index = button.getAttribute("data-index");
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
      });
    });
  }

  displayCart();
});