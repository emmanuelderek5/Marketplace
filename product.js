
// ---------------------
// GET PRODUCT ID
// ---------------------

const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));

// ---------------------
// CHECK PRODUCTS
// ---------------------

if (typeof products === "undefined") {
  console.error("products.js not loaded");
}

// ---------------------
// FIND PRODUCT
// ---------------------

const product = (typeof products !== "undefined")
  ? products.find(p => p.id === productId)
  : null;

// ---------------------
// STOP IF NO PRODUCT
// ---------------------

if (!product) {
  document.body.innerHTML = `
    <div style="text-align:center;margin-top:60px;">
      <h2>Product not found</h2>
      <p>Check link or product data.</p>
      <a href="index.html">← Back</a>
    </div>
  `;
  throw new Error("No product found");
}

// ---------------------
// INIT AFTER DOM READY
// ---------------------

window.addEventListener("DOMContentLoaded", () => {

  // ---------------------
  // SAFE IMAGE SOURCE
  // ---------------------

  const images =
    product.images?.length
      ? product.images
      : [product.image];

  let currentIndex = 0;

  let shuffleDirection = "right";

  // ---------------------
  // ELEMENTS
  // ---------------------

  const imageEl = document.getElementById("productImage");
  const titleEl = document.getElementById("productTitle");
  const priceEl = document.getElementById("productPrice");
  const descEl = document.getElementById("productDescription");

  const overlay = document.getElementById("imageOverlay");
  const expandedImage = document.getElementById("expandedImage");

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dotsContainer = document.getElementById("dotsContainer");

  // ---------------------
  // SET PRODUCT INFO
  // ---------------------

  titleEl.textContent = product.title;
  priceEl.textContent = product.price;
  descEl.textContent = product.description;


 // ---------------------
  // CHANGE TEXT ON VENDOR BUTTON
  // ---------------------

const contactBtn = document.querySelector(".contact-btn");

if (product.contactType === 1) {
  contactBtn.textContent = "Visit Vendor Page";
}

if (product.contactType === 2) {
  contactBtn.textContent = "View Vendor Info";
}


  // ---------------------
  // FORCE FIRST IMAGE
  // ---------------------

  imageEl.src = images[0];

  // ---------------------
  // DOTS
  // ---------------------

  function renderDots() {

    dotsContainer.innerHTML = "";

    images.forEach((_, i) => {

      const dot = document.createElement("div");
      dot.className = "dot";

      dot.addEventListener("click", () => {
        currentIndex = i;
        updateImage();
      });

      dotsContainer.appendChild(dot);

    });

  }

  function updateDots() {

    document.querySelectorAll(".dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });

  }


// SHUFFLE CAROUSEL =====
function playShuffleAnimation(nextSrc) {

  imageEl.classList.add("shrink-out");

  const card = document.createElement("img");

  card.src = nextSrc;

  card.className =
  `shuffle-card shuffle-${shuffleDirection}`;

  // MATCH REAL IMAGE SIZE
  const rect = imageEl.getBoundingClientRect();

  card.style.width = rect.width + "px";
  card.style.height = rect.height + "px";

  // POSITION OVER REAL IMAGE
  card.style.left = imageEl.offsetLeft + "px";
  card.style.top = imageEl.offsetTop + "px";

  const carousel =
    document.querySelector(".carousel");

  carousel.appendChild(card);

  requestAnimationFrame(() => {
    card.classList.add("animate");
  });

  setTimeout(() => {

    imageEl.src = nextSrc;

    imageEl.classList.remove("shrink-out");

    card.remove();

  }, 650);

}



  // ---------------------
  // UPDATE IMAGE
  // ---------------------

function updateImage() {

  playShuffleAnimation(images[currentIndex]);

  updateDots();

}

  // ---------------------
  // ARROWS
  // ---------------------

  prevBtn.addEventListener("click", () => {

shuffleDirection = "left";

    currentIndex =
      (currentIndex - 1 + images.length) % images.length;
    updateImage();
  });

  nextBtn.addEventListener("click", () => {

shuffleDirection = "right";

    currentIndex =
      (currentIndex + 1) % images.length;
    updateImage();
  });

  // ---------------------
  // LIGHTBOX
  // ---------------------

  imageEl.addEventListener("click", () => {

    imageEl.style.transform = "scale(0.98)";

    setTimeout(() => {
      imageEl.style.transform = "";
    }, 120);

    expandedImage.src = imageEl.src;
    overlay.style.display = "flex";
    overlay.classList.add("show");

  });

  overlay.addEventListener("click", () => {
    overlay.classList.remove("show");
    overlay.style.display = "none";
  });

  // ---------------------
  // INIT
  // ---------------------

  renderDots();
  updateImage();


// SWIPE CAROUSEL
let startX = 0;
let isDragging = false;

imageEl.addEventListener("pointerdown", (e) => {
  startX = e.clientX;
  isDragging = true;
});

imageEl.addEventListener("pointerup", (e) => {

  if (!isDragging) return;

  const endX = e.clientX;
  const diff = startX - endX;

  isDragging = false;

  // ignore small movements
  if (Math.abs(diff) < 60) return;

  if (diff > 0) {
    // swipe left → next image
    nextBtn.click();
  } else {
    // swipe right → previous image
    prevBtn.click();
  }

});

imageEl.addEventListener("pointercancel", () => {
  isDragging = false;
});







});

// DISABLE SAVING PICTURES

document.addEventListener("contextmenu", (e) => {

  if (e.target.tagName === "IMG") {
    e.preventDefault();
  }

});


// VENDOR POPUP

const contactBtn = document.querySelector(".contact-btn");

const vendorOverlay = document.getElementById("vendorOverlay");
const closeVendor = document.getElementById("closeVendor");


const loadingOverlay = document.getElementById("loadingOverlay");

function showLoader() {
  loadingOverlay.style.display = "flex";
}

function hideLoader() {
  loadingOverlay.style.display = "none";
}


contactBtn.addEventListener("click", () => {

  if (!product) return;

  // TYPE 1 → OPEN LINK
if (product.contactType === 1) {

  showLoader();

  setTimeout(() => {

    window.location.href = product.contactLink;

  }, 300);

}

  // TYPE 2 → SHOW POPUP
  if (product.contactType === 2) {

    document.getElementById("vendorName").textContent =
      product.vendorInfo.name;

    document.getElementById("vendorAddress").textContent =
      product.vendorInfo.address;

    document.getElementById("vendorPhone").textContent =
      product.vendorInfo.phone;

    document.getElementById("vendorEmail").textContent =
      product.vendorInfo.email;

    document.getElementById("vendorWebsite").textContent =
      product.vendorInfo.website;

    vendorOverlay.style.display = "flex";
  }

});

// CLOSE BUTTON

closeVendor.addEventListener("click", () => {
  vendorOverlay.style.display = "none";
});

// CLICK OUTSIDE CLOSES

vendorOverlay.addEventListener("click", (e) => {

  if (e.target === vendorOverlay) {
    vendorOverlay.style.display = "none";
  }

});












