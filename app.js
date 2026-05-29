const container =
  document.getElementById("productsContainer");

const searchInput =
  document.getElementById("searchInput");

container.innerHTML = "<p>Loading products...</p>";

// --------------------
// RENDER PRODUCTS
// --------------------

function renderProducts(list) {

  container.innerHTML = "";

  list.forEach(product => {

    const card =
      document.createElement("div");

    card.className = "product-card";

    card.innerHTML = `

      <img
        src="${product.images ? product.images[0] : product.image}"
        class="product-image"
        alt="${product.title}"
      >

      <div class="product-info">

        <h3>${product.title}</h3>

        <p class="price">
          ${product.price}
        </p>

        <p>
          ${product.description}
        </p>

      </div>

    `;

card.addEventListener("click", () => {
  card.style.transform = "scale(0.98)";

  setTimeout(() => {
    window.location.href = `product.html?id=${product.id}`;
  }, 100);
});

    container.appendChild(card);

  });

}

// --------------------
// SEARCH FILTER
// --------------------

function filterProducts() {

  const searchValue =
    searchInput.value.toLowerCase();

  const filtered =
    products.filter(product => {

      return product.title
        .toLowerCase()
        .includes(searchValue);

    });


  // 👇 ADD IT HERE (RIGHT AFTER FILTERING)
if (!filtered || filtered.length === 0) {
  container.innerHTML = `
    <div style="
      grid-column: 1 / -1;
      text-align: center;
      padding: 40px;
      color: #666;
    ">
      <h3>No products found</h3>
      <p>Try a different search term</p>
    </div>
  `;
  return;
}

  renderProducts(filtered);

}

// --------------------
// EVENTS
// --------------------

searchInput.addEventListener(
  "input",
  filterProducts
);

// --------------------
// INITIAL LOAD
// --------------------

renderProducts(products);

window.addEventListener("DOMContentLoaded", () => {

  const backToTopBtn =
    document.getElementById("backToTopBtn");

  if (!backToTopBtn) return;

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

});


// ====================
// POPUP FUNCTIONALITY
// ====================

const infoBtn =
  document.getElementById("infoBtn");

const popupOverlay =
  document.getElementById("popupOverlay");

const closePopup =
  document.getElementById("closePopup");

// OPEN POPUP
infoBtn.addEventListener("click", () => {

  popupOverlay.classList.add("show");

});

// CLOSE WITH X
closePopup.addEventListener("click", () => {

  popupOverlay.classList.remove("show");

});

// CLOSE WHEN CLICKING OUTSIDE
popupOverlay.addEventListener("click", (e) => {

  if (e.target === popupOverlay) {

    popupOverlay.classList.remove("show");

  }

});


// DISABLE SAVING PICTURES

document.addEventListener("contextmenu", (e) => {

  if (e.target.tagName === "IMG") {
    e.preventDefault();
  }

});


// TRUSTED BADGE

const trustedBadge = document.getElementById("trustedBadge");
const trustedOverlay = document.getElementById("trustedOverlay");
const trustedClose = document.getElementById("trustedClose");

trustedBadge.addEventListener("click", () => {
  trustedOverlay.style.display = "flex";
});

trustedClose.addEventListener("click", () => {
  trustedOverlay.style.display = "none";
});

trustedOverlay.addEventListener("click", (e) => {
  if (e.target === trustedOverlay) {
    trustedOverlay.style.display = "none";
  }
});