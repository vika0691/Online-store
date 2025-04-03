// document.getElementById('sendEmail').addEventListener('click', function() {
//     const emailInput = document.querySelector('.form-email');
//     const checkbox = document.getElementById('checkbox');
//     const errorMessage = document.getElementById('error-message');

//     // Сбрасываем предыдущее сообщение об ошибке

//     errorMessage.style.display = 'none';

//     // Проверяем валидность email и состояние чекбокса
//     if (!emailInput.checkValidity() || !checkbox.checked) {
//         errorMessage.style.display = 'block'; // Показываем сообщение об ошибке
//         return; // Прерываем выполнение функции
//     }

//     // Если все проверки пройдены, можно выполнить нужное действие
//     alert('Email успешно отправлен: ' + emailInput.value);
// });