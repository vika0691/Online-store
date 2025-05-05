import { Storage, Product } from "./cart.js";

const modelH = document.getElementById("model-h");
const modelS = document.getElementById("model-s");
const imgShowRoom = document.getElementById("img-showroom");
const colorW = document.getElementById("colour-w");
const colorB = document.getElementById("colour-b");
const printOverlay = document.getElementById('print-overlay') as HTMLElement;
const sizeButtons = document.querySelectorAll('.size-sr');
const addToCartButton = document.getElementById('addToCartShr');

let selectedSize = '';
let obj: Product = {
  id: 0,
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
    selectedSize = button.getAttribute('data-size');
    obj.size = selectedSize;
  });
});


// Обработчик для кнопок выбора принта

const printButtons = document.querySelectorAll('.choose-print');

printButtons.forEach(button => {
  button.addEventListener('click', () => {
    const printUrl = button.getAttribute('data-print');
    addOverlay(`./ui/images/${printUrl}.png`);
  });
});

const inputUpload = document.getElementsByClassName("showr-pr")[0]
inputUpload.addEventListener("change", (event) => {
  uploadImage(event)
})

function addOverlay(src: string | ArrayBuffer) {
  printOverlay.style.display = 'block'; // Показываем принт
  printOverlay.style.backgroundImage = `url(${src})`
  obj.print = src; // Сохраняем выбранный принт
}

function uploadImage(event: File) {
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
    addOverlay(result);
    obj.print = result
  }
}


/**

  * **handleClick** - универсальная функция для обработки кликов

  * @param {HTMLInputElement} element 

  * @param {string} key 

*/

function handleClick(element, key) {
  element.addEventListener("click", () => {
    const data = JSON.parse(element.value);
    obj[key] = data[key];
    updateImage(obj);
  });
}

function updateImage({ color, model }) {
  if (!model || !color) return;
  imgShowRoom.src = `./ui/images/${model === "H" ? "Hoodie" : "Short"}-${color === "W" ? "white" : "black"}-showroom.png`;
}

addToCartButton?.addEventListener("click", () => {
  const { id, ...data } = obj;
  Storage.setItem({ 
    "id": `showroom-${id + obj.color + obj.model}`,
    ...data,
   })
})