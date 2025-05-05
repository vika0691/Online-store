import type { Product } from "./cart";

export function resolveImage(color: Product["color"], model: Product["model"]) {;
    return `./ui/images/${model === "H" ? "Hoodie" : "Short"}-${color === "W" ? "white" : "black"}-showroom.png`;
}