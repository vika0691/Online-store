const modelH = document.getElementById("model-h");
const modelS = document.getElementById("model-s");
const imgShowRoom = document.getElementById("img-showroom");
const colourW = document.getElementById("colour-w");
const colourB = document.getElementById("colour-b");
const obj = {};

const currentModel = null; //  Переменная,чтобы хранить текущую выбранную модель (Hoodie или Short)
const currentColour = null; // Переменная,чтобы хранить текущий выбранный цвет (White или Black)

modelH.addEventListener("click", (event) => {
  currentModel = "Hoodie";
  updateImage();
  setActive(modelH);
});

modelS.addEventListener("click", (event) => {
  currentModel = "Short";
  updateImage();
  setActive(modelS);
});

colourW.addEventListener("click", (event) => {
  currentColour = "White";
  updateImage();
  setActive(colourW);
});

colourB.addEventListener("click", (event) => {
  currentColour = "Black";
  updateImage();
  setActive(colourB);
});

//Заменяем фотки,с учетом выбранных парю
function updateImage() {
  const imageSrc = "";

  if (currentModel === "Hoodie" && currentColour === "White") {
    imageSrc = "./ui/images/Hoodie-white-showroom.png";
  } else if (currentModel === "Hoodie" && currentColour === "Black") {
    imageSrc = "./ui/images/Hoodie-bl-showroom.png";
  } else if (currentModel === "Short" && currentColour === "White") {
    imageSrc = "./ui/images/Short-white-showroom.png";
  } else if (currentModel === "Short" && currentColour === "Black") {
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