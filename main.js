document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // 🔍 SEARCH TOGGLE
  // =========================
  const searchIcon = document.getElementById("search-icon");
  const searchBox = document.getElementById("search-box");

  if (searchIcon && searchBox) {
    searchIcon.addEventListener("click", () => {
      searchBox.style.display =
        searchBox.style.display === "block" ? "none" : "block";
    });
  }

  // =========================
  // 🔎 LIVE SEARCH (FILTER PRODUCTS)
  // =========================
  const searchInput = document.getElementById("search-input");
  const products = document.querySelectorAll(".product-card");

  if (searchInput && products.length > 0) {
    searchInput.addEventListener("keyup", () => {
      const value = searchInput.value.toLowerCase();

      products.forEach(product => {
        const title = product.querySelector("h4");
        if (!title) return;

        const name = title.innerText.toLowerCase();

        product.style.display =
          name.includes(value) ? "block" : "none";
      });
    });
  }

  // =========================
  // 🛒 ADD TO CART (GLOBAL)
  // =========================
  const addToCartBtns = document.querySelectorAll(".add-to-cart");

  addToCartBtns.forEach(btn => {
    btn.addEventListener("click", () => {

      const card = btn.closest(".product-card");

      const name = card.querySelector("h4").innerText;
      const price = card.querySelector("p").innerText;
      const image = card.querySelector("img").src;

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // check if item exists
      const existing = cart.find(item => item.name === name);

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({
          name,
          price,
          image,
          quantity: 1
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      updateCartCount();

      // 🔥 small feedback
      btn.innerText = "Added!";
      setTimeout(() => (btn.innerText = "Add to Cart"), 1000);
    });
  });

  // =========================
  // 🛒 UPDATE CART COUNT
  // =========================
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const countEl = document.getElementById("cart-count");

    if (countEl) {
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      countEl.textContent = total;
    }
  }

  updateCartCount();

  // =========================
  // 🗑 CLEAR CART (OPTIONAL BUTTON)
  // =========================
  const clearCartBtn = document.getElementById("clear-cart");

  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      localStorage.removeItem("cart");
      updateCartCount();
      location.reload();
    });
  }

  // =========================
  // 🎯 SIMPLE SCROLL ANIMATION
  // =========================
  const animatedEls = document.querySelectorAll(".animate");

  function showOnScroll() {
    const trigger = window.innerHeight * 0.85;

    animatedEls.forEach(el => {
      const top = el.getBoundingClientRect().top;

      if (top < trigger) {
        el.classList.add("show");
      } else {
        el.classList.remove("show"); // repeat animation
      }
    });
  }

  window.addEventListener("scroll", showOnScroll);
  showOnScroll();

});