const root = document.getElementById('root');

export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    count: number;
    size: string; // Добавляем поле для размера
}

export class Storage {
    static getItem(productId: string): Product | undefined {
        const data = localStorage.getItem(productId);
        if (data === null) return;
        return JSON.parse(data) as Product;
    }

    static setItem(product: Product) {
        return localStorage.setItem(String(product.id) + product.size, JSON.stringify(product));
    }

    static updateItem(id: string, countChange: number) {
        const pr = this.getItem(id) as Product;

        if (pr) {
            pr.count += countChange;
            this.setItem(pr);
        }

        return;
    }

    static removeItem(productId: string) {
        localStorage.removeItem(productId);
    }
}

// Функция для рендеринга корзины
function renderCart() {
    if (!root) return; // Проверка на наличие элемента root
    root.innerHTML = ''; // Очищаем контейнер перед рендерингом

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key) break;
        const data = Storage.getItem(key);
        if (!data) continue;
        const product = data as Product;

        const productDiv = document.createElement('div');
        productDiv.classList.add('cont-for-cart');
        productDiv.innerHTML = `
            <div class="img-cart">
                <img class="photo-cart" src="./ui/images/${product.image}" />
            </div>
            <div class="cont-for-desc-del">
                <div class="cont-for-text">
                    <div class="text-desc">Название: ${product.name}</div>
                    <div class="text-desc">Размер: ${product.size || 'Не выбран'}</div>
                    <div class="text-desc">Количество: <span class="product-count" data-id="${product.id}">${product.count}</span></div>
                    <div class="text-desc">Цена: <span class="product-price" data-id="${product.id}">${(product.price * product.count).toFixed(2)} ₽</span></div>
                </div>
                <div class="quantity-controls">
                    <button class="decrease" data-id="${product.id}">-</button>
                    <button class="increase" data-id="${product.id}">+</button>
                </div>
                <div class="delete-icon" data-id="${product.id}">X</div>
            </div>
        `;
        root.appendChild(productDiv);
    }
}

// Инициализация корзины
renderCart();

// Обработчик событий для удаления товара и изменения количества
root?.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;

    if (target.classList.contains('delete-icon')) {
        const productId = target.getAttribute('data-id');
        if (productId) {
            Storage.removeItem(productId);
            renderCart(); // Обновляем корзину после удаления
        }
    } else if (target.classList.contains('increase')) {
        const productId = target.getAttribute('data-id');
        if (productId) {
            Storage.updateItem(productId, 1); // Увеличиваем количество на 1
            renderCart(); // Обновляем корзину после изменения
        }
    } else if (target.classList.contains('decrease')) {
        const productId = target.getAttribute('data-id');
        if (productId) {
            Storage.updateItem(productId, -1); // Уменьшаем количество на 1
            renderCart(); // Обновляем корзину после изменения
        }
    }
});

// Функция для обновления отображения цены
function updatePrice(productId: string) {
    const product = Storage.getItem(productId);
    if (product) {
        const priceElement = document.querySelector(`.product-price[data-id="${productId}"]`) as HTMLElement;
        const countElement = document.querySelector(`.product-count[data-id="${productId}"]`) as HTMLElement;

        if (priceElement && countElement) {
            const totalPrice = product.price * product.count;
            priceElement.textContent = `${totalPrice.toFixed(2)} ₽`;
            countElement.textContent = `${product.count}`; // Обновляем отображение количества
        }
    }
}

// Обновляем цену при изменении количества
root?.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;

    if (target.classList.contains('increase') || target.classList.contains('decrease')) {
        const productId = target.getAttribute('data-id');
        if (productId) {
            updatePrice(productId); // Обновляем цену после изменения количества
        }
    }
});

// Инициализация корзины при загрузке страницы
renderCart();