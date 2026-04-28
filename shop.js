// shop.js

document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      const productCard = button.closest(".product-card");

      const productName = productCard.querySelector("h4").textContent;
      const productPrice =
        productCard.querySelector(".price")?.textContent || "$0";
      const productImage = productCard.querySelector("img").src;

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existingProduct = cart.find(item => item.name === productName);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push({
          name: productName,
          price: productPrice,
          image: productImage,
          quantity: 1
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      alert(productName + " added to cart!");

      // 🔥 Update cart counter instantly
      let count = cart.reduce((total, item) => total + item.quantity, 0);
      const cartCount = document.getElementById("cart-count");
      if (cartCount) cartCount.textContent = count;
    });
  });
});