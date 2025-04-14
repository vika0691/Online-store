// Получаем модальное окно
var modal = document.getElementById("myModal");

// Получаем кнопку "В корзину"
var addToCartButtons = document.querySelectorAll('.cat-card');

// Обработчик события для каждой кнопки "В корзину"
addToCartButtons.forEach(function(button) {

    button.addEventListener('click', function() {
        modal.style.display = "block"; // Показываем модальное окно
    });
});

// Получаем элемент <span>, который закрывает модальное окно
var span = document.getElementsByClassName("close")[0];

// Когда пользователь нажимает на <span> (x), закрываем модальное окно
span.onclick = function() {
    modal.style.display = "none";
}

// Когда пользователь нажимает в любом месте вне модального окна, закрываем его
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}