document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // 🍔 MOBILE MENU
  // =========================
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

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
  // 🔎 LIVE SEARCH
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
  // 🛒 ADD TO CART (FIXED)
  // =========================
  const addToCartBtns = document.querySelectorAll(".add-to-cart");

  addToCartBtns.forEach(btn => {

    btn.onclick = null; // 🛑 prevent duplicate listeners

    btn.addEventListener("click", () => {

      const card = btn.closest(".product-card");

      const name = card.querySelector("h4").innerText;
      const price = card.querySelector("p").innerText;
      const image = card.querySelector("img").src;

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

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

      // 🔥 BUTTON FEEDBACK
      btn.innerText = "Added!";
      setTimeout(() => {
        btn.innerText = "Add to Cart";
      }, 1000);

    });

  });

  // =========================
  // ❤️ WISHLIST SYSTEM
  // =========================
  const wishlistBtns = document.querySelectorAll(".wishlist-btn");

  function updateWishlistCount() {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const el = document.getElementById("wishlist-count");

    if (el) el.textContent = wishlist.length;
  }

  wishlistBtns.forEach(btn => {
    btn.addEventListener("click", () => {

      const card = btn.closest(".product-card");

      const name = card.querySelector("h4").innerText;
      const price = card.querySelector("p").innerText;
      const image = card.querySelector("img").src;

      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

      const exists = wishlist.find(item => item.name === name);

      if (exists) {
        wishlist = wishlist.filter(item => item.name !== name);
        btn.innerText = "🤍";
      } else {
        wishlist.push({ name, price, image });
        btn.innerText = "❤️";
      }

      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      updateWishlistCount();
    });
  });

  // =========================
  // 🛒 CART COUNT
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
  updateWishlistCount();

  // =========================
  // 🗑 CLEAR CART
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
  // 🎯 SCROLL ANIMATION
  // =========================
  const animatedEls = document.querySelectorAll(".animate");

  function showOnScroll() {
    const trigger = window.innerHeight * 0.85;

    animatedEls.forEach(el => {
      const top = el.getBoundingClientRect().top;

      if (top < trigger) {
        el.classList.add("show");
      } else {
        el.classList.remove("show");
      }
    });
  }

  window.addEventListener("scroll", showOnScroll);
  showOnScroll();

});


// =========================
// 📩 SEND CONTACT TO TELEGRAM
// =========================

const contactForm = document.getElementById("contact-form");

if (contactForm) {

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const formMessage = document.getElementById("form-message");
    const sendBtn = document.getElementById("send-btn");

    sendBtn.innerText = "Sending...";
    sendBtn.disabled = true;

    const telegramMessage = `
🛒 New Contact Message

👤 Name: ${name}
📧 Email: ${email}
💬 Message: ${message}
`;

    const BOT_TOKEN = "8726599732:AAEiAwOKYVp-PsVl13pBuacsMKhyk2hHcwY";
    const CHAT_ID = "5674801497";

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    try {

      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: telegramMessage
        })
      });

      formMessage.style.color = "green";
      formMessage.innerText = "✅ Message sent successfully!";

      contactForm.reset();

    } catch (error) {

      formMessage.style.color = "red";
      formMessage.innerText = "❌ Failed to send message";

    }

    sendBtn.innerText = "Send Message";
    sendBtn.disabled = false;

  });

}