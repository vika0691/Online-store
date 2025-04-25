const modelH = document.getElementById("model-h");
const modelS = document.getElementById("model-s");
const imgShowRoom = document.getElementById("img-showroom");
const colorW = document.getElementById("colour-w");
const colorB = document.getElementById("colour-b");
const printOverlay = document.getElementById('print-overlay');
const sizeButtons = document.querySelectorAll('.size-sr');
const addToCartButton = document.querySelector('.showr');

let selectedSize = '';
let obj = {
  model: null,
  color: 'W',
  print: null,
};


// Обработчик для выбора модели и цвета
handleClick(modelH, 'model');
handleClick(modelS, 'model');
handleClick(colorW, 'color');
handleClick(colorB, 'color');


// Обработчик для кнопок выбора размера
sizeButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Убираем выделение с других кнопок
    sizeButtons.forEach(btn => btn.classList.remove('selected'));

    // Добавляем выделение к нажатой кнопке
    button.classList.add('selected');
    selectedSize = button.getAttribute('data-size');
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

function addOverlay(src) {
  printOverlay.style.display = 'block'; // Показываем принт
  printOverlay.style.backgroundImage = `url(${src})`
  obj.print = src; // Сохраняем выбранный принт
}

function uploadImage(event) {
  const reader = new FileReader();

  const target = event.target
  const file = target.files;

  if (!file) {
    return;
  }

  const image = file[0]

  reader.readAsDataURL(image);
  reader.onload = (e) => {
    const { result } = e.target;

    if(result === null) return;
    addOverlay(result)
  }
}

// // Обработчик для кнопки "В корзину"
// addToCartButton.addEventListener('click', () => {
//   if (selectedSize && obj.model && obj.color) {
//     alert(`Товар добавлен в корзину:\nМодель: ${obj.model}\nЦвет: ${obj.color}\nРазмер: ${selectedSize}\nПринт: ${obj.print ? 'Выбран' : 'Не выбран'}`);
//   } else {
//     alert('Пожалуйста, выберите модель, цвет и размер.');
//   }
// });


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