let products = [];

document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
});

async function fetchProducts() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  products = data.products;
  displayProducts(products);
}

function displayProducts(list) {
  const container = document.getElementById("productList");
  container.innerHTML = "";
  list.forEach(product => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${product.thumbnail}" alt="${product.title}" />
        <h3>${product.title}</h3>
        <p>Price: ₹${product.price}</p>
        <p>Rating: ${product.rating}</p>
      </div>
    `;
  });
}

function searchProducts() {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) {
    alert("Search field cannot be empty!");
    return;
  }
  fetch(`https://dummyjson.com/products/search?q=${query}`)
    .then(res => res.json())
    .then(data => displayProducts(data.products));
}

function sortProducts() {
  const sortBy = document.getElementById("sortBy").value;
  let sorted = [...products];

  if (sortBy === "priceAsc") sorted.sort((a, b) => a.price - b.price);
  if (sortBy === "priceDesc") sorted.sort((a, b) => b.price - a.price);
  if (sortBy === "ratingAsc") sorted.sort((a, b) => a.rating - b.rating);
  if (sortBy === "ratingDesc") sorted.sort((a, b) => b.rating - a.rating);

  displayProducts(sorted);
}