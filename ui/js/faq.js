const themeToggle = document.getElementById('theme-toggle');

document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        question.parentNode.classList.toggle('active');
    });
});