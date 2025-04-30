import { Storage, Product } from './cart.js';

const btn = document.getElementsByClassName("cat-card");

for (const el of Array.from(btn)) {
    el.addEventListener("click", (event: Event) => {
        //Получаем событие с кнопки
        const target = event.target as HTMLElement;

        // Получаем родителя кнопки
        const parent = target.parentNode as HTMLElement;

        // Получаем соседний элемент, который содержит размеры
        const sizeSibling = parent.previousElementSibling as HTMLElement;

        // Получаем данные о продукте
        const metaData = (target as HTMLElement).dataset.product?.replace(/\n/g, '');

        // Получаем все инпуты внутри контейнера размеров
        const inputs = sizeSibling.getElementsByTagName('input') as HTMLCollectionOf<HTMLInputElement>;

        console.log(inputs)
        if (metaData !== undefined) {
            const size = getSize(inputs);
            addProductToCart(metaData, size);
        } else {
            console.warn('el is undefined', (target as HTMLElement).dataset);
        }
    });
}

function getSize(inputs: HTMLCollectionOf<HTMLInputElement>): string {
    return Array.from(inputs)
        .map((input) => input.checked === true && input.value)
        .filter((value) => !!value)[0] as string;
}

function addProductToCart(product: string, size: string) {
    const { id: rawId, ...data } = JSON.parse(product) as Product;
    const idToCard = Storage.getItem(String(rawId) + size);

    console.log(idToCard, size, rawId)

    if (idToCard !== undefined && idToCard?.size == size ) {
        // Увеличиваем количество на 1
        const { id } = idToCard
        Storage.updateItem(String(id) + size, 1); // Передаем 1 для увеличения количества
        return;
    }

    // Если товара нет в корзине, добавляем его с количеством 1
    Storage.setItem({ id: rawId, ...data, count: 1, size });
}