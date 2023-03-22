let optionsList = document.querySelectorAll('.optionsList li');
let range = document.querySelector('#range');
let canvas = document.querySelector('#canvas');
let pixel = document.querySelectorAll('.pixel');
let pickColor = document.querySelector('.optionsList .option_color .subOptionPickColor');
let colors = document.querySelector('.colors');
let paintingColorList = document.querySelector('.option_color')
let chosenColor = 'black';
let rainbowColor = null;
let canvasSize;

//shows pre-defined selection of colors upon hovering over sub-option
pickColor.addEventListener('mouseenter', (e) => {
    e.target.querySelector('.colors').classList.toggle('sub-displayed');
})
pickColor.addEventListener('mouseleave', (e) => {
    e.target.querySelector('.colors').classList.toggle('sub-displayed');
})



//allows you to pick color from pre-defined selection


canvas.addEventListener('mousemove', (e) => {
    if (mouseDrag) {
        if (e.target.className == 'pixel') {
            e.target.style.backgroundColor = chosenColor;
        }
    }
});

paintingColorList.addEventListener('click', (e) => {
    let randomColor = null;
    colors.querySelectorAll('div').forEach((item) => {
        if (e.target.className == item.className) {
            chosenColor = e.target.className;
            canvas.style.borderColor = chosenColor;
        }

        if (e.target.className == 'subOptionRandomColor') {
            randomColor = 'rgb(' + ((Math.random() * (255 - 0 + 1)) + 0) + ',' + ((Math.random() * (255 - 0 + 1)) + 0) + ',' + ((Math.random() * (255 - 0 + 1)) + 0) + ')';
            chosenColor = randomColor;
            canvas.style.borderColor = randomColor;
            console.log(`${randomColor}+'random color`);
            console.log(`${chosenColor}+'random color`);

        } else if (e.target.className == 'subOptionRainbow') {
            canvas.addEventListener('mousemove', (e) => {
                if (mouseDrag) {
                    if (e.target.className == 'pixel') {
                        rainbowColor = 'rgb(' + ((Math.random() * (255 - 0 + 1)) + 0) + ',' + ((Math.random() * (255 - 0 + 1)) + 0) + ',' + ((Math.random() * (255 - 0 + 1)) + 0) + ')';
                        e.target.style.backgroundColor = rainbowColor;
                        canvas.style.borderColor = rainbowColor;
                        console.log(randomColor);
                        // uncomment for true epilepsy mode
                        // document.querySelector('body').style.backgroundColor = randomColor;
                    }
                }
            }
            )

        } else {
            canvas.addEventListener('mousemove', (e) => {
                if (mouseDrag) {
                    if (e.target.className == 'pixel') {
                        e.target.style.backgroundColor = chosenColor;
                        randomColor = chosenColor;
                        canvas.style.borderColor = chosenColor;
                    }
                }
            }
            )
        }
    })
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
    if ((e.target.id == 'content') || (e.target.id == 'canvas') || (e.target.className == 'pixel') || (e.target.className == 'optionsList') || (e.target.className == 'canvasInitialMessage')) {
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



