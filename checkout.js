document.addEventListener("DOMContentLoaded", () => {
  const itemsContainer = document.querySelector(".checkout-items");
  const totalEl = document.getElementById("checkout-total");
  const placeOrderBtn = document.getElementById("place-order");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function loadCheckout() {
    let total = 0;
    itemsContainer.innerHTML = "";

    cart.forEach(item => {
      let price = parseFloat(item.price.replace("$", ""));
      total += price * item.quantity;

      itemsContainer.innerHTML += `
        <p>${item.name} x${item.quantity} - $${price * item.quantity}</p>
      `;
    });

    totalEl.textContent = "Total: $" + total;
  }

  loadCheckout();

  placeOrderBtn.addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;

    if (!name || !phone || !address || !city) {
      alert("Please fill all fields");
      return;
    }

    // Save order (simple)
    const order = {
      customer: { name, phone, address, city },
      items: cart
    };

    console.log("Order placed:", order);

    alert("✅ Order placed successfully!");

    // Clear cart
    localStorage.removeItem("cart");

    // Redirect
    window.location.href = "index.html";
  });
});

const paymentSelect = document.getElementById("payment");
const telebirrBox = document.getElementById("telebirr-box");

paymentSelect.addEventListener("change", () => {
  telebirrBox.style.display =
    paymentSelect.value === "telebirr" ? "block" : "none";
});

placeOrderBtn.addEventListener("click", () => {
  const payment = paymentSelect.value;

  if (payment === "telebirr") {
    const tx = document.getElementById("tx-id").value;
    if (!tx) {
      alert("Enter Telebirr transaction ID");
      return;
    }
  }

  alert("✅ Order placed!");
  localStorage.removeItem("cart");
  window.location.href = "index.html";
});

const token = "8726599732:AAEiAwOKYVp-PsVl13pBuacsMKhyk2hHcwY";
const chatId = "5674801497";

let message = `
🛒 New Order!

👤 Name: ${name}
📞 Phone: ${phone}
📍 Address: ${address}, ${city}
💳 Payment: ${payment}
${payment === "telebirr" ? "📱 TX ID: " + document.getElementById("tx-id").value : ""}

📦 Items:
`;

cart.forEach(item => {
  message += `- ${item.name} x${item.quantity} (${item.price})\n`;
});

fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    chat_id: chatId,
    text: message
  })
})
.then(() => {
  alert("✅ Order sent successfully!");
})
.catch(() => {
  alert("❌ Failed to send order");
});

localStorage.removeItem("cart");
window.location.href = "index.html";

