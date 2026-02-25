import { products } from "./products.js";

const productGrid = document.getElementById("product-grid");
const formatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
});

products.forEach((item) => {
  const card = document.createElement("article");
  card.classList.add("product-card");

  card.innerHTML = `
      <div class="image-placeholder"><img src="${item.img}" alt="${item.name}"></div>
      <div class="product-info">
        <h2 class="product-title">${item.name}</h2>
        <p class="product-price">${formatter.format(item.price)}</p>
        <button class="buy-btn">
          ORDER <i class="ph-light ph-whatsapp-logo"></i>
        </button>
      </div>
    `;

  // We target the button specifically inside this new card and attach the listener
  const buyBtn = card.querySelector(".buy-btn");
  buyBtn.addEventListener("click", () => {
    sendToWhatsApp(item); // Passes the whole item object cleanly
  });

  productGrid.appendChild(card);
});

function sendToWhatsApp(item) {
  const vendorPhoneNumber = "2348100334346";

  // We use your formatter here so the WhatsApp message looks professional (e.g., ₦11,000.00)
  const formattedPrice = formatter.format(item.price);

  const message = `Hello, I am interested in buying the ${item.name} for ${formattedPrice}. Is it currently available?`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${vendorPhoneNumber}?text=${encodedMessage}`;

  window.open(whatsappUrl, "_blank");
}
