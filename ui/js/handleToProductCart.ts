import { addProduct } from './cart.js'
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