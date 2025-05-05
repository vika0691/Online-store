import { Storage, Product } from "./cart.js";
import { resolveImage } from "./utils.js";

const modelH = document.getElementById("model-h") as HTMLInputElement;
const modelS = document.getElementById("model-s") as HTMLInputElement;
const imgShowRoom = document.getElementById("img-showroom") as HTMLImageElement;
const colorW = document.getElementById("colour-w") as HTMLInputElement;
const colorB = document.getElementById("colour-b") as HTMLInputElement;
const printOverlay = document.getElementById('print-overlay') as HTMLImageElement;
const sizeButtons = document.querySelectorAll('.size-sr');
const addToCartButton = document.getElementById('addToCartShr');

let selectedSize = '';
let obj: Product = {
  id: "0",
  model: "H",
  color: 'W',
  count: 1,
  size: "XS",
  price: 2500,
  name: "showroom"
};


// Обработчик для выбора модели и цвета
handleClick(modelH, 'model');
handleClick(modelS, 'model');
handleClick(colorW, 'color');
handleClick(colorB, 'color');


// Обработчик для кнопок выбора размера
sizeButtons.forEach(button => {
  button.addEventListener('click', () => {
    selectedSize = button.getAttribute('data-size')!;
    obj.size = selectedSize;
  });
});


// Обработчик для кнопок выбора принта

const printButtons = document.querySelectorAll('.choose-print');

printButtons.forEach(button => {
  button.addEventListener('click', () => {
    const printUrl = button.getAttribute('data-print');
    addOverlay(printOverlay, `./ui/images/${printUrl}.png`);
  });
});

const inputUpload = document.getElementsByClassName("showr-pr")[0]
inputUpload.addEventListener("change", (event) => {
  uploadImage(event)
})

function addOverlay(img: HTMLImageElement, src: string | ArrayBuffer) {
  img.style.display = 'block'; // Показываем принт
  img.style.backgroundImage = `url(${src})`
}

function uploadImage(event: Event) {
  const reader = new FileReader();

  const target = event.target
  const file = target.files;

  if (!file) {
    return;
  }

  const image = file[0]
  obj.name = `showroom ${image.name.replace(/\.(png|jpg|jpeg)/g, '')}`;

  reader.readAsDataURL(image);
  reader.onload = (e) => {
    const { result } = e.target as FileReader;

    if(result === null) return;

    addOverlay(printOverlay, result);
    obj.print = result
  }
}


/**

  * **handleClick** - универсальная функция для обработки кликов

  * @param {HTMLInputElement} element 

  * @param {string} key 

*/

function handleClick(element: HTMLInputElement, key: string) {
  element.addEventListener("click", () => {
    const data = JSON.parse(element.value);
    obj[key] = data[key];
    updateImage(obj);
  });
}

function updateImage({ color, model }: Product) {
  if (!model || !color) return;
  imgShowRoom.src = resolveImage(color, model)
}

addToCartButton?.addEventListener("click", () => {
  const { id, ...data } = obj;
  Storage.setItem({ 
    "id": `showroom-${id + obj.color + obj.model}`,
    ...data,
   })
})