const root = document.getElementById('root')

export interface Product {
    id: number,
    name: string,
    price: number,
    image: string,
    count: number
}

export class Storage {
    static getItem(productId: string): Product | undefined {
        const data = localStorage.getItem(productId);

        if(data === null) return;

        return JSON.parse(data) as Product;
    }

    static setItem(product: Product) {
        return localStorage.setItem(String(product.id), JSON.stringify(product))
    }

    static updateItem(id: string, product: Product) {
        const pr = this.getItem(id) as Product;
        pr.count = pr.count + 1

        localStorage.removeItem(id);
        return 
    }
}

// console.log(localStorage.length)
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if(!key) break;
    const data = Storage.getItem(key);
    
    if(!data) continue;
    const product = data as Product

    console.log(product)
    root?.insertAdjacentHTML('afterend', `
       <div class="test-js">
                <img src="${product.image}" />
                <h3>
                    ${product.name}
                </h3>
                <span>
                    <b style="color: 'red'">Цена:</b> ${product.price * product.count}
                </span>
                <h3>Количество ${product.count}
            </div>
    `);

    root?.insertAdjacentHTML('afterend', `<li>Цена: ${product.price}</li>`);
}
