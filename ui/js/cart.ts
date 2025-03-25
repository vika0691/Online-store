interface Product {
    id: number,
    name: string,
    price: string
}

export function addProduct(product: string) {
    const dataProduct = JSON.parse(product) as Product
    storage(dataProduct)
}

function storage(product: Product) {
    localStorage.setItem(String(product.id), JSON.stringify(product))
}