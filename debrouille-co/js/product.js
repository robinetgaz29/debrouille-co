// Récupère l'ID du produit depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// Récupère les produits depuis localStorage
let products = JSON.parse(localStorage.getItem("products")) || [];

// Cherche le produit correspondant
const product = products.find(p => p.id == productId);

if (!product) {
  document.querySelector("#product-page").innerHTML = "<p>Produit introuvable.</p>";
} else {
  document.querySelector("#product-image").src = product.img;
  document.querySelector("#product-image").alt = product.title;
  document.querySelector("#product-title").textContent = product.title;
  document.querySelector("#product-price").textContent = product.price.toFixed(2) + " €";
  document.querySelector("#product-desc").textContent = product.desc;
}

// Ajouter au panier
document.querySelector("#add-to-cart").addEventListener("click", () => {
  let cart = JSON.parse(localStorage.getItem("debrouille_cart")) || {};
  cart[product.id] = (cart[product.id] || 0) + 1;
  localStorage.setItem("debrouille_cart", JSON.stringify(cart));
  alert("Produit ajouté au panier ✅");
});
