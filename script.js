Swatchy();

let optionsList = document.querySelectorAll('.optionsList li');
let subOptionsList = document.querySelectorAll('.optionsList li .subOptions');
let range = document.querySelector('#range');
let canvas = document.querySelector('#canvas');
let pixel = document.querySelectorAll('.pixel');
let colorSubOptions = document.querySelector('.optionsList .option_color .subOptions');

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
        if ((e.target.tagName == 'INPUT') || (e.target.tagName == 'LI')) {
            if (e.target.parentElement.parentElement.querySelector('.arrow').classList.contains('bx-rotate-180')) {
                hideSubOptionsClickListItem(e);
            } else {
                showSubOptionsClickListItem(e);
            }
        }
        else if (e.target.tagName != 'INPUT') {
            if (e.target.parentElement.querySelector('.arrow').classList.contains('bx-rotate-180')) {
                hideSubOptionsClickList(e);
            } else {
                showSubOptionsClickList(e);
            }
        }
    })
});

//hide subOptions after mouse moves away
document.addEventListener('mouseover', (e) => {
    hideSubOptionsMouseOut(e);
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

colorSubOptions.addEventListener('click', (e) => {
    console.log(e.target);
    if (e.target.className == 'subOptionPickColor') {
        canvas.querySelector('input').classList.toggle('display-none');
    }
})





function showSubOptionsClickList(e) {
    e.target.parentElement.querySelector('.arrow').classList.add('bx-rotate-180');
    e.target.parentElement.querySelector('.subOptions').classList.replace('display-none', 'display-grid');
    e.target.parentElement.querySelector('.subOptions').style.opacity = 1;
    e.target.parentElement.querySelector('.subOptions').style.pointerEvents = 'initial';
    e.target.parentElement.classList.toggle('visible');
}

function hideSubOptionsClickList(e) {
    e.target.parentElement.querySelector('.arrow').classList.remove('bx-rotate-180');
    e.target.parentElement.querySelector('.subOptions').classList.replace('display-grid', 'display-none');
    e.target.parentElement.querySelector('.subOptions').style.opacity = 0;
    e.target.parentElement.querySelector('.subOptions').style.pointerEvents = 'none';
    e.target.parentElement.classList.toggle('visible');
}

function showSubOptionsClickListItem(e) {
    e.target.parentElement.parentElement.querySelector('.arrow').classList.add('bx-rotate-180');
    e.target.parentElement.parentElement.querySelector('.subOptions').classList.replace('display-none', 'display-grid');
    e.target.parentElement.parentElement.querySelector('.subOptions').style.opacity = 1;
    e.target.parentElement.parentElement.querySelector('.subOptions').style.pointerEvents = 'initial';
    e.target.parentElement.parentElement.classList.toggle('visible');
}

function hideSubOptionsClickListItem(e) {
    e.target.parentElement.parentElement.querySelector('.arrow').classList.remove('bx-rotate-180');
    e.target.parentElement.parentElement.querySelector('.subOptions').classList.replace('display-grid', 'display-none');
    e.target.parentElement.parentElement.querySelector('.subOptions').style.opacity = 0;
    e.target.parentElement.parentElement.querySelector('.subOptions').style.pointerEvents = 'none';
    e.target.parentElement.parentElement.classList.toggle('visible');
}

function hideSubOptionsMouseOut(e) {
    if ((e.target.id == 'content') || (e.target.id == 'canvas') || (e.target.className == 'optionsList')) {
        document.querySelectorAll('.visible').forEach((item) => {
            item.querySelector('.arrow').classList.remove('bx-rotate-180');
            item.querySelector('.subOptions').classList.replace('display-grid', 'display-none');
            item.querySelector('.subOptions').style.opacity = 0;
            item.querySelector('.subOptions').style.pointerEvents = 'none';
            item.classList.toggle('visible');
        })
    }
}
