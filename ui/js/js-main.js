const modelH = document.getElementById("model-h");
const modelS = document.getElementById("model-s");
const imgShowRoom = document.getElementById("img-showroom");
const colorW = document.getElementById("colour-w");
const colorB = document.getElementById("colour-b");
const obj = {
  model: null,
  color: 'W',
};

handleClick(modelH, 'model')
handleClick(modelS, 'model')
handleClick(colorW, 'color')
handleClick(colorB, 'color')

/**
 * **handleClick** - можно изменить и сделать ее чуть более универсальный.
 * За счет выноса из нее updateImage и передачи, как аргумента, тогда можно будет передавать любые параметры
 * И с любыми данными и любому нашему требованию оно будет работать.
 * А еще можно callback функцию написать
 * 
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
