const catalogEl = document.querySelector('#catalog');
const cartCountEl = document.querySelector('#cart-count');
const productTpl = document.querySelector('#product-template');

let products = []; // tableau des produits
let cart = JSON.parse(localStorage.getItem('debrouille_cart') || '{}'); // {id: qty}

// Sauvegarde panier
function saveCart() {
  localStorage.setItem('debrouille_cart', JSON.stringify(cart));
  updateCartCount();
}

// Compteur panier
function updateCartCount() {
  const total = Object.values(cart).reduce((a,b) => a+b, 0);
  cartCountEl.textContent = total;
}

// Charger le catalogue
async function loadProducts() {
  try {
    const res = await fetch('catalog.json');
    products = await res.json();
    localStorage.setItem('products', JSON.stringify(products)); // pour product.html
    renderCatalog();
  } catch (e) {
    catalogEl.innerHTML = '<p>Impossible de charger le catalogue.</p>';
  }
}

// Afficher catalogue
function renderCatalog() {
  catalogEl.innerHTML = '';
  for (const p of products) {
    const clone = productTpl.content.cloneNode(true);

    clone.querySelector('.thumb').src = p.img;
    clone.querySelector('.thumb').alt = p.title;
    clone.querySelector('.title').textContent = p.title;
    clone.querySelector('.desc').textContent = p.desc;
    clone.querySelector('.price').textContent = p.price.toFixed(2) + ' €';

    // Click sur image ou titre → page produit
    clone.querySelector('.thumb').addEventListener('click', () => {
      window.location.href = `product.html?id=${p.id}`;
    });
    clone.querySelector('.title').addEventListener('click', () => {
      window.location.href = `product.html?id=${p.id}`;
    });

    // Bouton Ajouter au panier
    clone.querySelector('.add-to-cart').addEventListener('click', () => {
      cart[p.id] = (cart[p.id] || 0) + 1;
      saveCart();
      alert('Ajouté au panier ✅');
    });

    catalogEl.appendChild(clone);
  }
}

loadProducts();
updateCartCount();
