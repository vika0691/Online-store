const buttons = document.querySelectorAll('.t-filter');
const cards = document.querySelectorAll('.container-for-cat');


buttons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');

        // Скрываем все карточки
        cards.forEach(card => {
            const description = card.querySelector('.descrip-card').textContent;
            if (description === category) {
                card.style.display = 'block'; // Показываем карточки выбранной категории
            } else {
                card.style.display = 'none'; // Скрываем остальные
            }
        });
    });
});