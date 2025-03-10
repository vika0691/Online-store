const modelH = document.getElementById("model-h");
const modelS = document.getElementById("model-s");
const imgShowRoom = document.getElementById("img-showroom");
const colourW = document.getElementById("colour-w");
const colourB = document.getElementById("colour-b");
const obj = {};

let currentModel = null; //  Сохраняем текущую выбранную модель (H или S)
let currentColour = null; // Сохраняем текущий выбранный цвет (W или B)

modelH.addEventListener("click", (event) => {
  currentModel = "H";
  updateImage();
  setActive(modelH);
});

modelS.addEventListener("click", (event) => {
  currentModel = "S";
  updateImage();
  setActive(modelS);
});

colourW.addEventListener("click", (event) => {
  currentColour = "W";
  updateImage();
  setActive(colourW);
});

colourB.addEventListener("click", (event) => {
  currentColour = "B";
  updateImage();
  setActive(colourB);
});

function updateImage() {
  let imageSrc = "";

  if (currentModel === "H" && currentColour === "W") {
    imageSrc = "./ui/images/Hoodie-white-showroom.png";
  } else if (currentModel === "H" && currentColour === "B") {
    imageSrc = "./ui/images/Hoodie-bl-showroom.png";
  } else if (currentModel === "S" && currentColour === "W") {
    imageSrc = "./ui/images/Short-white-showroom.png";
  } else if (currentModel === "S" && currentColour === "B") {
    imageSrc = "./ui/images/Short-black-showroom.png";
  }

  imgShowRoom.src = imageSrc;
}

function setActive(element) {
  // Убираем класс active у всех элементов
  modelH.classList.remove("active");
  modelS.classList.remove("active");
  colourW.classList.remove("active");
  colourB.classList.remove("active");

  // Добавляем класс active только выбранному элементу
  element.classList.add("active");
}
