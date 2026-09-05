/*
  SS TOKYO DRESSES
  This file controls the shared navigation, catalogue, cart and checkout.
  The two values in STORE are intentionally easy to find and replace before launch.
*/
const STORE = {
  name: "SS TOKYO DRESSES",
  // Replace this sample with your real UPI ID before taking payments.
  upiId: "yourupiid@bank",
  supportEmail: "sstokyodresses.customersupport@gmail.com"
};

const CART_KEY = "ss-tokyo-dresses-cart";

function formatMoney(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}

function getCart() {
  try {
    const savedCart = JSON.parse(localStorage.getItem(CART_KEY));
    return Array.isArray(savedCart) ? savedCart : [];
  } catch (error) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function getProduct(productId) {
  const id = String(productId || "");
  const legacyIds = { "1": "masoba-blouse", "2": "mumtaz-blouse" };
  const resolvedId = legacyIds[id] || id;
  return PRODUCTS.find((product) => product.id === resolvedId) || PRODUCTS[0];
}

function getCartDetails() {
  return getCart()
    .map((item) => {
      const product = getProduct(item.id);
      return { ...item, product, lineTotal: product.price * item.quantity };
    })
    .filter((item) => item.quantity > 0);
}

function getCartTotals() {
  const items = getCartDetails();
  const subtotal = items.reduce((total, item) => total + item.lineTotal, 0);
  const shipping = subtotal === 0 ? 0 : subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  return { items, subtotal, shipping, total: subtotal + shipping };
}

function updateCartCount() {
  const itemCount = getCart().reduce((total, item) => total + Number(item.quantity || 0), 0);
  document.querySelectorAll("[data-cart-count]").forEach((element) => {
    element.textContent = itemCount;
    element.classList.toggle("is-empty", itemCount === 0);
  });
}

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function addToCart(productId, colour, size, quantity = 1) {
  const product = getProduct(productId);
  const selectedColour = colour || product.colours[0].name;
  const selectedSize = size || product.sizes[0];
  const cart = getCart();
  const existingItem = cart.find(
    (item) => item.id === product.id && item.colour === selectedColour && item.size === selectedSize
  );

  if (existingItem) {
    existingItem.quantity += Number(quantity);
  } else {
    cart.push({ id: product.id, colour: selectedColour, size: selectedSize, quantity: Number(quantity) });
  }

  saveCart(cart);
  showToast(`${product.name} added to your bag`);
}

function updateCartItem(index, quantity) {
  const cart = getCart();
  if (!cart[index]) return;
  if (quantity <= 0) {
    cart.splice(index, 1);
  } else {
    cart[index].quantity = quantity;
  }
  saveCart(cart);
  renderCartPage();
}

function removeCartItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCartPage();
  showToast("Item removed from your bag");
}

function renderSharedLayout() {
  const currentPage = document.body.dataset.page || "home";
  const headerSlot = document.getElementById("site-header");
  const footerSlot = document.getElementById("site-footer");
  const pageUrl = window.location.href;

  if (headerSlot) {
    headerSlot.innerHTML = `
      <div class="announcement-bar">30% OFF YOUR FIRST ORDER</div>
      <header class="site-header">
        <div class="header-inner container">
          <a class="brand" href="index.html" aria-label="SS TOKYO DRESSES home">
            <img class="brand-logo" src="images/ss-tokyo-dresses-logo.jpeg" alt="SS Tokyo Dresses logo">
          </a>
          <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="site-nav">
            <span></span><span></span><span></span>
          </button>
          <nav class="site-nav" id="site-nav" aria-label="Main navigation">
            <a class="${currentPage === "home" ? "active" : ""}" href="index.html">Home</a>
            <a class="${currentPage === "shop" || currentPage === "product" ? "active" : ""}" href="shop.html">Shop</a>
            <a class="${currentPage === "about" ? "active" : ""}" href="about.html">About</a>
            <a class="${currentPage === "contact" ? "active" : ""}" href="contact.html">Contact</a>
          </nav>
          <a class="cart-link" href="cart.html" aria-label="View shopping bag">
            <span class="cart-icon" aria-hidden="true">Bag</span>
            <span>Bag</span><span class="cart-count" data-cart-count>0</span>
          </a>
        </div>
      </header>`;

    const menuButton = headerSlot.querySelector(".nav-toggle");
    const siteNav = headerSlot.querySelector(".site-nav");
    menuButton.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("is-open");
      menuButton.classList.toggle("is-open", isOpen);
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });
  }

  if (footerSlot) {
    footerSlot.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div class="footer-brand">
            <a class="brand brand--footer" href="index.html" aria-label="SS TOKYO DRESSES home">
              <img class="brand-logo" src="images/ss-tokyo-dresses-logo.jpeg" alt="SS Tokyo Dresses logo">
            </a>
            <p>Modern ethnic blouses made for your most beautiful saree moments.</p>
          </div>
          <div>
            <h2>Shop</h2>
            <a href="shop.html">All blouses</a>
            <a href="shop.html?design=Light%20Lace%20Work">Masoba Blouse</a>
            <a href="shop.html?design=Heavy%20Embroidery">Mumtaz Blouse</a>
          </div>
          <div>
            <h2>Customer care</h2>
            <a href="contact.html">Contact us</a>
            <a href="about.html#shipping">Shipping information</a>
            <a href="about.html#returns">Returns &amp; exchanges</a>
          </div>
          <div>
            <h2>Need help?</h2>
            <a href="mailto:${STORE.supportEmail}">${STORE.supportEmail}</a>
            <a href="mailto:${STORE.supportEmail}?subject=Order%20help">Email customer support</a>
          </div>
        </div>
        <div class="footer-bottom container">
          <span>© <span data-current-year></span> SS TOKYO DRESSES</span>
          <span>Made in India <span aria-hidden="true">♥</span></span>
        </div>
      </footer>`;
  }

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
  updateCartCount();
  return pageUrl;
}

function productCard(product) {
  const firstColour = product.colours[0];
  const rating = product.rating || 4.5;
  const ratingCount = product.ratingCount || 149;
  const mrp = product.mrp || product.price;
  const discountPercent = product.discountPercent || 0;
  return `
    <article class="product-card">
      <a class="product-image-link" href="product.html?id=${encodeURIComponent(product.id)}" aria-label="View ${product.name}">
        <img src="${firstColour.image}" alt="${firstColour.name} ${product.name} in ${product.material}" loading="lazy">
        <span class="product-badge">${product.badge}</span>
        <span class="product-image-overlay">View details</span>
      </a>
      <div class="product-card-content">
        <p class="eyebrow">${product.category}</p>
        <h3><a href="product.html?id=${encodeURIComponent(product.id)}">${product.name}</a></h3>
        <div class="product-card-meta"><span>${product.material}</span><span aria-hidden="true">·</span><span>Made in India</span></div>
        <p class="product-rating" aria-label="Rated ${rating} out of 5 by ${ratingCount} customers"><span aria-hidden="true">★</span><strong>${rating}</strong><span>${ratingCount} ratings</span></p>
        <div class="product-card-bottom"><div class="product-price-wrap"><strong class="product-sale-price">${formatMoney(product.price)}</strong>${mrp > product.price ? `<s class="product-mrp">${formatMoney(mrp)}</s><span class="product-discount">${discountPercent}% OFF</span>` : ""}</div><a class="text-link" href="product.html?id=${encodeURIComponent(product.id)}">Choose colour <span aria-hidden="true">→</span></a></div>
      </div>
    </article>`;
}

function renderHomePage() {
  const featuredSlot = document.getElementById("featured-products");
  if (featuredSlot) featuredSlot.innerHTML = PRODUCTS.map(productCard).join("");
}

function renderShopPage() {
  const grid = document.getElementById("product-grid");
  const count = document.getElementById("product-count");
  const filterForm = document.getElementById("shop-filters");
  if (!grid || !filterForm) return;

  const searchInput = filterForm.querySelector("[name='search']");
  const categorySelect = filterForm.querySelector("[name='category']");
  const params = new URLSearchParams(window.location.search);
  const requestedCategory = params.get("design");
  if (requestedCategory) categorySelect.value = requestedCategory;

  function updateGrid() {
    const phrase = searchInput.value.trim().toLowerCase();
    const category = categorySelect.value;
    const filteredProducts = PRODUCTS.filter((product) => {
      const matchesSearch = `${product.name} ${product.category} ${product.material}`.toLowerCase().includes(phrase);
      const matchesCategory = !category || product.category === category;
      return matchesSearch && matchesCategory;
    });
    grid.innerHTML = filteredProducts.length ? filteredProducts.map(productCard).join("") : `<p class="empty-state">No blouses found. Try another search.</p>`;
    count.textContent = `${filteredProducts.length} design${filteredProducts.length === 1 ? "" : "s"}`;
  }

  filterForm.addEventListener("input", updateGrid);
  filterForm.addEventListener("change", updateGrid);
  filterForm.addEventListener("submit", (event) => event.preventDefault());
  updateGrid();
}

function renderProductPage() {
  const productSlot = document.getElementById("product-detail");
  if (!productSlot) return;

  const product = getProduct(new URLSearchParams(window.location.search).get("id"));
  document.title = `${product.name} | SS TOKYO DRESSES`;
  const productDescription = `Shop the ${product.name}: ${product.category.toLowerCase()} in ${product.material.toLowerCase()}, available in sizes ${product.sizes.join(" and ")}.`;
  const descriptionTag = document.querySelector("meta[name='description']");
  const ogTitle = document.querySelector("meta[property='og:title']");
  const ogDescription = document.querySelector("meta[property='og:description']");
  const ogImage = document.querySelector("meta[property='og:image']");
  const ogImageAlt = document.querySelector("meta[property='og:image:alt']");
  const ogUrl = document.querySelector("meta[property='og:url']");
  if (descriptionTag) descriptionTag.content = productDescription;
  if (ogTitle) ogTitle.content = `${product.name} | SS TOKYO DRESSES`;
  if (ogDescription) ogDescription.content = productDescription;
  if (ogImage) ogImage.content = `https://sstokyodresses.store/${product.colours[0].image}`;
  if (ogImageAlt) ogImageAlt.content = `${product.colours[0].name} ${product.name} from SS TOKYO DRESSES`;
  if (ogUrl) ogUrl.content = `https://sstokyodresses.store/product.html?id=${encodeURIComponent(product.id)}`;
  let chosenColour = product.colours[0];
  let chosenSize = product.sizes[0];
  let selectedImage = chosenColour.image;
  const sizeGuide = product.sizeGuide || product.sizes.map((size) => ({ size, bust: "—", length: "—", shoulder: "—" }));
  const sizeGuideMarkup = `
    <div class="size-guide-table" aria-label="${product.name} size measurements">
      <span>Measurement</span>${sizeGuide.map((entry) => `<span>${entry.size}</span>`).join("")}
      <span>Bust</span>${sizeGuide.map((entry) => `<span>${entry.bust}</span>`).join("")}
      <span>Length</span>${sizeGuide.map((entry) => `<span>${entry.length}</span>`).join("")}
      <span>Shoulder</span>${sizeGuide.map((entry) => `<span>${entry.shoulder}</span>`).join("")}
    </div>`;
  const sizeList = product.sizes.map((size) => `<strong>${size}</strong>`).join(" and ");

  function render() {
    const galleryImages = [selectedImage, ...product.gallery.filter((image) => image !== selectedImage)].slice(0, 4);
    productSlot.innerHTML = `
      <div class="breadcrumb container"><a href="index.html">Home</a><span>/</span><a href="shop.html">Shop</a><span>/</span><span>${product.name}</span></div>
      <section class="product-detail container">
        <div class="product-gallery">
          <div class="product-main-image"><img id="main-product-image" src="${selectedImage}" alt="${chosenColour.name} ${product.name} — front view"></div>
          <div class="gallery-thumbnails" aria-label="Product image gallery">
            ${galleryImages.map((image, index) => `<button class="thumbnail ${image === selectedImage ? "is-selected" : ""}" type="button" data-image="${image}" aria-label="Show ${index === 0 ? "main" : "gallery"} view"><img src="${image}" alt="${chosenColour.name} ${product.name} gallery view ${index + 1}"></button>`).join("")}
          </div>
        </div>
        <div class="product-info">
          <p class="eyebrow">${product.category}</p>
          <h1>${product.name}</h1>
          <div class="rating-row"><span class="stars">★ ${product.rating || 4.5}</span><span>${product.ratingCount || 149} ratings</span><span>Made in India</span></div>
          <p class="product-price"><strong>${formatMoney(product.price)}</strong>${product.mrp > product.price ? `<s>${formatMoney(product.mrp)}</s><span>${product.discountPercent}% OFF</span>` : ""}</p>
          <p class="product-description">${product.description}</p>
          <div class="choice-group"><div class="choice-heading"><strong>Colour</strong><span>${chosenColour.name}</span></div><div class="swatches">
            ${product.colours.map((colour) => `<button class="colour-swatch ${colour.name === chosenColour.name ? "is-selected" : ""}" type="button" data-colour="${colour.name}" title="${colour.name}" aria-label="Choose ${colour.name}" aria-pressed="${colour.name === chosenColour.name}"><span style="background:${colour.hex}"></span></button>`).join("")}
          </div></div>
          <div class="choice-group"><div class="choice-heading"><strong>Size</strong><a href="#size-guide">Size guide</a></div><div class="size-buttons">
            ${product.sizes.map((size) => `<button class="size-button ${size === chosenSize ? "is-selected" : ""}" type="button" data-size="${size}" aria-pressed="${size === chosenSize}">${size}</button>`).join("")}
          </div></div>
          <div class="purchase-row"><label class="quantity-picker"><span class="sr-only">Quantity</span><button type="button" data-quantity-change="-1" aria-label="Decrease quantity">−</button><output id="product-quantity">1</output><button type="button" data-quantity-change="1" aria-label="Increase quantity">+</button></label><button class="button button--primary add-product-button" type="button">Add to bag <span>${formatMoney(product.price)}</span></button></div>
          <div class="product-assurances"><div><span aria-hidden="true">✦</span><p><strong>Free delivery above ₹1,799</strong><br>₹60 delivery below ₹1,799</p></div><div><span aria-hidden="true">✦</span><p><strong>Cash on Delivery available</strong><br>Secure UPI option at checkout</p></div></div>
        </div>
      </section>
      <section class="details-section container" id="size-guide">
        <div><p class="eyebrow">Product highlights</p><h2>Made to feel special</h2><ul class="feature-list">${product.highlights.map((highlight) => `<li>${highlight}</li>`).join("")}</ul></div>
        <aside class="size-guide-card"><p class="eyebrow">Size guide</p><h2>Find your fit</h2><p>Available in sizes ${sizeList}. Please compare your usual blouse size before ordering.</p>${sizeGuideMarkup}<p class="size-note">Need help selecting a size? Email <a href="mailto:${STORE.supportEmail}">our customer support team</a>.</p></aside>
      </section>
      <section class="related-section"><div class="container"><p class="eyebrow">Complete your collection</p><h2>You may also love</h2><div class="product-grid product-grid--related">${PRODUCTS.filter((item) => item.id !== product.id).map(productCard).join("")}</div></div></section>`;

    let quantity = 1;
    productSlot.querySelectorAll("[data-colour]").forEach((button) => {
      button.addEventListener("click", () => {
        chosenColour = product.colours.find((colour) => colour.name === button.dataset.colour) || chosenColour;
        selectedImage = chosenColour.image;
        render();
      });
    });
    productSlot.querySelectorAll("[data-size]").forEach((button) => {
      button.addEventListener("click", () => {
        chosenSize = button.dataset.size;
        render();
      });
    });
    productSlot.querySelectorAll("[data-image]").forEach((button) => {
      button.addEventListener("click", () => {
        selectedImage = button.dataset.image;
        const mainImage = productSlot.querySelector("#main-product-image");
        mainImage.src = selectedImage;
        productSlot.querySelectorAll(".thumbnail").forEach((thumbnail) => thumbnail.classList.toggle("is-selected", thumbnail.dataset.image === selectedImage));
      });
    });
    productSlot.querySelectorAll("[data-quantity-change]").forEach((button) => {
      button.addEventListener("click", () => {
        quantity = Math.max(1, quantity + Number(button.dataset.quantityChange));
        productSlot.querySelector("#product-quantity").textContent = quantity;
      });
    });
    productSlot.querySelector(".add-product-button").addEventListener("click", () => addToCart(product.id, chosenColour.name, chosenSize, quantity));
  }
  render();
}

function renderCartPage() {
  const cartSlot = document.getElementById("cart-content");
  if (!cartSlot) return;
  const { items, subtotal, shipping, total } = getCartTotals();

  if (!items.length) {
    cartSlot.innerHTML = `<section class="empty-cart container"><p class="eyebrow">Your bag</p><h1>Your bag is waiting for something beautiful.</h1><p>Discover a blouse made for your next saree moment.</p><a class="button button--primary" href="shop.html">Shop blouses</a></section>`;
    return;
  }

  const shippingMessage = subtotal >= SHIPPING_THRESHOLD ? "You have unlocked free delivery." : `Add ${formatMoney(SHIPPING_THRESHOLD - subtotal)} more for free delivery.`;
  cartSlot.innerHTML = `
    <section class="cart-page container"><div class="cart-heading"><div><p class="eyebrow">Your bag</p><h1>Almost yours</h1></div><a class="text-link" href="shop.html">Continue shopping <span aria-hidden="true">→</span></a></div>
      <div class="cart-layout"><div class="cart-items">
        ${items.map((item, index) => `<article class="cart-item"><img src="${item.product.colours.find((colour) => colour.name === item.colour)?.image || item.product.colours[0].image}" alt="${item.colour} ${item.product.name}"><div class="cart-item-main"><div class="cart-item-heading"><div><p class="eyebrow">${item.product.category}</p><h2>${item.product.name}</h2><p>Colour: ${item.colour} · Size: ${item.size}</p></div><strong>${formatMoney(item.lineTotal)}</strong></div><div class="cart-item-actions"><label class="quantity-picker"><span class="sr-only">Quantity for ${item.product.name}</span><button type="button" data-cart-quantity="${index}|-1" aria-label="Decrease quantity">−</button><output>${item.quantity}</output><button type="button" data-cart-quantity="${index}|1" aria-label="Increase quantity">+</button></label><button class="remove-button" type="button" data-remove-cart-item="${index}">Remove</button></div></div></article>`).join("")}
      </div><aside class="order-summary"><h2>Order summary</h2><div><span>Subtotal</span><span>${formatMoney(subtotal)}</span></div><div><span>Delivery</span><span>${shipping === 0 ? "Free" : formatMoney(shipping)}</span></div><p class="shipping-progress">${shippingMessage}</p><div class="summary-total"><strong>Total</strong><strong>${formatMoney(total)}</strong></div><a class="button button--primary button--full" href="#checkout">Proceed to checkout</a><p class="secure-note">Secure UPI and Cash on Delivery available.</p></aside></div>
    </section>
    <section class="checkout-section" id="checkout"><div class="container checkout-layout"><div><p class="eyebrow">Checkout</p><h2>Where should we deliver?</h2><p class="checkout-intro">Fill in your details. When you place your order, your email app will open with the complete order message ready for customer support.</p><form class="checkout-form" id="checkout-form"><div class="field-grid"><label>Full name<input name="name" autocomplete="name" required placeholder="Your full name"></label><label>Phone number<input name="phone" autocomplete="tel" inputmode="tel" required pattern="[0-9+ ]{10,16}" placeholder="10-digit mobile number"></label></div><label>Full address<textarea name="address" autocomplete="street-address" required rows="4" placeholder="House/flat, street, area, city, state and PIN code"></textarea></label><label>Order note <span>(optional)</span><input name="note" placeholder="Any colour or delivery note"></label><button class="button button--primary button--full" type="submit">Send order by email</button><p class="form-note">By placing an order, you agree that there are no returns or exchanges.</p></form></div><aside class="upi-card"><p class="eyebrow">UPI payment</p><h2>Pay securely by UPI</h2><img src="images/upi-qr-placeholder.svg" alt="Placeholder QR code — replace this with the SS TOKYO DRESSES UPI QR code"><p>UPI ID: <code>${STORE.upiId}</code></p><p class="upi-note">Replace the sample UPI ID and QR image in <code>js/main.js</code> and the <code>images</code> folder before launch.</p></aside></div></section>`;

  cartSlot.querySelectorAll("[data-cart-quantity]").forEach((button) => {
    button.addEventListener("click", () => {
      const [index, change] = button.dataset.cartQuantity.split("|").map(Number);
      const cart = getCart();
      updateCartItem(index, cart[index].quantity + change);
    });
  });
  cartSlot.querySelectorAll("[data-remove-cart-item]").forEach((button) => button.addEventListener("click", () => removeCartItem(Number(button.dataset.removeCartItem))));
  const checkoutForm = cartSlot.querySelector("#checkout-form");
  checkoutForm.addEventListener("submit", handleCheckout);
}

function handleCheckout(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const { items, subtotal, shipping, total } = getCartTotals();
  if (!items.length) return;
  const orderLines = items.map((item, index) => `${index + 1}. ${item.product.name} — ${item.colour}, size ${item.size} × ${item.quantity} = ${formatMoney(item.lineTotal)}`);
  const message = [
    `Hello ${STORE.name}, I would like to place an order.`,
    "",
    "*Customer details*",
    `Name: ${form.get("name")}`,
    `Phone: ${form.get("phone")}`,
    `Address: ${form.get("address")}`,
    form.get("note") ? `Note: ${form.get("note")}` : "",
    "",
    "*Order details*",
    ...orderLines,
    `Subtotal: ${formatMoney(subtotal)}`,
    `Delivery: ${shipping === 0 ? "Free" : formatMoney(shipping)}`,
    `*Total: ${formatMoney(total)}*`,
    "",
    "Preferred payment: UPI / Cash on Delivery"
  ].filter(Boolean).join("\n");
  const subject = `New order — ${form.get("name")} — ${formatMoney(total)}`;
  window.location.href = `mailto:${STORE.supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}

function setUpSimpleForms() {
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = document.getElementById("newsletter-email").value.trim();
      const subject = "SS TOKYO DRESSES updates";
      const body = `Please add ${email} to SS TOKYO DRESSES updates.`;
      window.location.href = `mailto:${STORE.supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = new FormData(contactForm);
      const subject = `Customer support: ${form.get("name")}`;
      const body = `Name: ${form.get("name")}\nEmail: ${form.get("email")}\n\nMessage:\n${form.get("message")}`;
      window.location.href = `mailto:${STORE.supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderSharedLayout();
  renderHomePage();
  renderShopPage();
  renderProductPage();
  renderCartPage();
  setUpSimpleForms();
});
