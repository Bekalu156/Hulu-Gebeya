// main.js

document.addEventListener("DOMContentLoaded", () => {

  // 🔍 Toggle Search Box
  const searchIcon = document.getElementById("search-icon");
  const searchBox = document.getElementById("search-box");

  if (searchIcon && searchBox) {
    searchIcon.addEventListener("click", () => {
      searchBox.style.display =
        searchBox.style.display === "block" ? "none" : "block";
    });
  }

  // 🔎 Live Search (Shop Page)
  const searchInput = document.getElementById("search-input");

  if (searchInput) {
    searchInput.addEventListener("keyup", () => {
      const value = searchInput.value.toLowerCase();
      const products = document.querySelectorAll(".product-card");

      products.forEach(product => {
        const name = product.querySelector("h4").textContent.toLowerCase();
        product.style.display = name.includes(value) ? "block" : "none";
      });
    });
  }

  // 🛒 Cart Counter
  function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let count = cart.reduce((total, item) => total + item.quantity, 0);

    const cartCount = document.getElementById("cart-count");
    if (cartCount) cartCount.textContent = count;
  }

  updateCartCount();

  // ❤️ Wishlist Toggle
  document.querySelectorAll(".wishlist").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
    });
  });

});