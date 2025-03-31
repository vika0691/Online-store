import { Storage, Product } from './cart.js'
const btn = document.getElementsByClassName("cat-card")

for (const el of Array.from(btn)) {
   el.addEventListener("click", (event: Event) => {
    const metaData = (el as HTMLElement).dataset.product?.replace('\n', '');

    if(metaData !== undefined) {
        addProduct(metaData)
    } else {
        console.warn('el is undefined', (el as HTMLElement).dataset)
    }
   })
}

export function addProduct(product: string) {
    const { id, ...data } = JSON.parse(product) as Product
    const resultGetItem = Storage.getItem(String(id))
    console.log(resultGetItem, product, id)

    if(resultGetItem !== undefined) {
        Storage.updateItem(String(id), { id, ...data })
        return;
    }

    Storage.setItem({ id, ...data, count: 1 });
}