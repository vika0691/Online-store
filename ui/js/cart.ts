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
        Storage.setItem(pr)
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
       <div class="cont-for-cart">
            <div class="img-cart">
                <img class="photo-cart" src="./ui/images/${product.image}" />
            </div>

            <div class="cont-for-desc-del">
                <div class="cont-for-text">
                    <div class="text-desc">Название: ${product.name}</div>
                    <div class="text-desc">Размер: </div>
                    <div class="text-desc">Количество: ${product.count}</div>
                    <div class="text-desc">Цена: ${product.price * product.count}</div>
                </div>

                <div class="delete-icon">X</div>
            </div>
                
        </div>
    `);

    // root?.insertAdjacentHTML('afterend', `<li>Цена: ${product.price}</li>`);
}
