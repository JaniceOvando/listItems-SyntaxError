// Initialize a new ItemsController with currentId set to 0
const itemsController = new ItemsController(0);

const STORAGE_KEY = 'items_mensajeria_v1';

// ── 10 productos de muestra ───────────────────────────────────
const defaultItems = [
    { name: 'Paquetes Generales', 
        img: 'https://api.iconify.design/mdi:package-variant.svg?color=%2316a34a&width=120',
        description: 'Envío estándar de paquetes pequeños y medianos.' },

    { name: 'Empaquetado Especial',
        img: 'https://api.iconify.design/mdi:package-variant-closed.svg?color=%2316a34a&width=120',
        description: 'Servicio de empaquetado seguro con materiales de protección.' },

    { name: 'Papelería y Documentación',
        img: 'https://api.iconify.design/mdi:file-document.svg?color=%2316a34a&width=120',
        description: 'Envío seguro de documentos, contratos y papelería sensible.' },

    { name: 'Paquete con Efectivo',
        img: 'https://api.iconify.design/mdi:cash.svg?color=%2316a34a&width=120',
        description: 'Envío con seguro especial para efectivo y valores.' },

    { name: 'Caja de Cartón por Medida',
        img: 'https://api.iconify.design/mdi:box.svg?color=%2316a34a&width=120',
        description: 'Fabricación de caja de cartón a la medida exacta de tu carga.' },

    { name: 'Plástico Simple',
        img: 'https://api.iconify.design/mdi:water.svg?color=%2316a34a&width=120',
        description: 'Protección básica con plástico simple para humedad y golpes leves.' },

    { name: 'Plástico Reforzado',
        img: 'https://api.iconify.design/mdi:shield-check.svg?color=%2316a34a&width=120',
        description: 'Envoltura en plástico grueso reforzado para mayor resistencia.' },

    { name: 'Paquete de Paso',
        img: 'https://api.iconify.design/mdi:lightning-bolt.svg?color=%2316a34a&width=120',
        description: 'Envío prioritario de paso rápido sin detenciones intermedias.' },

    { name: 'Paquete de Madera',
        img: 'https://api.iconify.design/mdi:hammer.svg?color=%2316a34a&width=120',
        description: 'Embalaje en madera para carga pesada o frágil.' },

    { name: 'Cristalería',
        img: 'https://api.iconify.design/mdi:glass-fragile.svg?color=%2316a34a&width=120',
        description: 'Manejo especial y embalaje reforzado para cristales y objetos frágiles.' },

    { name: 'Delicados',
        img: 'https://api.iconify.design/mdi:glass-fragile.svg?color=%2316a34a&width=120',
        description: 'Manejo especial y embalaje reforzado para cristales y objetos frágiles.' }
];

// ── localStorage helpers ──────────────────────────────────────
function loadItems() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            console.log('Cargando items desde localStorage...');
            return JSON.parse(stored);
        }
    } catch (e) {
        console.warn('Error leyendo localStorage:', e);
    }
    // Primera vez: guarda los 10 por defecto
    console.log('Guardando items por defecto en localStorage...');
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultItems));
    return defaultItems;
}

function saveItems(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function deleteItem(index) {
    const items = loadItems();
    items.splice(index, 1);
    saveItems(items);
    renderItems(items);
}

// ── Función para agregar una card ─────────────────────────────
function addItemCard(item, index) {
    const fallback = "this.onerror=null;this.style.padding='2rem';this.alt='Sin imagen'";

    const itemHTML =
        '<div class="col-sm-6 col-lg-4 col-xl-3 mb-4" id="card-' + index + '">' +
        '  <div class="card h-100 shadow-sm">' +
        '    <img src="' + item.img + '" class="card-img-top" alt="' + item.name + '" ' +
        '         style="height:160px;object-fit:contain;padding:1rem;background:#f0f4f0" ' +
        '         onerror="' + fallback + '">' +
        '    <div class="card-body d-flex flex-column">' +
        '      <h5 class="card-title">' + item.name + '</h5>' +
        '      <p class="card-text flex-grow-1">' + item.description + '</p>' +
        '      <div class="d-flex justify-content-between align-items-center mt-2">' +
        '        <a href="#" class="btn btn-primary btn-sm">Add</a>' +
        '        <button class="btn btn-danger btn-sm" onclick="deleteItem(' + index + ')">' +
        '          🗑' +
        '        </button>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>';

    document.getElementById('list-items').innerHTML += itemHTML;
}

// ── Renderizar todos los items ────────────────────────────────
function renderItems(items) {
    document.getElementById('list-items').innerHTML = '';
    items.forEach((item, index) => addItemCard(item, index));
    console.log(items.length + ' items renderizados.');
}

// ── Arranque ──────────────────────────────────────────────────
const items = loadItems();
renderItems(items);

// ── Form: agregar nuevo item ──────────────────────────────────
const newItemForm = document.querySelector('#newItemForm');

newItemForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const newItemNameInput   = document.querySelector('#newItemNameInput');
    const newItemDescription = document.querySelector('#newItemDescription');

    // Validación
    if (!newItemNameInput.value.trim() || !newItemDescription.value.trim()) {
        alert('Por favor completa el nombre y la descripción.');
        return;
    }

    // Get the values of the inputs
    const name        = newItemNameInput.value.trim();
    const description = newItemDescription.value.trim();
    const createdAt   = new Date();

    // Add to ItemsController
    itemsController.addItem(name, description, createdAt);

    // Nuevo item con imagen por defecto
    const newItem = {
        name: name,
        img: 'https://api.iconify.design/mdi:package-variant.svg?color=%2316a34a&width=120',
        description: description
    };

    // Guardar en localStorage y re-renderizar
    const current = loadItems();
    current.push(newItem);
    saveItems(current);
    renderItems(current);

    // Limpiar form
    newItemNameInput.value   = '';
    newItemDescription.value = '';
});