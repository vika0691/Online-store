const root = document.getElementById('root');

export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    count: number;
}

export class Storage {
    static getItem(productId: string): Product | undefined {
        const data = localStorage.getItem(productId);
        if (data === null) return;
        return JSON.parse(data) as Product;
    }

    static setItem(product: Product) {
        return localStorage.setItem(String(product.id), JSON.stringify(product));
    }

    static updateItem(id: string, countChange: number) {
        const pr = this.getItem(id) as Product;
        pr.count += countChange;

        if (pr.count <= 0) {
            this.removeItem(id);
        } else {
            localStorage.removeItem(id);
            Storage.setItem(pr);
        }
        return;
    }

    static removeItem(productId: string) {
        localStorage.removeItem(productId);
    }
}

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
                    <div class="text-desc">Размер: </div>
                    <div class="text-desc">Количество: <span class="product-count" data-id="${product.id}">${product.count}</span></div>
                    <div class="text-desc">Цена: ${product.price * product.count}</div>
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









// const root = document.getElementById('root');

// export interface Product {
//     id: number;
//     name: string;
//     price: number;
//     image: string;
//     count: number;
// }

// export class Storage {
//     static getItem(productId: string): Product | undefined {
//         const data = localStorage.getItem(productId);
//         if (data === null) return;
//         return JSON.parse(data) as Product;
//     }

//     static setItem(product: Product) {
//         return localStorage.setItem(String(product.id), JSON.stringify(product));
//     }

//     static updateItem(id: string, product: Product) {
//         const pr = this.getItem(id) as Product;
//         pr.count = pr.count + 1;
//         localStorage.removeItem(id);
//         Storage.setItem(pr);
//         return;
//     }

//     static removeItem(productId: string) {
//         localStorage.removeItem(productId);
//     }
// }

// function renderCart() {
//     if (!root) return; // Проверка на наличие элемента root
//     root.innerHTML = ''; // Очищаем контейнер перед рендерингом

//     for (let i = 0; i < localStorage.length; i++) {
//         const key = localStorage.key(i);
//         if (!key) break;
//         const data = Storage.getItem(key);
//         if (!data) continue;
//         const product = data as Product;

//         const productDiv = document.createElement('div');
//         productDiv.classList.add('cont-for-cart');
//         productDiv.innerHTML = `
//             <div class="img-cart">
//                 <img class="photo-cart" src="./ui/images/${product.image}" />
//             </div>
//             <div class="cont-for-desc-del">
//                 <div class="cont-for-text">
//                     <div class="text-desc">Название: ${product.name}</div>
//                     <div class="text-desc">Размер: </div>
//                     <div class="text-desc">Количество: ${product.count}</div>
//                     <div class="text-desc">Цена: ${product.price * product.count}</div>
//                 </div>
//                 <div class="delete-icon" data-id="${product.id}">X</div>
//             </div>
//         `;
//         root.appendChild(productDiv);
//     }
// }

// // Инициализация корзины
// renderCart();

// // Обработчик событий для удаления товара
// root?.addEventListener('click', (event) => {
//     const target = event.target as HTMLElement;
//     if (target.classList.contains('delete-icon')) {
//         const productId = target.getAttribute('data-id');
//         if (productId) {
//             Storage.removeItem(productId);
//             renderCart(); // Обновляем корзину после удаления
//         }
//     }
// });



// const root = document.getElementById('root')

// export interface Product {
//     id: number,
//     name: string,
//     price: number,
//     image: string,
//     count: number
// }

// export class Storage {
//     static getItem(productId: string): Product | undefined {
//         const data = localStorage.getItem(productId);

//         if(data === null) return;

//         return JSON.parse(data) as Product;
//     }

//     static setItem(product: Product) {
//         return localStorage.setItem(String(product.id), JSON.stringify(product))
//     }

//     static updateItem(id: string, product: Product) {
//         const pr = this.getItem(id) as Product;
//         pr.count = pr.count + 1

//         localStorage.removeItem(id);
//         Storage.setItem(pr)
//         return 
//     }
// }

// // console.log(localStorage.length)
// for (let i = 0; i < localStorage.length; i++) {
//     const key = localStorage.key(i);

//     if(!key) break;
//     const data = Storage.getItem(key);
    
//     if(!data) continue;
//     const product = data as Product

//     console.log(product)
//     root?.insertAdjacentHTML('afterend', `
//        <div class="cont-for-cart">
//             <div class="img-cart">
//                 <img class="photo-cart" src="./ui/images/${product.image}" />
//             </div>

//             <div class="cont-for-desc-del">
//                 <div class="cont-for-text">
//                     <div class="text-desc">Название: ${product.name}</div>
//                     <div class="text-desc">Размер: </div>
//                     <div class="text-desc">Количество: ${product.count}</div>
//                     <div class="text-desc">Цена: ${product.price * product.count}</div>
//                 </div>

//                 <div class="delete-icon">X</div>
//             </div>
                
//         </div>
//     `);

//     // root?.insertAdjacentHTML('afterend', `<li>Цена: ${product.price}</li>`);
// }
