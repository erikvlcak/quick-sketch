let optionsList = document.querySelectorAll('.optionsList li');
let range = document.querySelector('#range');
let canvas = document.querySelector('#canvas');
let pixel = document.querySelectorAll('.pixel');
let pickColor = document.querySelector('.optionsList .option_color .subOptionPickColor');

pickColor.addEventListener('mouseenter', (e) => {
    e.target.querySelector('.colors').classList.toggle('sub-displayed');
})

pickColor.addEventListener('mouseleave', (e) => {
    e.target.querySelector('.colors').classList.toggle('sub-displayed');
})






//change canvas size according to slider and create canvasSize property
range.addEventListener('input', (e) => {
    document.querySelector('.option_size-value').textContent = `${e.target.value} x ${e.target.value}`;
    canvasSize = e.target.value;
})


//generate Canvas with set mesh density
range.addEventListener('click', (e) => {
    while (canvas.hasChildNodes()) {
        canvas.removeChild(canvas.lastChild);
    };
    canvas.style.gridTemplateColumns = 'repeat(' + canvasSize + ', minmax(auto, 1fr))';
    for (let i = 0; i < (canvasSize * canvasSize); i++) {
        let pixel = document.createElement('div');
        pixel.classList.add('pixel');
        canvas.appendChild(pixel);
    }
})

//display or hide subOptions after click on optionList item
optionsList.forEach((item) => {
    item.addEventListener('click', (e) => {

        if ((e.target.classList.contains('icon')) || (e.target.classList.contains('text')) || (e.target.classList.contains('arrow'))) {
            console.log('klikol si na option');
            if (e.target.parentElement.querySelector('.subOptions').classList.contains('sub-hidden')) {
                e.target.parentElement.querySelector('.subOptions').classList.replace('sub-hidden', 'sub-displayed');
                e.target.parentElement.querySelector('.arrow').classList.add('bx-rotate-180');
            } else {
                e.target.parentElement.querySelector('.subOptions').classList.replace('sub-displayed', 'sub-hidden');
                e.target.parentElement.querySelector('.arrow').classList.remove('bx-rotate-180');
            }
        } else if (((e.target.tagName == 'LI') || (e.target.tagName == 'INPUT')) && (e.target.className != 'subOptionPickColor')) {
            e.target.parentElement.parentElement.querySelector('.subOptions').classList.replace('sub-displayed', 'sub-hidden');
            e.target.parentElement.parentElement.querySelector('.arrow').classList.remove('bx-rotate-180');
        }
    })
});

//hide subOptions after mouse moves away
document.addEventListener('mouseover', (e) => {
    if ((e.target.id == 'content') || (e.target.id == 'canvas') || (e.target.className == 'pixel') || (e.target.className == 'optionsList')) {
        document.querySelectorAll('.sub-displayed').forEach((item) => {
            item.classList.replace('sub-displayed', 'sub-hidden');
            item.parentElement.querySelector('.arrow').classList.remove('bx-rotate-180');
        })
    }
});

//pencil spin
document.querySelector('.bx-pencil').addEventListener('click', (e) => {
    e.target.classList.toggle('bx-spin');
});

//mouseover painting

// canvas.addEventListener('mouseover', (e) => {
//     if (e.target.className == 'pixel') {
//         e.target.style.backgroundColor = 'black';
//     }
// })

//click and drag painting
let mouseDrag = false;
canvas.addEventListener('mousedown', () => {
    mouseDrag = true;
})

canvas.addEventListener('mouseup', () => {
    mouseDrag = false;
})

canvas.addEventListener('mousemove', (e) => {
    if (mouseDrag) {
        if (e.target.className == 'pixel') {
            e.target.style.backgroundColor = 'black';
        }
    }
})

