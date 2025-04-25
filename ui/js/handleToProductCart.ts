// import { Storage, Product } from './cart.js';

// const btn = document.getElementsByClassName("cat-card");

// for (const el of Array.from(btn)) {
//     // Тут ты получаешь событие. Событие - это event. Смотри на строчку ниже
//     el.addEventListener("click", (event: Event) => {
//         console.log(event.target)
//         const metaData = (el as HTMLElement).dataset.product?.replace(/\n/g, ''); // Используем регулярное выражение для удаления всех символов новой строки
//         const inputs = document.getElementsByTagName('input') as HTMLCollectionOf<HTMLInputElement>

//         if (metaData !== undefined) {
//             const size = getSize(inputs)
//             addProductToCart(metaData, size);
//         } else {
//             console.warn('el is undefined', (el as HTMLElement).dataset);
//         }
//     });
// }

// /**
//  * 1. Получить события с кнопки.
//  * 1.2. Получить родителя кнопки.
//  * 1.3. Получить соседний элемент
//  * 1.4. С помощью `.getElementsByTagName('input')` достать все инпуты в нем.
//  * 1.5. Тебе нужен event.target - для получения элемента на которым произошел клик
//  */

// // document - заменить на пункт 2.1 - 2.4. Класс cont-size не использовать, иначе работать будет не корректно

// function getSize(inputs: HTMLCollectionOf<HTMLInputElement>): string {
//     return Array.from(inputs)
//         .map((input) => input.checked === true && input.value)
//         .filter((value) => !!value)[0] as string
// }

// function addProductToCart(product: string, size: string) {
//     const { id: rawId, ...data } = JSON.parse(product) as Product;
//     const checkIdToCard = Storage.getItem(String(rawId));

//     if (checkIdToCard !== undefined) {
//         // Увеличиваем количество на 1
//         const { id } = checkIdToCard
//         Storage.updateItem(String(id), 1); // Передаем 1 для увеличения количества
//         return;
//     }

//     // Если товара нет в корзине, добавляем его с количеством 1
//     Storage.setItem({ id: rawId, ...data, count: 1, size });
// }

import { Storage, Product } from './cart.js';

const btn = document.getElementsByClassName("cat-card");

for (const el of Array.from(btn)) {
    el.addEventListener("click", (event: Event) => {
        //Получаем событие с кнопки
        const target = event.target as HTMLElement;

        // Получаем родителя кнопки
        const parent = target.parentNode as HTMLElement;

        // Получаем соседний элемент, который содержит размеры
        const sizeSibling = parent.previousElementSibling?.querySelector('.size') as HTMLElement;

        // Получаем данные о продукте
        const metaData = (target as HTMLElement).dataset.product?.replace(/\n/g, '');

        // Получаем все инпуты внутри контейнера размеров
        const inputs = sizeSibling.getElementsByTagName('input') as HTMLCollectionOf<HTMLInputElement>;

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
    const checkIdToCard = Storage.getItem(String(rawId));

    if (checkIdToCard !== undefined) {
        // Увеличиваем количество на 1
        const { id } = checkIdToCard;
        Storage.updateItem(String(id), 1); // Передаем 1 для увеличения количества
        return;
    }

    // Если товара нет в корзине, добавляем его с количеством 1
    Storage.setItem({ id: rawId, ...data, count: 1, size });
}