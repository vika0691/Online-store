const checkBox = document.getElementById('checkbox');
const sendEmail = document.getElementById('sendEmail');
const emailInput = document.querySelector('.form-email');
const errorMessage = document.getElementById('error-message');
sendEmail.addEventListener('click', () => {
    // Сбрасываем предыдущее сообщение об ошибке
    errorMessage.style.display = 'none';

    // Проверяем валидность email и состояние чекбокса
    if (!emailInput.checkValidity()) {
        errorMessage.textContent = "Пожалуйста, введите корректный E-mail.";
        errorMessage.style.display = 'block';
        return;
    }

    if (!checkBox.checked) {
        errorMessage.textContent = "Галочка обязательно!";
        errorMessage.style.display = 'block';
        return;

    }

    // Если все проверки пройдены, выполняем целевое действие
    alert('Вы подписаны на рассылку с E-mail: ' + emailInput.value);
});

// const checkBox = document.getElementById('checkbox');
// const sendEmail = document.getElementById('sendEmail');

// let checked = checkBox.checked;

// checkBox.addEventListener('change', () => {
//     checked = checkBox.checked
// })

// sendEmail.addEventListener('click', () => {
//     if (checked) {
//         // Целевое действие
//         alert('Вы подписаны');
//         return
//     }

//     alert("Галочка обязательно!")
// })
