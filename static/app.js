const STORAGE_KEYS = {
  CART: 'avensio_cart',
  USER: 'avensio_user'
};

const FALLBACK_PRODUCTS = [
  { id: 'demo-phone', title: 'MVP Smartphone', price: 49990, description: '8/128 GB, NFC, 5G' },
  { id: 'demo-earbuds', title: 'Wireless Earbuds', price: 7490, description: 'ANC, Bluetooth 5.3' },
  { id: 'demo-watch', title: 'Smart Watch', price: 18900, description: 'AMOLED, GPS, eSIM' }
];

function loadCart() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.CART) || '[]');
}

function saveCart(cart) {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
}

function addToCart(product) {
  const cart = loadCart();
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart(cart);
}

function cartTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

async function loadProducts() {
  try {
    const response = await fetch('/api/products');
    if (!response.ok) throw new Error('API unavailable');
    const data = await response.json();
    if (!Array.isArray(data) || !data.length) return FALLBACK_PRODUCTS;
    return data.map((product) => ({
      id: product.id,
      title: product.title,
      price: Number(product.price),
      description: product.description || 'Описание отсутствует'
    }));
  } catch (_e) {
    return FALLBACK_PRODUCTS;
  }
}

async function initCatalogPage() {
  const list = document.querySelector('#catalog-list');
  if (!list) return;

  const products = await loadProducts();
  list.innerHTML = '';

  products.forEach((product) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <h3>${product.title}</h3>
      <p>${product.description}</p>
      <div class="price">${product.price.toLocaleString('ru-RU')} ₽</div>
      <button class="btn" data-product-id="${product.id}">Добавить в корзину</button>
    `;
    list.appendChild(card);

    card.querySelector('button').addEventListener('click', () => {
      addToCart(product);
      alert(`Товар «${product.title}» добавлен в корзину`);
    });
  });
}

function initCartPage() {
  const list = document.querySelector('#cart-list');
  const totalNode = document.querySelector('#cart-total');
  if (!list || !totalNode) return;

  const cart = loadCart();
  list.innerHTML = '';

  if (!cart.length) {
    list.innerHTML = '<p>Корзина пуста. Добавьте товары из каталога.</p>';
    totalNode.textContent = '0 ₽';
    return;
  }

  cart.forEach((item) => {
    const row = document.createElement('div');
    row.className = 'cart-row';
    row.innerHTML = `
      <span>${item.title}</span>
      <span>${item.quantity} × ${item.price.toLocaleString('ru-RU')} ₽</span>
    `;
    list.appendChild(row);
  });

  totalNode.textContent = `${cartTotal(cart).toLocaleString('ru-RU')} ₽`;
}

function initRegisterPage() {
  const form = document.querySelector('#register-form');
  const status = document.querySelector('#register-status');
  if (!form || !status) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const email = String(formData.get('email') || '').trim();
    const password = String(formData.get('password') || '').trim();

    if (!email || !password) {
      status.textContent = 'Введите email и пароль';
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: 'BUYER' })
      });

      if (!response.ok) throw new Error('Ошибка регистрации');

      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify({ email }));
      status.textContent = 'Регистрация успешна. Теперь можно перейти в каталог.';
      form.reset();
    } catch (_e) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify({ email }));
      status.textContent = 'Сервер недоступен. Пользователь сохранён локально для демо-режима.';
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  initCatalogPage();
  initCartPage();
  initRegisterPage();
});
