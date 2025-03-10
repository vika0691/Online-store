const modelH = document.getElementById("model-h");
const modelS = document.getElementById("model-s");
const imgShowRoom = document.getElementById("img-showroom");
const obj = {}

const choosenModel =

//При клике на кнопку толстовка, заменяем фотку
modelH.addEventListener("click", (event) => {
    main("./ui/images/Hoodie-white-showroom.png", event.target)
    console.log(event)
})

//При клике на кнопку футболка, заменяем фотку
modelS.addEventListener("click", (event) => {
    main("./ui/images/Short-white-showroom.png", event.target)
})

//Проверка выбран ли параметр, если "да" - active, "нет" - удаляем "active"
function main(src, target) {
    imgShowRoom.src = src
    const checkActive = target.classList.contains("active")
    if(!checkActive) {
        onToogleActive()
    }
}

function onToogleActive() {
    modelH.classList.toggle("active")
    modelS.classList.toggle("active")
}

function checkActive() {

}