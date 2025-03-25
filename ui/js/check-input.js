const checkBox = document.getElementById('checkbox');
const sendEmail = document.getElementById('sendEmail');

let checked = checkBox.checked;

checkBox.addEventListener('change', () => {
    checked = checkBox.checked
})

sendEmail.addEventListener('click', () => {
    if (checked) {
        // Целевое действие
        alert('Вы подписаны');
        return
    }

    alert("Галочка обязательно!")
})
