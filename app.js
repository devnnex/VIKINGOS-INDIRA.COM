// app.js — lógica completa para The Boss (con imágenes locales)

// ---------- Config ----------
const BUSINESS_PHONE = '573116468485'; // <- reemplaza por el número real (sin '+')
const DELIVERY_FEE = 0; // tarifa por defecto de domicilio

// ---------- Datos de ejemplo ----------
const products = [
  // ===== TAMAÑOS =====
  { id: 'vik-coco', category: 'Vikingos', title: 'Vikingo de Coco', price: 4500, desc: 'Refrescante vikingo artesanal con sabor a coco natural.', image: 'images/vik-coco.png' },
  { id: 'vik-maracumango', category: 'Vikingos', title: 'Vikingo Maracumango', price: 4500, desc: 'Exótica mezcla de maracuyá y mango, perfecta para el calor.', image: 'images/vik-maracumango.png' },
  { id: 'vik-arequipe', category: 'Vikingos', title: 'Vikingo de Arequipe', price: 4500, desc: 'Delicioso vikingo con dulce sabor a arequipe cremoso.', image: 'images/vik-arequipe.png' },
  { id: 'vik-choconutella', category: 'Vikingos', title: 'Vikingo Choconutella', price: 4500, desc: 'Cremoso vikingo de chocolate y Nutella.', image: 'images/vik-choconutella.png' },
  { id: 'vik-curuba', category: 'Vikingos', title: 'Vikingo de Curuba', price: 4500, desc: 'Sabor tropical de curuba, suave y refrescante.', image: 'images/vik-curuba.png' },
  { id: 'vik-guanabana', category: 'Vikingos', title: 'Vikingo de Guanábana', price: 4500, desc: 'Cremoso vikingo de guanábana natural.', image: 'images/vik-guanabana.png' },
  { id: 'vik-mora', category: 'Vikingos', title: 'Vikingo de Mora', price: 4500, desc: 'Vikingo de mora con sabor intenso y natural.', image: 'images/vik-mora.png' },
  { id: 'vik-ronpasas', category: 'Vikingos', title: 'Vikingo Ron con Pasas', price: 4500, desc: 'Tradicional sabor ron con pasas, cremoso y dulce.', image: 'images/vik-ronpasas.png' },
  { id: 'vik-mantecado', category: 'Vikingos', title: 'Vikingo de Mantecado', price: 4500, desc: 'Clásico sabor mantecado, suave y tradicional.', image: 'images/vik-mantecado.png' },
  { id: 'vik-fresasfrutos', category: 'Vikingos', title: 'Vikingo Fresas con Frutos Rojos', price: 4500, desc: 'Combinación de fresas y frutos rojos refrescantes.', image: 'images/vik-fresasfrutos.png' },
  { id: 'vik-quesobocadillo', category: 'Vikingos', title: 'Vikingo Queso con Bocadillo', price: 4500, desc: 'Sabor colombiano clásico: queso con bocadillo.', image: 'images/vik-quesobocadillo.png' },
  { id: 'vik-cafe', category: 'Vikingos', title: 'Vikingo de Café', price: 4500, desc: 'Energizante vikingo de café frío y cremoso.', image: 'images/vik-cafe.png' },
  { id: 'vik-oreo', category: 'Vikingos', title: 'Vikingo de Oreo', price: 4500, desc: 'Cremoso vikingo con trozos de galleta Oreo.', image: 'images/vik-oreo.png' },
  { id: 'vik-pina', category: 'Vikingos', title: 'Vikingo de Piña', price: 4500, desc: 'Refrescante sabor tropical de piña natural.', image: 'images/vik-pina.png' },
  { id: 'vik-galleta', category: 'Vikingos', title: 'Vikingo de Galleta', price: 4500, desc: 'Dulce sabor a galleta con textura cremosa.', image: 'images/vik-galleta.png' },
  { id: 'vik-kola', category: 'Vikingos', title: 'Vikingo Kola con Leche', price: 4500, desc: 'Clásico sabor colombiano de kola con leche.', image: 'images/vik-kola.png' },
  { id: 'vik-milo', category: 'Vikingos', title: 'Vikingo de Milo', price: 4500, desc: 'Cremoso vikingo de Milo con sabor a malta y chocolate.', image: 'images/vik-milo.png' },
  { id: 'vik-vainillachips', category: 'Vikingos', title: 'Vikingo Vainilla Chips', price: 4500, desc: 'Delicado sabor a vainilla con chips de chocolate.', image: 'images/vik-vainillachips.png' },
  { id: 'vik-mani', category: 'Vikingos', title: 'Vikingo de Maní', price: 4500, desc: 'Vikingo cremoso con auténtico sabor a maní.', image: 'images/vik-mani.png' },
  { id: 'vik-chicle', category: 'Vikingos', title: 'Vikingo de Chicle', price: 4500, desc: 'Divertido vikingo con sabor a chicle dulce.', image: 'images/vik-chicle.png' },
  { id: 'vik-lulo', category: 'Vikingos', title: 'Vikingo de Lulo', price: 4500, desc: 'Delicioso vikingo de Lulo Natural.', image: 'images/vik-lulo.png' },
  { id: 'vik-salpicon', category: 'Vikingos', title: 'Vikingo de Salpicón', price: 4500, desc: 'Delicioso vikingo de Salpicón Natural.', image: 'images/vik-salpicon.png' },
  { id: 'vik-nucita', category: 'Vikingos', title: 'Vikingo de Nucita', price: 4500, desc: 'Delicioso vikingo de Nucita.', image: 'images/vik-nucita.png' },
  //AGUAS
  { id: 'Agua1', category: 'Aguas', title: 'Bolsa de agua', price: 500, desc: 'Bolsa de agua pura y refrescante.', image: 'images/aguaBolsa.png' }
];

const categories = [...new Set(products.map(p=>p.category))];

// ---------- Estado ----------
let cart = JSON.parse(localStorage.getItem('tb_cart') || '[]');
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

// ---------- Init ----------
function init(){
  renderCategories();
  setActiveCategory(activeCategory);
  bindEvents();
  refreshCartUI();
  renderProducts(activeCategory);
  applyAvailabilityToRendered(); // ✅ justo después del render
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
  renderProducts(cat);
}

function switchCategory(cat){
  const ct = catalogEl;
  ct.classList.remove('fade-in');
  ct.classList.add('fade-out');
  setTimeout(()=>{
    setActiveCategory(cat);
    ct.classList.remove('fade-out');
    ct.classList.add('fade-in');
  }, 180);
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
    return;
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
  applyAvailabilityToRendered();
}


// ====== 🔄 SINCRONIZACIÓN DE DISPONIBILIDAD CON GOOGLE SHEETS ======

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwoiB5wjuWak8Z0CeHenYc93M7UR7K43dPOCRGQ8RmrZjb8CAFywjqC0wGuOWBSI-GZhw/exec'; 
// 👆 el mismo que usas en el admin

async function fetchAvailability() {
  try {
    const res = await fetch(SCRIPT_URL + '?t=' + Date.now()); 
    // 👆 se agrega un timestamp para evitar que el navegador cachee la respuesta

    // Verificar que la respuesta sea correcta
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    // Convertir la data del sheet en un objeto { id: boolean }
    const status = {};
    data.forEach(item => {
      // Aseguramos compatibilidad: TRUE/FALSE, true/false, "TRUE"/"FALSE"
      status[item.id] = item.disponible === true || item.disponible === 'TRUE';
    });

    // Leer el estado anterior del localStorage
    const prevStatus = JSON.parse(localStorage.getItem('productStatus')) || {};

    // Comparar para no refrescar la UI sin necesidad
    if (JSON.stringify(prevStatus) !== JSON.stringify(status)) {
      localStorage.setItem('productStatus', JSON.stringify(status));

      // 🔥 Reaplica visualmente la disponibilidad actualizada
      if (typeof applyAvailabilityToRendered === 'function') {
        applyAvailabilityToRendered();
      }

      console.log('🔁 Estado actualizado desde Google Sheets');
    }

  } catch (err) {
    console.error('❌ Error al obtener disponibilidad:', err);
  }
}

// Ejecutar al cargar la página
fetchAvailability();

// Y volver a consultar cada 5 segundos
setInterval(fetchAvailability, 500);




// lee estados guardados y aplica cambios solo al botón del producto correspondiente
async function applyAvailabilityToRendered(productId = null) {
  // intentar leer desde Google Sheets primero
  let status = {};
  try {
    const res = await fetch(SCRIPT_URL + '?t=' + Date.now());
    const data = await res.json(); // array [{id, disponible}, ...] o similar
    data.forEach(item => {
      // robusto: acepta true/false o "TRUE"/"FALSE"
      status[item.id] = String(item.disponible).toLowerCase() === 'true' || item.disponible === true;
    });
    // actualizar cache local para fallback
    localStorage.setItem('productStatus', JSON.stringify(status));
  } catch (err) {
    // si falla la red, usar localStorage como fallback
    status = JSON.parse(localStorage.getItem('productStatus')) || {};
    console.warn('fetchAvailability fallback to localStorage', err);
  }

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
}, 150);
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
function updateCartBadge() {
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  cartCountEl.textContent = count;
}

// Renderizar los ítems del carrito
// ---------- Carrito ----------
// ---------- refreshCartUI CORREGIDA PARA REFLEJAR CAMBIOS ----------
function refreshCartUI() {
  cartItemsEl.innerHTML = '';
  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<div class="empty">Tu carrito está vacío 🍦</div>';
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
        <button class="remove-btn" title="Eliminar producto">🗑️</button>
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
      if (!e.target.classList.contains('minus') && !e.target.classList.contains('plus') && !e.target.classList.contains('remove-btn')) {
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
openCartBtn.addEventListener('click', ()=>{ cartDrawer.classList.remove('hidden'); cartDrawer.setAttribute('aria-hidden','false'); });
closeCartBtn.addEventListener('click', ()=>{ cartDrawer.classList.add('hidden'); cartDrawer.setAttribute('aria-hidden','true'); });
checkoutBtn.addEventListener('click', ()=>{ cartDrawer.classList.add('hidden'); openCheckout(); });
clearCartBtn.addEventListener('click', ()=>{ if(confirm('Vaciar carrito?')){ cart = []; persistCart(); refreshCartUI(); } });

// ---------- Checkout ----------

// ---------- Checkout ----------
function openCheckout() {
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
  document.getElementById('address-label').classList.add('hidden');
  document.getElementById('envio-row').classList.add('hidden');

  // 🔹 Mostrar modal
  checkoutModal.classList.remove('hidden');
  checkoutModal.setAttribute('aria-hidden', 'false');

  // 🔹 Recalcular al cambiar método (recoger/domicilio)
  const radios = checkoutForm.querySelectorAll('input[name="method"]');
  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      const method = checkoutForm.querySelector('input[name="method"]:checked')?.value || 'recoger';
      const addressLabel = document.getElementById('address-label');
      const envioRow = document.getElementById('envio-row');
      const deliveryEl = document.getElementById('cart-delivery');
      const totalCheckoutEl = document.getElementById('cart-total-checkout');

      const DELIVERY_FEE = 0;
      const delivery = (method === 'domicilio' && subtotal > 0) ? DELIVERY_FEE : 0;
      const totalUpdated = subtotal + delivery;

      // Mostrar/ocultar campos
      addressLabel.classList.toggle('hidden', method !== 'domicilio');
      envioRow.classList.toggle('hidden', method !== 'domicilio');

      // Actualizar montos
      deliveryEl.textContent = `$${numberWithCommas(delivery)}`;
      totalCheckoutEl.textContent = `$${numberWithCommas(totalUpdated)}`;
    });
  });
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

  const DELIVERY_FEE = 0; // mismo valor usado en refreshCartUI

  // Mostrar u ocultar campo de dirección
  addressLabel.classList.toggle('hidden', method !== 'domicilio');

  // 🧾 Heredamos los valores que ya calcula refreshCartUI()
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  // 🚚 Si el método es domicilio, se suma el envío
  const delivery = method === 'domicilio' && subtotal > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + delivery;

  // Mostrar/ocultar fila de envío
  envioRow.classList.toggle('hidden', method !== 'domicilio');

  // ✅ Actualizar DOM (heredado del refreshCartUI, con ajuste solo si hay envío)
  subtotalEl.textContent = document.getElementById('cart-subtotal').textContent;
  deliveryEl.textContent = document.getElementById('cart-delivery').textContent;
  totalEl.textContent = method === 'domicilio'
    ? `$${numberWithCommas(total)}`
    : document.getElementById('cart-total-checkout').textContent;
}


checkoutForm.addEventListener('change', updateCheckoutTotals);






// Envío por WhatsApp
checkoutForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const fd = new FormData(checkoutForm);
  const clientName = fd.get('name')?.trim() || '';
  const clientPhone = fd.get('phone')?.trim() || '';
  const method = fd.get('method') || 'recoger';
  const payment = fd.get('payment') || '';
  const address = fd.get('address')?.trim() || '';
  const notes = fd.get('notes')?.trim() || '';

  let textParts = [];

  // Cabecera
  textParts.push('🧾 *Nuevo Pedido - Vikingos Indira✅*');
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
    const extrasSum = extras.reduce((sum, e) => sum + e.price * e.qty, 0);

    const itemTotal = (item.price + extrasSum) * item.qty;
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
    alert('Configura BUSINESS_PHONE en app.js con el número del negocio.');
    return;
  }

  const msg = encodeURIComponent(textParts.join('\n'));
  const waUrl = `https://wa.me/${bp}?text=${msg}`;

  window.open(waUrl, '_blank');
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
  sideMenu.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

  // Forzamos el repaint antes de animar
  requestAnimationFrame(() => {
    sideMenu.style.opacity = 1;
    sideMenu.style.transform = 'translateX(0)';
  });
  sideMenu.classList.remove('hidden');
});


closeMenu.addEventListener('click', () => {
  sideMenu.classList.remove('show');
  setTimeout(() => sideMenu.classList.add('hidden'), 350);
});

// Cerrar tocando fuera del panel
sideMenu.addEventListener('click', (e) => {
  if (e.target === sideMenu) {
    sideMenu.classList.remove('show');
    setTimeout(() => sideMenu.classList.add('hidden'), 350);
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

  paymentSelect.addEventListener("change", () => {
    transferInfo.classList.toggle("hidden", paymentSelect.value !== "transferencia");
  });

  copyBtn.addEventListener("click", () => {
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

    if (!name || !phone) {
      alert("Por favor completa tu nombre y teléfono.");
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



// ============Fin de codigo de Descarga QR=================


