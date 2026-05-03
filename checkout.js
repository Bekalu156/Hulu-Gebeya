document.addEventListener("DOMContentLoaded", () => {

  const itemsContainer = document.querySelector(".checkout-items");
  const totalEl = document.getElementById("checkout-total");
  const placeOrderBtn = document.getElementById("place-order");

  const paymentSelect = document.getElementById("payment");
  const telebirrBox = document.getElementById("telebirr-box");

  const token = "8726599732:AAEiAwOKYVp-PsVl13pBuacsMKhyk2hHcwY";
  const chatId = "5674801497";

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // LOAD CART
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

  // TELEBIRR TOGGLE
  paymentSelect.addEventListener("change", () => {
    telebirrBox.style.display =
      paymentSelect.value === "telebirr" ? "block" : "none";
  });

  // SEND IMAGE TO TELEGRAM
  async function sendImageToTelegram(order, cart) {

    document.getElementById("r-name").innerText = "Name: " + order.customer.name;
    document.getElementById("r-phone").innerText = "Phone: " + order.customer.phone;
    document.getElementById("r-address").innerText =
      "Address: " + order.customer.address + ", " + order.customer.city;
    document.getElementById("r-payment").innerText =
      "Payment: " + order.payment;

    document.getElementById("r-tx").innerText =
      order.transactionId ? "TX: " + order.transactionId : "";

    let total = 0;
    const itemsBox = document.getElementById("r-items");
    itemsBox.innerHTML = "";

    cart.forEach(item => {
      let price = parseFloat(item.price.replace("$", ""));
      total += price * item.quantity;

      itemsBox.innerHTML += `
        <div style="display:flex; align-items:center; margin-bottom:10px;">
          
          <img src="${item.image}" 
               style="width:50px; height:50px; object-fit:cover; border-radius:5px; margin-right:10px;" />

          <div>
            <p style="margin:0;">${item.name}</p>
            <small>x${item.quantity} - ${item.price}</small>
          </div>

        </div>
      `;
    });

    document.getElementById("r-total").innerText = "Total: $" + total;

    const receipt = document.getElementById("receipt");
    receipt.style.display = "block";

    const canvas = await html2canvas(receipt);
    const blob = await new Promise(resolve => canvas.toBlob(resolve));

    const formData = new FormData();
    formData.append("chat_id", chatId);
    formData.append("photo", blob, "order.png");

    await fetch(`https://api.telegram.org/bot${token}/sendPhoto`, {
      method: "POST",
      body: formData
    });

    receipt.style.display = "none";
  }

  // PLACE ORDER
  placeOrderBtn.addEventListener("click", async () => {

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value.trim();
    const payment = paymentSelect.value;

    if (!name || !phone || !address || !city) {
      alert("Fill all fields");
      return;
    }

    let transactionId = null;

    if (payment === "telebirr") {
      const tx = document.getElementById("tx-id").value.trim();

      if (!tx || tx.length < 6) {
        alert("Invalid Transaction ID");
        return;
      }

      transactionId = tx;
    }

    const order = {
      id: Date.now(),
      customer: { name, phone, address, city },
      payment,
      transactionId,
      items: cart,
      date: new Date().toLocaleString()
    };

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    await sendImageToTelegram(order, cart);

    alert("✅ Order sent!");

    localStorage.removeItem("cart");

    window.location.href = "index.html";
  });

});