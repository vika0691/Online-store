import { Storage, Product } from './cart.js';

const btn = document.getElementsByClassName("cat-card");

for (const el of Array.from(btn)) {
    el.addEventListener("click", (event: Event) => {
        const metaData = (el as HTMLElement).dataset.product?.replace(/\n/g, ''); // Используем регулярное выражение для удаления всех символов новой строки

        if (metaData !== undefined) {
            addProduct(metaData);
        } else {
            console.warn('el is undefined', (el as HTMLElement).dataset);
        }
    });
}

export function addProduct(product: string) {
    const { id, ...data } = JSON.parse(product) as Product;
    const resultGetItem = Storage.getItem(String(id));
    console.log(resultGetItem, product, id);

    if (resultGetItem !== undefined) {
        // Увеличиваем количество на 1
        Storage.updateItem(String(id), 1); // Передаем 1 для увеличения количества
        return;
    }

    // Если товара нет в корзине, добавляем его с количеством 1
    Storage.setItem({ id, ...data, count: 1 });
}