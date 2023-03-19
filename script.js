let optionsList = document.querySelectorAll('.optionsList li');
let subOptionsList = document.querySelectorAll('.optionsList li .subOptions');
let range = document.querySelector('#range');


range.addEventListener('input', () => {
    document.querySelector('.option_size-value').textContent = `${range.value} x ${range.value}`;
})


optionsList.forEach((item) => {
    item.addEventListener('click', (e) => {
        if (e.target.parentElement.querySelector('.arrow').classList.contains('bx-rotate-180')) {
            hideSubOptions(e);
        } else {
            showSubOptions(e);
        }
    })
});

document.addEventListener('mouseover', (e) => {
    hideSubOptionsMouseOut(e);
});

document.querySelector('.bx-pencil').addEventListener('click', (e) => {
    e.target.classList.toggle('bx-spin');
})














function showSubOptions(e) {
    e.target.parentElement.querySelector('.arrow').classList.add('bx-rotate-180');
    e.target.parentElement.querySelector('.subOptions').classList.replace('display-none', 'display-grid');
    e.target.parentElement.querySelector('.subOptions').style.opacity = 1;
    e.target.parentElement.querySelector('.subOptions').style.pointerEvents = 'initial';
    e.target.parentElement.classList.toggle('visible');
}

function hideSubOptions(e) {
    e.target.parentElement.querySelector('.arrow').classList.remove('bx-rotate-180');
    e.target.parentElement.querySelector('.subOptions').classList.replace('display-grid', 'display-none');
    e.target.parentElement.querySelector('.subOptions').style.opacity = 0;
    e.target.parentElement.querySelector('.subOptions').style.pointerEvents = 'none';
    e.target.parentElement.classList.toggle('visible');
}

function hideSubOptionsMouseOut(e) {
    if ((e.target.tagName == 'BODY') || (e.target.className == 'optionsList')) {
        document.querySelectorAll('.visible').forEach((item) => {
            item.querySelector('.arrow').classList.remove('bx-rotate-180');
            item.querySelector('.subOptions').classList.replace('display-grid', 'display-none');
            item.querySelector('.subOptions').style.opacity = 0;
            item.querySelector('.subOptions').style.pointerEvents = 'none';
            item.classList.toggle('visible');
        })
    }
}
