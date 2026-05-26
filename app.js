// app.js — lógica completa para The Boss (con imágenes locales)

// ---------- Config ----------
const BUSINESS_PHONE = '573116468485'; // <- reemplaza por el número real (sin '+')
const DELIVERY_FEE = 0; // tarifa por defecto de domicilio
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxCjtOiaVzHTFPtGwPfYeXa6e1uHBmFfxHuTJFu4Z8q6YMx5ceLz-1zmfrmMz961MRAGw/exec';
const AVAILABILITY_POLL_MS = 500;

// ---------- Datos de ejemplo ----------
const products = [
  // ===== TAMAÑOS =====
  { id: 'vik-coco', category: 'Vikingos', title: 'Vikingo de Coco', price: 4500, desc: 'Delicioso vikingo de coco 100% natural a base de leche.', image: 'images/vik-coco.png' },
  { id: 'vik-maracumango', category: 'Vikingos', title: 'Vikingo Maracumango', price: 4500, desc: 'Exótica mezcla de maracuyá y mango a base de leche.', image: 'images/vik-maracumango.png' },
  { id: 'vik-arequipe', category: 'Vikingos', title: 'Vikingo de Arequipe', price: 4500, desc: 'Delicioso vikingo con trozos de arequipe a base de leche.', image: 'images/vik-arequipe.png' },
  { id: 'vik-choconutella', category: 'Vikingos', title: 'Vikingo Choconutella', price: 4500, desc: 'Cremoso vikingo de chocolate y Nutella con trozos de crema de avellana a base de leche.', image: 'images/vik-choconutella.png' },
  { id: 'vik-curuba', category: 'Vikingos', title: 'Vikingo de Curuba', price: 4500, desc: 'Sabor tropical 100% natural a base de leche', image: 'images/vik-curuba.png' },
  { id: 'vik-guanabana', category: 'Vikingos', title: 'Vikingo de Guanábana', price: 4500, desc: 'Cremoso vikingo de guanábana 100% natural a base de leche.', image: 'images/vik-guanabana.png' },
  { id: 'vik-mangobiche', category: 'Vikingos', title: 'Vikingo de Mango Biche', price: 4500, desc: 'Refrescante combinación de Mango Biche 100% natural a base de agua', image: 'images/vik-mangobiche.png' },
  { id: 'vik-mora', category: 'Vikingos', title: 'Vikingo de Mora', price: 4500, desc: '100% fruta, sabor intenso y natural a base de leche', image: 'images/vik-mora.png' },
  { id: 'vik-ronpasas', category: 'Vikingos', title: 'Vikingo Ron con Pasas', price: 4500, desc: 'Sabor tradicional, cremoso a base de leche.', image: 'images/vik-ronpasas.png' },
  { id: 'vik-mantecado', category: 'Vikingos', title: 'Vikingo de Mantecado', price: 4500, desc: 'Sabor tradicional, suave y cremoso a base de leche.', image: 'images/vik-mantecado.png' },
  { id: 'vik-fresasfrutos', category: 'Vikingos', title: 'Vikingo Fresas con Frutos Rojos', price: 4500, desc: 'Combinación de fresas y mermelada de frutos rojos 100% natural a base de leche.', image: 'images/vik-fresasfrutos.png' },
  { id: 'vik-arrozconleche', category: 'Vikingos', title: 'Vikingo de Arroz con Leche', price: 4500, desc: 'Granos de arroz suaves en cada bocado, mezclados con una base láctea muy cremosa con unas cuantas uvas pasas.', image: 'images/vik-arrozconleche.png' },
  { id: 'vik-quesobocadillo', category: 'Vikingos', title: 'Vikingo Queso con Bocadillo', price: 4500, desc: 'Deliciosa combinación entre lo salado del queso y lo dulce del bocadillo 100% natural a base de leche', image: 'images/vik-quesobocadillo.png' },
  { id: 'vik-cafe', category: 'Vikingos', title: 'Vikingo de Café', price: 4500, desc: 'Delicioso vikingo cubierto con arequipe de café cremoso y refrescante a base de leche.', image: 'images/vik-cafe.png' },
  { id: 'vik-oreo', category: 'Vikingos', title: 'Vikingo de Oreo', price: 4500, desc: 'Cremoso vikingo con trozos de galleta Oreo 100% natural a base de leche.', image: 'images/vik-oreo.png' },
  { id: 'vik-tamarindo', category: 'Vikingos', title: 'Vikingo de tamarindo', price: 4500, desc: 'Delicioso vikingo hecho con pulpa natural. Recubierto con mermelada de tamarindo. A base de agua', image: 'images/vik-tamarindo.png' },
  { id: 'vik-pina', category: 'Vikingos', title: 'Vikingo de Piña', price: 4500, desc: 'Refrescante sabor tropical de piña natural a base de leche.', image: 'images/vik-pina.png' },
  { id: 'vik-galleta', category: 'Vikingos', title: 'Vikingo de Galleta', price: 4500, desc: 'Refrescante y delicioso con trocitos de galleta tipo rondalla a base de leche', image: 'images/vik-galleta.png' },
  { id: 'vik-banano', category: 'Vikingos', title: 'Vikingo de Banano', price: 4500, desc: 'Cremoso y delicioso a base de leche con trozo de banano', image: 'images/vik-banano.png' },
  { id: 'vik-kola', category: 'Vikingos', title: 'Vikingo Kola con Leche', price: 4500, desc: 'Clásico sabor colombiano a base de leche.', image: 'images/vik-kola.png' },
  { id: 'vik-milo', category: 'Vikingos', title: 'Vikingo de Milo', price: 4500, desc: 'Cremoso vikingo con trocitos de milo crocante 100% natural a base de leche', image: 'images/vik-milo.png' },
  { id: 'vik-vainillachips', category: 'Vikingos', title: 'Vikingo Vainilla Chips', price: 4500, desc: 'Delicado sabor a vainilla con chispas de chocolate 100% natural a base de leche.', image: 'images/vik-vainillachips.png' },
  { id: 'vik-mani', category: 'Vikingos', title: 'Vikingo de Maní', price: 4500, desc: 'Vikingo cremoso con trocitos de maní 100% natural a base de leche.', image: 'images/vik-mani.png' },
  { id: 'vik-chicle', category: 'Vikingos', title: 'Vikingo de Chicle', price: 4500, desc: 'Delicioso suave y refrescante sabor a chicle con chicle añadido a base de leche', image: 'images/vik-chicle.png' },
  { id: 'vik-lulo', category: 'Vikingos', title: 'Vikingo de Lulo', price: 4500, desc: 'Delicioso vikingo con trocitos de lulo 100% Natural a base de leche.', image: 'images/vik-lulo.png' },
  { id: 'vik-salpicon', category: 'Vikingos', title: 'Vikingo de Salpicón', price: 4500, desc: 'Mix de frutas tropicales finamente picadas  100% natural a base de leche.', image: 'images/vik-salpicon.png' },
  { id: 'vik-nucita', category: 'Vikingos', title: 'Vikingo de Nucita', price: 4500, desc: 'Cremoso e irresistible vikingo combinado con chocolate blanco y chocolate negro 100% natural a base de leche.', image: 'images/vik-nucita.png' },
  //AGUAS
  { id: 'Agua1', category: 'Aguas', title: 'Botella agua cristal 600ml', price: 2500, desc: 'Botella de agua pura y refrescante 600ml.', image: 'images/aguaBotella1.png' },
  { id: 'Agua2', category: 'Aguas', title: 'Pequeña botella agua cristal 300 ml', price: 1500, desc: 'Botella de agua pura y refrescante 300ml.', image: 'images/aguaBotella2.png' },
  { id: 'Agua3', category: 'Aguas', title: 'Botella agua cristal 600ml con gas', price: 2500, desc: 'Botella de agua pura y refrescante con gas 600ml.', image: 'images/aguaBotella3.png' },
];

const categories = [...new Set(products.map(p=>p.category))];

// ---------- Estado ----------
localStorage.removeItem('tb_cart');
let cart = [];
let activeCategory = 'Vikingos';

// ---------- DOM refs ----------
const catalogEl = document.getElementById('catalog');
const categoriesEl = document.querySelector('.categories');
const navBtns = document.querySelectorAll('.nav-btn');
const cartCountEl = document.getElementById('cart-count');
const cartDrawer = document.getElementById('cart-drawer');
const cartItemsEl = document.getElementById('cart-items');
const cartSubtotalEl = document.getElementById('cart-subtotal');
const cartDeliveryEl = document.getElementById('cart-delivery');
const cartTotalEl = document.getElementById('cart-total');
const openCartBtn = document.getElementById('open-cart');
const closeCartBtn = document.getElementById('close-cart');
const checkoutBtn = document.getElementById('checkout-btn');
const productModal = document.getElementById('product-modal');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');
const checkoutModal = document.getElementById('checkout-modal');
const checkoutForm = document.getElementById('checkout-form');
const addressLabel = document.getElementById('address-label');
const checkoutClose = document.getElementById('checkout-close');
const backToCartBtn = document.getElementById('back-to-cart');
const clearCartBtn = document.getElementById('clear-cart');
const searchInput = document.getElementById('search');
const availabilityLoader = document.getElementById('availability-loader');
let checkoutRadioEventsBound = false;
let soldOutModalOpen = false;
let availabilityFetchInFlight = false;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function hideAvailabilityLoader() {
  if (!availabilityLoader) return;
  availabilityLoader.classList.add('is-hidden');
  setTimeout(() => availabilityLoader.remove(), 420);
}

function parseAvailabilityList(data) {
  const status = {};
  if (!Array.isArray(data)) return status;

  data.forEach(item => {
    const id = item?.id ? String(item.id).trim() : '';
    if (!id) return;
    status[id] = String(item.disponible).toLowerCase() === 'true' || item.disponible === true;
  });

  return status;
}

function readCachedAvailability() {
  try {
    return JSON.parse(localStorage.getItem('productStatus')) || {};
  } catch (err) {
    return {};
  }
}

async function getAvailabilityStatus() {
  try {
    const res = await fetch(SCRIPT_URL + '?t=' + Date.now());
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const status = parseAvailabilityList(data);
    localStorage.setItem('productStatus', JSON.stringify(status));
    return status;
  } catch (err) {
    console.warn('Disponibilidad: usando cache local', err);
    return readCachedAvailability();
  }
}

function isProductAvailable(productId, status = readCachedAvailability()) {
  return status[productId] === undefined ? true : Boolean(status[productId]);
}

function showSoldOutProductModal(product, removedQty = 0) {
  if (!product || soldOutModalOpen) return;
  soldOutModalOpen = true;

  const message = removedQty > 0
    ? `Quitamos ${removedQty} del carrito porque este sabor esta agotado. Elige otro sabor.`
    : 'Este sabor esta agotado. Elige otro sabor.';

  if (typeof Swal !== 'undefined') {
    Swal.fire({
      icon: 'warning',
      title: 'Sabor agotado',
      text: message,
      imageUrl: product.image,
      imageAlt: product.title,
      imageWidth: 140,
      imageHeight: 140,
      confirmButtonText: 'Elegir otro',
      background: '#ffffff',
      color: '#000000',
      iconColor: '#e91e63',
      confirmButtonColor: '#e91e63'
    }).finally(() => {
      soldOutModalOpen = false;
    });
  } else {
    alert(`${product.title}\n${message}`);
    soldOutModalOpen = false;
  }
}

function removeUnavailableCartItems(status, showAlert = true) {
  if (!cart.length) return true;

  const removedByProduct = new Map();
  cart = cart.filter(item => {
    if (isProductAvailable(item.productId, status)) return true;
    const current = removedByProduct.get(item.productId) || { qty: 0, item };
    current.qty += item.qty;
    removedByProduct.set(item.productId, current);
    return false;
  });

  if (!removedByProduct.size) return true;

  persistCart();
  refreshCartUI();

  if (showAlert) {
    const firstRemoved = Array.from(removedByProduct.values())[0];
    const product = products.find(p => p.id === firstRemoved.item.productId) || firstRemoved.item;
    showSoldOutProductModal(product, firstRemoved.qty);
  }

  return false;
}

// ---------- Init ----------
function init(){
  resetClientForm(); // 👈 AQUI
  renderCategories();
  bindEvents();
  refreshCartUI();
  setActiveCategory(activeCategory);
  const availabilityPromise = fetchAvailability();
  updateCheckoutFieldStates();
  Promise.race([Promise.resolve(availabilityPromise), delay(4500)])
    .finally(() => hideAvailabilityLoader());
}


function resetClientForm() {
  const form = document.getElementById('checkout-form');
  if (!form) return;

  // Reset visual
  form.reset();

  // Limpiar posibles datos guardados manualmente (por si luego implementas persistencia)
  form.querySelectorAll('input, textarea, select').forEach(el => {
    if (el.type === 'radio' || el.type === 'checkbox') {
      el.checked = false;
    } else {
      el.value = '';
    }
  });

  // Opcional: dejar valores por defecto (pro UX)
  const domicilio = form.querySelector('input[value="domicilio"]');
  if (domicilio) domicilio.checked = true;

  // Ocultar campos dinámicos
  document.getElementById('address-label')?.classList.remove('hidden');
  document.getElementById('envio-row')?.classList.remove('hidden');
  updateCheckoutTotals();
  updateCheckoutFieldStates();
}

init();

window.addEventListener('productAvailabilityChanged', e => {
  const { id } = e.detail;
  applyAvailabilityToRendered(id);
});

window.addEventListener('storage', (e) => {
  if (e.key === 'productStatus' || e.key === 'productStatusUpdate') {
    applyAvailabilityToRendered();
    // si hay un modal abierto (product-overlay) actualiza sus extras
    const modal = document.querySelector('.product-overlay');
    if (modal) applyExtrasAvailability(modal);
  }
});




// ---------- Render categorías ----------
function renderCategories(){
  categoriesEl.innerHTML = '';
  categories.forEach(cat=>{
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = cat === activeCategory ? 'active' : '';
    btn.dataset.cat = cat;
    btn.textContent = capitalize(cat);
    btn.addEventListener('click', ()=> switchCategory(cat));
    categoriesEl.appendChild(btn);
  });
}

// ---------- Cambiar categoría ----------
function setActiveCategory(cat){
  activeCategory = cat;
  Array.from(document.querySelectorAll('.categories button')).forEach(b=> b.classList.toggle('active', b.dataset.cat === cat));
  Array.from(navBtns).forEach(b=> b.classList.toggle('active', b.dataset.cat === cat));
  return renderProducts(cat);
}

function switchCategory(cat){
  const ct = catalogEl;
  ct.classList.remove('fade-in');
  ct.classList.add('fade-out');
  setTimeout(()=>{
    setActiveCategory(cat);
    ct.classList.remove('fade-out');
    ct.classList.add('fade-in');
  }, 45);
}
// ---------- Render productos ----------
function renderProducts(cat) { 
  const q = (searchInput.value || '').trim().toLowerCase();
  const items = products.filter(p => 
    p.category === cat && 
    (p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q))
  );

  catalogEl.innerHTML = '';

  if (items.length === 0) {
    catalogEl.innerHTML = `<div class="no-results">No hay productos</div>`;
    return Promise.resolve();
  }

  items.forEach(p => {
    const el = document.createElement('article');
    el.className = 'card';
    el.dataset.id = p.id; // <-- asegúrate de esto
    el.innerHTML = `
      <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}">
      <div class="title">${escapeHtml(p.title)}</div>
      <div class="desc">${escapeHtml(p.desc)}</div>
      <div class="meta">
        <div class="price">$${numberWithCommas(p.price)}</div>
        <button class="add" data-id="${p.id}">Agregar</button>
      </div>
    `;
    // el evento solo se agrega si el producto está disponible (ver abajo)
    catalogEl.appendChild(el);
  });

  // después de crear las cards, aplicamos disponibilidad y bind de eventos
  return applyAvailabilityToRendered();
}


// ====== 🔄 SINCRONIZACIÓN DE DISPONIBILIDAD CON GOOGLE SHEETS ======

// SCRIPT_URL es el mismo endpoint que usas en el admin.

async function fetchAvailability() {
  if (availabilityFetchInFlight) return readCachedAvailability();
  availabilityFetchInFlight = true;

  try {
    const prevStatus = readCachedAvailability();
    const status = await getAvailabilityStatus();

    // Comparar para no refrescar la UI sin necesidad
    if (JSON.stringify(prevStatus) !== JSON.stringify(status)) {
      localStorage.setItem('productStatus', JSON.stringify(status));

      // 🔥 Reaplica visualmente la disponibilidad actualizada
      if (typeof applyAvailabilityToRendered === 'function') {
        applyAvailabilityToRendered(null, status);
      }

      console.log('🔁 Estado actualizado desde Google Sheets');
    }

    removeUnavailableCartItems(status, true);
    return status;
  } catch (err) {
    console.error('❌ Error al obtener disponibilidad:', err);
    return readCachedAvailability();
  } finally {
    availabilityFetchInFlight = false;
  }
}

// Mantiene el estado de "Agotado" casi en vivo sin bloquear los clicks del cliente.
setInterval(fetchAvailability, AVAILABILITY_POLL_MS);




// lee estados guardados y aplica cambios solo al botón del producto correspondiente
function applyAvailabilityToRendered(productId = null, status = readCachedAvailability()) {
  removeUnavailableCartItems(status, true);

  // Si se pide solo un producto, actualiza solo ese
  const cards = productId 
    ? [document.querySelector(`.card[data-id="${productId}"]`)].filter(Boolean)
    : document.querySelectorAll('.card');

  cards.forEach(card => {
    const id = card.dataset.id;
    if (!id) return;

    const addBtn = card.querySelector('.add');
    if (!addBtn) return;

    const disponible = status[id] === undefined ? true : Boolean(status[id]);

    // Reset visual
    addBtn.disabled = false;
    addBtn.textContent = 'Agregar';
    addBtn.classList.remove('agotado-btn');
    addBtn.style.background = '';
    addBtn.style.color = '';

    // Si el producto está agotado, aplicar solo a ese
    if (!disponible) {
      addBtn.disabled = true;
      addBtn.textContent = 'Agotado';
      addBtn.classList.add('agotado-btn');
      addBtn.style.background = '#ccc';
      addBtn.style.color = '#666';
    }
  });
}


// Aplica disponibilidad a los extras dentro del modal (usa key 'extra:{name}')
async function applyExtrasAvailability(modalEl = document) {
  let status = {};

  try {
    const res = await fetch(SCRIPT_URL + '?t=' + Date.now());
    const data = await res.json();

    // 🔥 construimos el objeto de estado de forma robusta
    data.forEach(item => {
      const rawId = item.id ? String(item.id).trim() : "";
      const isAvailable = String(item.disponible).toLowerCase() === 'true' || item.disponible === true;
      status[rawId] = isAvailable;

      // si el id empieza por "extra" o es de tipo extra, lo duplicamos también como extra:Nombre
      if (rawId && !rawId.startsWith("extra:") && rawId.toLowerCase().includes("extra")) {
        status[`extra:${rawId.replace(/^extra:?/, "").trim()}`] = isAvailable;
      }
    });

    localStorage.setItem('productStatus', JSON.stringify(status));
  } catch (err) {
    status = JSON.parse(localStorage.getItem('productStatus')) || {};
    console.warn('⚠️ applyExtrasAvailability: usando cache local', err);
  }

  // aplicamos los estilos
  modalEl.querySelectorAll('.extras-list label').forEach(label => {
    const checkbox = label.querySelector('input[type="checkbox"]');
    if (!checkbox) return;

    const name = checkbox.dataset.name?.trim() || "";
    const id = checkbox.dataset.id?.trim() || "";

    const keyById = status[id];
    const keyByName = status[`extra:${name}`];

    const disponible = !(
      keyById === false ||
      keyByName === false ||
      String(keyById).toLowerCase() === 'false' ||
      String(keyByName).toLowerCase() === 'false'
    );

    const plusBtn = label.querySelector('.plus-extra');
    const minusBtn = label.querySelector('.minus-extra');
    const qtyDisplay = label.querySelector('.extra-qty');

    if (!disponible) {
      label.classList.add('agotado');
      checkbox.disabled = true;
      checkbox.checked = false;
      if (plusBtn) plusBtn.disabled = true;
      if (minusBtn) minusBtn.disabled = true;
      if (qtyDisplay) qtyDisplay.textContent = 'Agotado';
      label.style.opacity = '0.5';
    } else {
      label.classList.remove('agotado');
      checkbox.disabled = false;
      if (plusBtn) plusBtn.disabled = false;
      if (minusBtn) minusBtn.disabled = false;
      if (qtyDisplay && qtyDisplay.textContent === 'Agotado') qtyDisplay.textContent = '0';
      label.style.opacity = '';
    }
  });
}














// ---------- MINI MODAL CLEAN ----------
// ---------- FUNCION CORREGIDA: openProductModal ----------
function openProductModal(id, cartIndex = null) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  if (!isProductAvailable(id)) {
    if (cartIndex !== null) {
      cart.splice(cartIndex, 1);
      persistCart();
      refreshCartUI();
    }
    showSoldOutProductModal(p, cartIndex !== null ? 1 : 0);
    return;
  }

  // === CREAR OVERLAY ===
  const overlay = document.createElement("div");
  overlay.className = "product-overlay";
  overlay.innerHTML = `
    <div class="product-sheet">
      <div class="modal-header">
        <span class="close">&times;</span>
      </div>

      <div class="modal-body">
        <div class="image-wrap">
          <img src="${p.image}" alt="${p.title}">
        </div>

        <div class="info">
          <h2>${p.title}</h2>
          <p>${p.desc}</p>

          ${
            p.extras?.length
              ? `<h3>Adiciones</h3>
              <div class="extras-list">
                ${p.extras
                  .map(
                    (e, i) => `
                      <label>
                        <input type="checkbox" data-id="${e.id}" data-name="${e.name}" data-price="${e.price}">
                        <span>${e.name}</span>
                        <span class="extra-controls" data-index="${i}">
                          <button class="minus-extra">−</button>
                          <span class="extra-qty">0</span>
                          <button class="plus-extra">+</button>
                        </span>
                        <small>+$${numberWithCommas(e.price)}</small>
                      </label>
                    `
                  )
                  .join("")}
              </div>` : ""
          }

          <div class="quantity">
            <button class="minus">−</button>
            <span class="qty">1</span>
            <button class="plus">+</button>
          </div>

          <button class="add-btn">
            ${cartIndex !== null ? 'Actualizar' : 'Agregar'} <span class="price">$${numberWithCommas(p.price)}</span>
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  // Esperar un pequeño delay para asegurar que el modal y sus hijos ya están en el DOM
  setTimeout(() => {
  applyExtrasAvailability(overlay)
    .then(() => console.log("🟢 Disponibilidad de extras aplicada"))
    .catch(err => console.warn("⚠️ Error al aplicar extras:", err));
}, 0);
 // ✅ aplicar disponibilidad de extras

  

  // === CIERRE DEL MODAL ===
  const closeBtn = overlay.querySelector(".close");
  closeBtn.addEventListener("click", () => overlay.remove());
  overlay.addEventListener("click", e => {
    if (e.target === overlay) overlay.remove();
  });

  // === VARIABLES ===
  let qty = 1;
  const qtyEl = overlay.querySelector(".qty");
  const priceEl = overlay.querySelector(".price");
  const extrasQty = Array(p.extras?.length || 0).fill(0);
  const extrasInputs = overlay.querySelectorAll(".extras-list input");

  // --- SI ES EDICIÓN, CARGAR VALORES EXISTENTES ---
  if (cartIndex !== null) {
    const item = cart[cartIndex];
    qty = item.qty;
    qtyEl.textContent = qty;
    if (item.extras?.length) {
      item.extras.forEach(e => {
        const index = p.extras.findIndex(pe => pe.name === e.name);
        if (index > -1) extrasQty[index] = e.qty;
      });
    }
    extrasInputs.forEach((input, i) => {
      input.checked = extrasQty[i] > 0;
      const qtyDisplay = input.closest('label').querySelector('.extra-qty');
      qtyDisplay.textContent = extrasQty[i];
    });
    updatePrice();
  }

  // === ACTUALIZAR PRECIO ===
  function updatePrice() {
    const extrasTotal = (p.extras || []).reduce((sum, e, i) => sum + e.price * extrasQty[i], 0);
    const total = (p.price + extrasTotal) * qty;
    priceEl.textContent = `$${numberWithCommas(total)}`;
  }

  // === BOTONES DE CANTIDAD PRINCIPAL ===
  overlay.querySelector(".plus").addEventListener("click", () => { qty++; qtyEl.textContent = qty; updatePrice(); });
  overlay.querySelector(".minus").addEventListener("click", () => { if(qty>1){qty--;qtyEl.textContent=qty;updatePrice();} });

  // === BOTONES DE CADA EXTRA ===
  overlay.querySelectorAll(".plus-extra").forEach(btn => {
    const index = Number(btn.parentElement.dataset.index);
    const qtyDisplay = btn.parentElement.querySelector(".extra-qty");
    btn.addEventListener("click", () => { extrasQty[index]++; qtyDisplay.textContent=extrasQty[index]; extrasInputs[index].checked=extrasQty[index]>0; updatePrice(); });
  });
  overlay.querySelectorAll(".minus-extra").forEach(btn => {
    const index = Number(btn.parentElement.dataset.index);
    const qtyDisplay = btn.parentElement.querySelector(".extra-qty");
    btn.addEventListener("click", () => { if(extrasQty[index]>0){ extrasQty[index]--; qtyDisplay.textContent=extrasQty[index]; extrasInputs[index].checked=extrasQty[index]>0; updatePrice(); } });
  });

  // === AGREGAR O ACTUALIZAR EN EL CARRITO ===
  overlay.querySelector(".add-btn").addEventListener("click", () => {
    const status = readCachedAvailability();
    if (!isProductAvailable(p.id, status)) {
      if (cartIndex !== null) {
        cart.splice(cartIndex, 1);
        persistCart();
        refreshCartUI();
      }
      overlay.remove();
      applyAvailabilityToRendered(p.id, status);
      showSoldOutProductModal(p, cartIndex !== null ? qty : 0);
      return;
    }

    const extras = (p.extras || []).map((e, i) => ({ name: e.name, price: e.price, qty: extrasQty[i] })).filter(e => e.qty > 0);
    const extrasSum = extras.reduce((a, e) => a + e.price * e.qty, 0);
    const finalUnitPrice = p.price + extrasSum;

    const item = { productId: p.id, title: p.title, price: finalUnitPrice, qty, image: p.image, extras };

    if (cartIndex !== null) {
      cart[cartIndex] = item; // actualizar producto existente
    } else {
      addToCart(item); // agregar producto nuevo
    }

    persistCart();
    refreshCartUI();
    updateCartBadge();
    overlay.remove();
    cartDrawer.classList.remove('hidden'); // mostrar carrito actualizado
    showCartHintToast(); // ✅ NUEVO

  });
}




// ---------- Carrito ----------

// Agregar producto al carrito
function addToCart(item) {
  // Si ya existe el mismo producto con las mismas adiciones, solo aumentar cantidad
  const existing = cart.find(c => 
    c.productId === item.productId && 
    JSON.stringify(c.extras) === JSON.stringify(item.extras)
  );

  if (existing) {
    existing.qty += item.qty;
  } else {
    cart.push(item);
  }
  persistCart();
  refreshCartUI();
  updateCartBadge();
}

// Guardar en localStorage
function persistCart() {
  localStorage.setItem('tb_cart', JSON.stringify(cart));
}

// Actualizar contador del ícono del carrito
// 1. Modifica tu función actual para que actualice AMBOS contadores
function updateCartBadge() {
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  
  // Contador del header (el que ya tienes)
  if(cartCountEl) cartCountEl.textContent = count;
  
  // Nuevo contador de la burbuja flotante
  const floatingCountEl = document.querySelector('.bubble-count');
  if(floatingCountEl) floatingCountEl.textContent = count;
}

// 2. Lógica para mostrar/ocultar la burbuja al hacer scroll
const floatingCart = document.getElementById('floating-cart');
const headerCart = document.getElementById('open-cart'); // Tu carrito original del header

window.addEventListener('scroll', () => {
  const headerCartPos = headerCart.getBoundingClientRect().bottom;

  if (headerCartPos < 0) {
    // Si el carrito del header ya no se ve, muestra la burbuja
    floatingCart.classList.remove('hidden');
  } else {
    // Si el header es visible, oculta la burbuja
    floatingCart.classList.add('hidden');
  }
});

// 3. Hacer que el botón flotante también abra el carrito
document.getElementById('open-cart-floating').addEventListener('click', () => {
  cartDrawer.classList.remove('hidden');
  cartDrawer.setAttribute('aria-hidden', 'false');
});

// Renderizar los ítems del carrito
// ---------- Carrito ----------
// ---------- refreshCartUI CORREGIDA PARA REFLEJAR CAMBIOS ----------
function refreshCartUI() {
  cartItemsEl.innerHTML = '';
  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<div class="empty">Tu carrito está vacío </div>';
    // cartSubtotalEl.textContent = '$0';
    // cartDeliveryEl.textContent = '$0';
    cartTotalEl.textContent = '$0';
    updateCartBadge();
    return;
  }

  let subtotal = 0;

  cart.forEach((item, idx) => {
    // --- CALCULAR PRECIO REAL DEL ITEM CON EXTRAS ---
    const extrasTotal = item.extras?.reduce((sum, e) => sum + e.price * e.qty, 0) || 0;
    const itemUnitPrice = item.price - extrasTotal; // precio base
    const itemTotal = (itemUnitPrice + extrasTotal) * item.qty;
    subtotal += itemTotal;

    const extrasText = item.extras?.length
      ? item.extras.map(e => `+ ${e.name} x${e.qty} ($${numberWithCommas(e.price * e.qty)})`).join('<br>')
      : '';

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img class="cart-item-img" src="${item.image}" alt="${item.title}">
      <div class="info">
        <h4>${item.title}</h4>
        ${extrasText ? `<small>${extrasText}</small>` : ''}
        <div class="qty-controls">
          <button class="minus">−</button>
          <span>${item.qty}</span>
          <button class="plus">+</button>
        </div>
      </div>
      <div class="price">
        <span>$${numberWithCommas(itemTotal)}</span>
        <button class="remove-btn" type="button" title="Eliminar producto" aria-label="Eliminar ${escapeHtml(item.title)}">
          <span aria-hidden="true"></span>
        </button>
      </div>
    `;

    // --- CONTROL DE CANTIDAD ---
    div.querySelector('.plus').addEventListener('click', () => {
      item.qty++;
      persistCart();
      refreshCartUI();
    });

    div.querySelector('.minus').addEventListener('click', () => {
      if (item.qty > 1) {
        item.qty--;
      } else {
        cart.splice(idx, 1);
      }
      persistCart();
      refreshCartUI();
    });

    // --- ELIMINAR PRODUCTO ---
   div.querySelector('.remove-btn').addEventListener('click', () => {

    Swal.fire({
        title: `¿Eliminar "${item.title}" del carrito?`,
        icon: "warning",
        background: "#ffffff",
        color: "#000000",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",

        // 🎨 COLORES DE LOS BOTONES
        confirmButtonColor: "#e91e63", // rosado
        cancelButtonColor: "#4caf50",  // verde

        // Forzar texto blanco
        customClass: {
            confirmButton: "swal-confirm-white-text",
            cancelButton: "swal-cancel-white-text"
        }
    }).then((result) => {
        if (result.isConfirmed) {
            cart.splice(idx, 1);
            persistCart();
            refreshCartUI();
        }
    });

});


    // --- EDITAR PRODUCTO DESDE EL CARRITO ---
    div.addEventListener('click', (e) => {
      if (!e.target.closest('.minus, .plus, .remove-btn')) {
        cartDrawer.classList.add('hidden'); // esconder carrito
        openProductModal(item.productId, idx); // enviar índice para edición
      }
    });

    cartItemsEl.appendChild(div);
  });

  // cartSubtotalEl.textContent = `$${numberWithCommas(subtotal)}`;
  cartDeliveryEl.textContent = `$${numberWithCommas(DELIVERY_FEE)}`;
  cartTotalEl.textContent = `$${numberWithCommas(subtotal)}`;
  updateCartBadge();
}













// ---------- Interacciones UI ----------
openCartBtn.addEventListener('click', () => {
  cartDrawer.classList.remove('hidden');
  cartDrawer.setAttribute('aria-hidden', 'false');
  showCartHintToast(); // ✅ toast verde junto a la X
});

closeCartBtn.addEventListener('click', ()=>{ cartDrawer.classList.add('hidden'); cartDrawer.setAttribute('aria-hidden','true'); });
checkoutBtn.addEventListener('click', ()=>{ cartDrawer.classList.add('hidden'); openCheckout(); });
clearCartBtn.addEventListener('click', ()=>{ if(confirm('Vaciar carrito?')){ cart = []; persistCart(); refreshCartUI(); } });

// ---------- Checkout ----------

// ---------- Checkout ----------
function openCheckout() {
 const status = readCachedAvailability();
 if (!removeUnavailableCartItems(status, true)) return;

 if (cart.length === 0) {
    Swal.fire({
        icon: 'warning',
        title: 'Carrito vacío',
        text: 'Debes agregar productos antes de continuar.',
        background: '#ffffff',       // Fondo blanco
        color: '#000000',            // Texto negro
        iconColor: '#e91e63',        // Icono rosado
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#e91e63' // Botón rosado
    });
    return;
}


  // 🔹 Recalcular subtotal actual (incluyendo extras)
const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);


  const delivery = 0; // por defecto
  const total = subtotal + delivery;

  // 🔹 Actualizar DOM inicial
  document.getElementById('cart-subtotal').textContent = `$${numberWithCommas(subtotal)}`;
  document.getElementById('cart-delivery').textContent = `$${numberWithCommas(delivery)}`;
  document.getElementById('cart-total').textContent = `$${numberWithCommas(total)}`;
  document.getElementById('cart-total-checkout').textContent = `$${numberWithCommas(total)}`;

  // 🔹 Reset formulario
  checkoutForm.reset();
  const domicilio = checkoutForm.querySelector('input[value="domicilio"]');
  if (domicilio) domicilio.checked = true;
  if (typeof step1 !== 'undefined' && step1 && step2) {
    step1.classList.add('active');
    step2.classList.remove('active');
  }
  document.getElementById('address-label').classList.remove('hidden');
  document.getElementById('envio-row').classList.remove('hidden');
  updateCheckoutTotals();
  updateCheckoutFieldStates();

  // 🔹 Mostrar modal
  checkoutModal.classList.remove('hidden');
  checkoutModal.setAttribute('aria-hidden', 'false');
}


checkoutClose.addEventListener('click', () => {
  checkoutModal.classList.add('hidden');
  checkoutModal.setAttribute('aria-hidden', 'true');
});

backToCartBtn.addEventListener('click', () => {
  checkoutModal.classList.add('hidden');
  cartDrawer.classList.remove('hidden');
});

// === Calcular totales del checkout ===
function updateCheckoutTotals() {
  const method = checkoutForm.querySelector('input[name="method"]:checked')?.value || 'recoger';
  const envioRow = document.getElementById('envio-row');
  const subtotalEl = document.getElementById('cart-subtotal-checkout');
  const deliveryEl = document.getElementById('cart-delivery-checkout');
  const totalEl = document.getElementById('cart-total-checkout');
  const cartDeliveryElInline = document.getElementById('cart-delivery');

  const DELIVERY_FEE = 0; // mismo valor usado en refreshCartUI

  // Mostrar u ocultar campo de dirección
  addressLabel?.classList.toggle('hidden', method !== 'domicilio');
  const addressInput = checkoutForm.querySelector('[name="address"]');
  if (addressInput) addressInput.required = method === 'domicilio';

  // 🧾 Heredamos los valores que ya calcula refreshCartUI()
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  // 🚚 Si el método es domicilio, se suma el envío
  const delivery = method === 'domicilio' && subtotal > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + delivery;

  // Mostrar/ocultar fila de envío
  envioRow?.classList.toggle('hidden', method !== 'domicilio');

  // ✅ Actualizar DOM (heredado del refreshCartUI, con ajuste solo si hay envío)
  if (subtotalEl) subtotalEl.textContent = `$${numberWithCommas(subtotal)}`;
  if (deliveryEl) deliveryEl.textContent = `$${numberWithCommas(delivery)}`;
  if (cartDeliveryElInline) cartDeliveryElInline.textContent = `$${numberWithCommas(delivery)}`;
  if (totalEl) totalEl.textContent = `$${numberWithCommas(total)}`;
}


checkoutForm.addEventListener('change', () => {
  updateCheckoutTotals();
  updateCheckoutFieldStates();
});
checkoutForm.addEventListener('input', updateCheckoutFieldStates);






function hasBarrio(address) {
  const addressLower = String(address || '').toLowerCase();
  return addressLower.includes('barrio') ||
    addressLower.includes('barr.') ||
    addressLower.includes('br.');
}

function setCheckoutFieldState(fieldName, state) {
  const field = checkoutForm.querySelector(`.checkout-field[data-field="${fieldName}"]`);
  if (!field) return;
  field.classList.toggle('is-valid', state === 'valid');
  field.classList.toggle('is-invalid', state === 'invalid');
}

function updateCheckoutFieldStates() {
  if (!checkoutForm) return;

  const fd = new FormData(checkoutForm);
  const name = fd.get('name')?.trim() || '';
  const phone = fd.get('phone')?.trim() || '';
  const method = fd.get('method') || 'domicilio';
  const payment = fd.get('payment') || '';
  const address = fd.get('address')?.trim() || '';
  const phoneDigits = phone.replace(/\D/g, '');

  setCheckoutFieldState('name', name ? 'valid' : 'invalid');
  setCheckoutFieldState('phone', phoneDigits.length === 10 ? 'valid' : 'invalid');
  setCheckoutFieldState('address', method !== 'domicilio' || hasBarrio(address) ? 'valid' : 'invalid');
  setCheckoutFieldState('payment', payment ? 'valid' : 'invalid');

  const transferInfo = document.getElementById('transfer-info');
  if (transferInfo) transferInfo.classList.toggle('hidden', payment !== 'transferencia');
}

function showCheckoutAlert(title, text) {
  if (typeof Swal !== 'undefined') {
    Swal.fire({
      icon: 'warning',
      title,
      text,
      background: '#ffffff',
      color: '#000000',
      iconColor: '#e91e63',
      confirmButtonColor: '#e91e63'
    });
  } else {
    alert(`${title}\n${text}`);
  }
}

function focusCheckoutField(fieldName) {
  const field = checkoutForm.querySelector(`.checkout-field[data-field="${fieldName}"]`);
  const control = field?.querySelector('input, select, textarea');
  if (control) setTimeout(() => control.focus({ preventScroll: false }), 80);
}

function goToCheckoutStep(stepNumber) {
  if (!step1 || !step2) return;
  step1.classList.toggle('active', stepNumber === 1);
  step2.classList.toggle('active', stepNumber === 2);
}

function validateCheckoutForWhatsApp() {
  const fd = new FormData(checkoutForm);
  const clientName = fd.get('name')?.trim() || '';
  const clientPhone = fd.get('phone')?.trim() || '';
  const method = fd.get('method') || 'domicilio';
  const payment = fd.get('payment') || '';
  const address = fd.get('address')?.trim() || '';
  const phoneDigits = clientPhone.replace(/\D/g, '');

  updateCheckoutFieldStates();

  if (cart.length === 0) {
    return { ok: false, title: 'Carrito vacio', text: 'Debes agregar productos antes de confirmar el pedido.', step: 1 };
  }
  if (!clientName) {
    return { ok: false, title: 'Falta tu nombre', text: 'Escribe tu nombre para poder identificar el pedido.', field: 'name', step: 1 };
  }
  if (phoneDigits.length !== 10) {
    return { ok: false, title: 'Telefono invalido', text: 'Escribe un numero de telefono de 10 digitos. Puedes usar espacios o guiones si quieres.', field: 'phone', step: 1 };
  }
  if (method === 'domicilio' && !hasBarrio(address)) {
    return {
      ok: false,
      title: 'Debes indicar el barrio',
      text: 'Incluye la palabra Barrio en la direccion. Ejemplo: Calle 29 #55-80 Barrio Galan.',
      field: 'address',
      step: 2
    };
  }
  if (!payment) {
    return { ok: false, title: 'Selecciona el metodo de pago', text: 'Elige transferencia o efectivo antes de confirmar.', field: 'payment', step: 2 };
  }

  return { ok: true };
}

function clearCartAfterWhatsAppOpen() {
  cart = [];
  persistCart();
  refreshCartUI();
  localStorage.removeItem('tb_cart');
  resetClientForm();
}

function openWhatsAppWithFallback(primaryUrl, fallbackUrl, submitBtn) {
  let finished = false;

  const markFinished = () => {
    if (finished) return;
    finished = true;
    clearCartAfterWhatsAppOpen();
  };

  const restoreButton = () => {
    if (!submitBtn || finished) return;
    submitBtn.disabled = false;
    submitBtn.textContent = 'Confirmar pedido';
  };

  window.addEventListener('pagehide', markFinished, { once: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) markFinished();
  }, { once: true });

  try {
    window.location.assign(primaryUrl);
  } catch (err) {
    console.warn('No se pudo abrir WhatsApp con navegacion directa', err);
  }

  setTimeout(() => {
    if (document.hidden || finished) return;
    restoreButton();
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        icon: 'info',
        title: 'Abrir WhatsApp',
        text: 'Si WhatsApp no se abrio automaticamente, toca el boton para continuar con el pedido.',
        showCancelButton: true,
        confirmButtonText: 'Abrir WhatsApp',
        cancelButtonText: 'Seguir editando',
        background: '#ffffff',
        color: '#000000',
        confirmButtonColor: '#e91e63',
        cancelButtonColor: '#1ac892'
      }).then(result => {
        if (result.isConfirmed) {
          markFinished();
          window.location.href = fallbackUrl;
        }
      });
    } else if (confirm('Si WhatsApp no se abrio automaticamente, pulsa Aceptar para intentarlo de nuevo.')) {
      markFinished();
      window.location.href = fallbackUrl;
    }
  }, 1400);
}

checkoutForm.addEventListener('submit', (e) => {
  
  const submitBtn = checkoutForm.querySelector('button[type="submit"]');
  e.preventDefault();

  const status = readCachedAvailability();
  const cartIsStillAvailable = removeUnavailableCartItems(status, true);
  if (!cartIsStillAvailable) {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Confirmar pedido';
    }
    return;
  }

  const validation = validateCheckoutForWhatsApp();
  if (!validation.ok) {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Confirmar pedido';
    }
    if (validation.step) goToCheckoutStep(validation.step);
    showCheckoutAlert(validation.title, validation.text);
    if (validation.field) focusCheckoutField(validation.field);
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Abriendo WhatsApp...';
  }

  const fd = new FormData(checkoutForm);
  const clientName = fd.get('name')?.trim() || '';
  const clientPhone = fd.get('phone')?.trim() || '';
  const method = fd.get('method') || 'recoger';
  const payment = fd.get('payment') || '';
  const address = fd.get('address')?.trim() || '';
  const notes = fd.get('notes')?.trim() || '';

  let textParts = [];

  // Cabecera
  textParts.push('🧾 *Nuevo Pedido - Vikingos Indira Barrancabermeja✅*');
  textParts.push(`👤 Cliente: ${clientName}`);
  textParts.push(`📞 Teléfono: ${clientPhone}`);
  textParts.push(`🚚 Tipo: ${method}`);
  if (method === 'domicilio') textParts.push(`🏠 Dirección: ${address}`);
  textParts.push(`💳 Pago: ${payment}`);
  textParts.push('');
  textParts.push('🍨 *Detalle del pedido:*');

  let subtotal = 0;

  cart.forEach(item => {
    // Calcular precio de extras individualmente
    const extras = item.extras || [];
    const extrasLines = extras.map(e => `   ➕ ${e.qty}x ${e.name} ($${numberWithCommas(e.price * e.qty)})`).join('\n');

    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;

    // Mostrar solo precio del artículo base + extras detallados
    textParts.push(`${item.qty}x ${item.title} — *$${numberWithCommas(item.price * item.qty)}*`);
    if (extrasLines) textParts.push(extrasLines);

    // Si hay toppings removidos
    if (item.removed && item.removed.length) {
      textParts.push(`   ⚠️ Toppings removidos: ${item.removed.join(', ')}`);
    }
  });

  const delivery = method === 'domicilio' ? DELIVERY_FEE : 0;
  const total = subtotal + delivery;

  // Resumen de totales
  textParts.push('');
  textParts.push(`🧮 Subtotal: $${numberWithCommas(subtotal)}`);
  textParts.push(method === 'domicilio'
    ? `🚗 Envío: $${numberWithCommas(delivery)}`
    : '🏪 Envío: Sin costo (recoge en el local)');
  textParts.push(`💰 *Total: $${numberWithCommas(total)}*`);

  if (notes) textParts.push(`📝 Notas: ${notes}`);

  // Construir URL para WhatsApp
  const bp = String(BUSINESS_PHONE || '').replace(/\D/g, '');
  if (!bp || bp.length < 8) {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Confirmar pedido';
    }
    alert('Configura BUSINESS_PHONE en app.js con el número del negocio.');
    return;
  }

  const msg = encodeURIComponent(textParts.join('\n'));
  const waUrl = `https://api.whatsapp.com/send?phone=${bp}&text=${msg}`;
  const fallbackUrl = `https://wa.me/${bp}?text=${msg}`;

  openWhatsAppWithFallback(waUrl, fallbackUrl, submitBtn);
});





// ---------- Utilidades ----------
function bindEvents() {
  navBtns.forEach(b=> b.addEventListener('click', ()=> setActiveCategory(b.dataset.cat)));
  cartCountEl.addEventListener('dblclick', ()=> { if(confirm('Vaciar carrito?')){ cart = []; persistCart(); refreshCartUI(); } });
  checkoutModal.addEventListener('click', (e)=> { if(e.target === checkoutModal) checkoutModal.classList.add('hidden'); });
  searchInput.addEventListener('input', ()=> renderProducts(activeCategory));

  // ✅ Delegación para botones .add
  catalogEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.add');
    if (!btn) return;
    if (btn.disabled) return;
    const id = btn.dataset.id;
    if (!id) return;
    const product = products.find(p => p.id === id);
    const status = readCachedAvailability();
    if (!isProductAvailable(id, status)) {
      btn.disabled = true;
      btn.textContent = 'Agotado';
      btn.classList.add('agotado-btn');
      showSoldOutProductModal(product);
      removeUnavailableCartItems(status, true);
      return;
    }
    openProductModal(id);
  });
}


function capitalize(s){ return String(s || '').charAt(0).toUpperCase() + String(s || '').slice(1); }
function numberWithCommas(x){ return String(x).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
function escapeHtml(s){ return String(s || '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }



// ====== MENÚ LATERAL ======
const menuBtn = document.getElementById('menu-btn');
const sideMenu = document.getElementById('side-menu');
const closeMenu = document.getElementById('close-menu');

menuBtn.addEventListener('click', () => {
  // Primero activamos el menú
  sideMenu.classList.add('show');
  sideMenu.style.opacity = 0;
  sideMenu.style.transform = 'translateX(-20px)'; // empieza desplazado
  sideMenu.style.transition = 'opacity 0.14s ease, transform 0.14s ease';

  // Forzamos el repaint antes de animar
  requestAnimationFrame(() => {
    sideMenu.style.opacity = 1;
    sideMenu.style.transform = 'translateX(0)';
  });
  sideMenu.classList.remove('hidden');
});


closeMenu.addEventListener('click', () => {
  sideMenu.classList.remove('show');
  setTimeout(() => sideMenu.classList.add('hidden'), 140);
});

// Cerrar tocando fuera del panel
sideMenu.addEventListener('click', (e) => {
  if (e.target === sideMenu) {
    sideMenu.classList.remove('show');
    setTimeout(() => sideMenu.classList.add('hidden'), 140);
  }
});




// ====== FORMULARIO DE PAGO ======

document.addEventListener("DOMContentLoaded", () => { 
  // 🧾 Checkout, métodos de pago, domicilio...
  const paymentSelect = document.getElementById("payment-method");
  const transferInfo = document.getElementById("transfer-info");
  const methodRadios = document.querySelectorAll('input[name="method"]');
  const addressLabel = document.getElementById("address-label");
  const envioRow = document.getElementById("envio-row");
  const cartDelivery = document.getElementById("cart-delivery");
  const DELIVERY_FEE = 0;
  const accountNumber = document.getElementById("account-number");
  const copyBtn = document.getElementById("copy-account");

  // === Lógica del checkout ===
  methodRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      if (radio.value === "domicilio" && radio.checked) {
        addressLabel.classList.remove("hidden");
        envioRow.classList.remove("hidden");
        cartDelivery.textContent = `$${DELIVERY_FEE.toLocaleString()}`;
      } else {
        addressLabel.classList.add("hidden");
        envioRow.classList.add("hidden");
        cartDelivery.textContent = "$0";
      }
    });
  });

  paymentSelect?.addEventListener("change", () => {
    transferInfo.classList.toggle("hidden", paymentSelect.value !== "transferencia");
  });

  copyBtn?.addEventListener("click", () => {
    navigator.clipboard.writeText(accountNumber.textContent.trim())
      .then(() => {
        copyBtn.textContent = "¡Copiado!";
        copyBtn.classList.add("copied");
        setTimeout(() => {
          copyBtn.textContent = "Copiar";
          copyBtn.classList.remove("copied");
        }, 1800);
      })
      .catch(() => alert("No se pudo copiar"));
  });

  // === 🔁 SINCRONIZACIÓN DE DISPONIBILIDAD ===
  function syncProductStatus() {
    const status = JSON.parse(localStorage.getItem('productStatus')) || {};
    document.querySelectorAll('.product-card').forEach(card => {
      const id = card.dataset.id;
      const btn = card.querySelector('.btn-add');
      const label = card.querySelector('.status-label');

      if (status[id] === false) {
        card.classList.add('agotado');
        if (btn) {
          btn.disabled = true;
          btn.textContent = 'Agotado';
          btn.style.background = '#ccc';
          btn.style.color = '#666';
        }
        if (label) {
          label.textContent = 'Agotado';
          label.style.color = '#f44336';
        }
      } else {
        card.classList.remove('agotado');
        if (btn) {
          btn.disabled = false;
          btn.textContent = 'Añadir';
          btn.style.background = '';
          btn.style.color = '';
        }
        if (label) {
          label.textContent = 'Disponible';
          label.style.color = '#4CAF50';
        }
      }
    });
  }

  function syncExtrasStatus() {
    const status = JSON.parse(localStorage.getItem('productStatus')) || {};
    document.querySelectorAll('.extra-item').forEach(extra => {
      const id = extra.dataset.id;
      const checkbox = extra.querySelector('input[type="checkbox"]');
      const plusBtn = extra.querySelector('.plus');
      const minusBtn = extra.querySelector('.minus');

      if (status[id] === false) {
        extra.classList.add('agotado');
        if (checkbox) checkbox.disabled = true;
        if (plusBtn) plusBtn.disabled = true;
        if (minusBtn) minusBtn.disabled = true;
      } else {
        extra.classList.remove('agotado');
        if (checkbox) checkbox.disabled = false;
        if (plusBtn) plusBtn.disabled = false;
        if (minusBtn) minusBtn.disabled = false;
      }
    });
  }

  // Llamadas iniciales
  syncProductStatus();
  syncExtrasStatus();

  // En vivo (cada vez que el admin cambia algo)
  window.addEventListener('storage', e => {
    if (e.key === 'productStatus') {
      syncProductStatus();
      syncExtrasStatus();
    }
  });

  // Fallback cada 3 segundos
  setInterval(() => {
    syncProductStatus();
    syncExtrasStatus();
  }, 3000);
});



// --- FORM MULTIPASO (compatible con checkout actual) ---
const form = document.getElementById("checkout-form");
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const nextStep1 = document.getElementById("next-step1");
const backStep2 = document.getElementById("back-step2");
const clientSummary = document.getElementById("client-summary");

if (nextStep1) {
  nextStep1.addEventListener("click", () => {
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const phoneDigits = phone.replace(/\D/g, '');
    updateCheckoutFieldStates();

    if (!name || phoneDigits.length !== 10) {
      showCheckoutAlert("Datos incompletos", "Por favor completa tu nombre y un telefono de 10 digitos.");
      focusCheckoutField(!name ? 'name' : 'phone');
      return;
    }

    // Mostrar resumen
    clientSummary.innerHTML = `<strong>${name} </strong><span>${phone}</span>`;

    // Animación de transición
    step1.classList.remove("active");
    step2.classList.add("active");
  });
}

if (backStep2) {
  backStep2.addEventListener("click", () => {
    step2.classList.remove("active");
    step1.classList.add("active");
  });
}



const checkoutOverlay = document.getElementById("checkout-modal");
const btnConfirmOrder = document.getElementById("confirm-order"); // botón en el carrito
const btnBackToCart = document.getElementById("back-to-cart");

btnConfirmOrder?.addEventListener("click", () => {
  checkoutOverlay.classList.remove("hidden");
});

btnBackToCart?.addEventListener("click", () => {
  checkoutOverlay.classList.add("hidden");
});


// También cerrar si se toca fuera del panel
checkoutOverlay.addEventListener("click", (e) => {
  if (e.target === checkoutOverlay) {
    checkoutOverlay.classList.remove("show");
  }
});




// ============Descargar QR=================
document.addEventListener("click", (e) => {
  // Usa closest para soportar clicks sobre el SVG interno de FontAwesome
  const btn = e.target.closest && e.target.closest(".qr-download");
  if (!btn) return;

  const imgPath = btn.dataset.img;
  if (!imgPath) {
    console.warn("qr-download sin data-img");
    return;
  }

  // helper para descargar
  const downloadImage = (url) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = url.split("/").pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Si SweetAlert2 no está disponible, fallback a confirm nativo
  if (typeof Swal === "undefined") {
    console.warn("SweetAlert2 (Swal) no disponible. Usando confirm nativo.");
    const ok = confirm(
      "Puedes pagar escaneando nuestros códigos QR de Nequi o Bancolombia.\n\nTambién puedes descargar los QR. ¿Descargar ahora?"
    );
    if (ok) downloadImage(imgPath);
    return;
  }

  // SweetAlert2 disponible -> mostrar alerta antes de descargar
  Swal.fire({
    icon: "info",
    title: "Pago con QR",
    html: `
      Puedes pagar escaneando nuestros códigos QR de <strong>Nequi</strong> o <strong>Bancolombia</strong>.<br><br>
      También puedes <strong>descargar los QR</strong> dando clic en el icono de descarga.
    `,
    showCancelButton: true,
    confirmButtonText: "Descargar",
    cancelButtonText: "Cancelar",
    background: "#ffffff",       // fondo blanco
    color: "#000000",            // texto negro
    confirmButtonColor: "#e91e63", // botón rosado
    cancelButtonColor: "#2ecc71",  // botón verde
    iconColor: "#e91e63"         // icono rosado
}).then(result => {
    if (result.isConfirmed) downloadImage(imgPath);
});
});


function showCartHintToast() {
  // Evitar duplicados
  if (document.querySelector('.cart-hint-toast')) return;

  const cartHeader = document.querySelector('.cart-header');
  const cartTitle = cartHeader?.querySelector('h3');
  if (!cartHeader || !cartTitle) return;

  const toast = document.createElement('div');
  toast.className = 'cart-hint-toast';
  toast.textContent = 'Puedes cerrar y seguir agregando';
  cartTitle.insertAdjacentElement('afterend', toast);

  // Animación entrada
  requestAnimationFrame(() => toast.classList.add('show'));

  // Auto cerrar
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 120);
  }, 1800);
}



// ============Fin de codigo de Descarga QR=================













