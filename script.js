let arrow = document.querySelectorAll('.arrow');
arrow.forEach((item) => {
    item.addEventListener('click', (e) => {
        e.target.classList.toggle('bx-rotate-180');
        e.target.nextElementSibling.classList.replace('invisible', 'visible');
    })
})