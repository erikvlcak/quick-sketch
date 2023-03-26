let optionsList = document.querySelectorAll('.optionsList li');
let range = document.querySelector('#range');
let canvas = document.querySelector('#canvas');
let pixel = document.querySelectorAll('.pixel');
let pickColor = document.querySelector('.optionsList .option_color .subOptionPickColor');
let colors = document.querySelector('.colors');
let paintingColorList = document.querySelector('.option_color')
let shading = document.querySelector('.option_shading .subOptions');
let deleting = document.querySelector('.option_delete .subOptions');
let eraser = document.querySelector('.subOptionEraser');
let chosenColor = 'hsl(0, 0%, 0%)';
let colorOption = null;
let shadingOption = null;
let canvasSize, colorLightness, erasing;
let chosenColorValue1, chosenColorValue2, chosenColorValue3;

//show color palette on hover
pickColor.addEventListener('mouseenter', (e) => {
    e.target.querySelector('.colors').classList.toggle('sub-displayed');
})
pickColor.addEventListener('mouseleave', (e) => {
    e.target.querySelector('.colors').classList.toggle('sub-displayed');
})

//coloring modes
paintingColorList.addEventListener('click', (e) => {

    if (colorOption != 'rainbow') {
        document.querySelectorAll('.option_shading').forEach((item) => {
            item.style.opacity = '1';
            item.style.pointerEvents = 'auto';
        })
    };
    if (e.target.className == 'subOptionRandomColor') {
        colorOption = 'random';
        chosenColor = generateRandomColor();
        canvas.style.borderImage = 'none';
        canvas.style.borderColor = chosenColor;
        console.log(chosenColor);

    } else if (e.target.className == 'subOptionRainbow') {
        colorOption = 'rainbow';
        canvas.style.borderImage = 'repeating-linear-gradient(45deg,#c4e17f 0 50px,#f7fdca 0 100px,#fad071 0 150px,#f0766b 0 200px,#db9dbe 0 250px,#c49cdf 0 300px,#6599e2 0 350px,#61c2e4 0 400px) 10 ';
        document.querySelectorAll('.option_shading').forEach((item) => {
            item.style.opacity = '0.5';
            item.style.pointerEvents = 'none';
        })
    } else {
        colorOption = 'pick';
        colors.querySelectorAll('div').forEach((item) => {
            if (e.target.className == item.className) {
                chosenColor = e.target.id;
                canvas.style.borderImage = 'none';
                canvas.style.borderColor = chosenColor;
            }
        })
    }
    colorLightness = getColorLightness(chosenColor);

})

//painting + shading + deleting
let mouseDrag = false;
canvas.addEventListener('mousedown', () => {
    mouseDrag = true;
})
canvas.addEventListener('mouseup', () => {
    mouseDrag = false;
})

canvas.addEventListener('mouseover', (e) => {
    if (erasing) {
        if ((mouseDrag) && (e.target.className == 'pixel')) {
            e.target.removeAttribute('style');
        }
    }
    else if (colorOption === null || colorOption == 'pick' || colorOption == 'random') {
        if ((mouseDrag) && (e.target.className == 'pixel')) {
            if (shadingOption == 'darker') {
                colorLightness -= 0.05;
                chosenColor = 'hsl(' + chosenColorValue1 + ', ' + chosenColorValue2 + '%, ' + colorLightness + '%)';
                console.log(chosenColor);
            } else if (shadingOption == 'lighter') {
                colorLightness += 0.05;
                chosenColor = 'hsl(' + chosenColorValue1 + ', ' + chosenColorValue2 + '%, ' + colorLightness + '%)';
                console.log(chosenColor);
            }
            e.target.style.backgroundColor = chosenColor;
            canvas.style.borderColor = chosenColor;
        }
    } else if (colorOption == 'rainbow') {
        if ((mouseDrag) && (e.target.className == 'pixel')) {
            chosenColor = generateRandomColor();
            e.target.style.backgroundColor = chosenColor;
        }
    }
}
)

//shading options
shading.addEventListener('click', (e) => {


    if (e.target.classList.contains('subOptionDarker')) {
        e.target.classList.toggle('underline');
        if (e.target.classList.contains('underline')) {
            shadingOption = 'darker';
        } else {
            // e.target.classList.toggle('underline');
            shadingOption = null;
        }
        if (e.target.nextElementSibling.classList.contains('underline')) {
            e.target.nextElementSibling.classList.remove('underline');
        }

    } else if (e.target.classList.contains('subOptionLighter')) {
        e.target.classList.toggle('underline');
        if (e.target.classList.contains('underline')) {
            shadingOption = 'lighter';
        } else {
            // e.target.classList.toggle('underline');
            shadingOption = null;
        }
        if (e.target.previousElementSibling.classList.contains('underline')) {
            e.target.previousElementSibling.classList.remove('underline');
        }
    }
    console.log(shadingOption);
}
);

//deletion options
deleting.addEventListener('click', (e) => {
    shading.querySelectorAll('li').forEach((item) => {
        item.style.textDecoration = 'none';
    });
    if (e.target.classList.contains('subOptionEraser')) {

        e.target.classList.toggle('underline');
        erasing = true;
        if ((e.target.classList.contains('underline')) || (erasing === undefined)) {
            erasing = true;
        } else erasing = false;

    } else if (e.target.className == 'subOptionClear') {
        document.querySelectorAll('.pixel').forEach((item) => {
            item.removeAttribute('style', 'backgroundColor');
            shadingOption = null;
        })


    }
})

//change canvas size according to slider and create canvasSize property
range.addEventListener('input', (e) => {
    document.querySelector('.option_size-value').textContent = `${e.target.value} x ${e.target.value}`;
    canvasSize = e.target.value;
})

//generate canvas with set mesh density
range.addEventListener('click', () => {
    while (canvas.hasChildNodes()) {
        canvas.removeChild(canvas.lastChild);
    };
    canvas.style.gridTemplateColumns = 'repeat(' + canvasSize + ', minmax(auto, 1fr))';
    for (let i = 0; i < (canvasSize * canvasSize); i++) {
        let pixel = document.createElement('div');
        pixel.classList.add('pixel');
        canvas.appendChild(pixel);
    }
    colorLightness = getColorLightness(chosenColor);
})

//display or hide menus
optionsList.forEach((item) => {
    item.addEventListener('click', (e) => {

        if ((e.target.classList.contains('icon')) || (e.target.classList.contains('text')) || (e.target.classList.contains('arrow'))) {
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

//hide menus after mouse moves away
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

function generateRandomColor() {
    randomColorValue1 = (((Math.random() * (360 - 0 + 1)) + 0).toFixed(0));
    randomColorValue2 = (((Math.random() * (100 - 0 + 1)) + 0).toFixed(0));
    randomColorValue3 = (((Math.random() * (100 - 0 + 1)) + 0).toFixed(0));
    return 'hsl(' + randomColorValue1 + ', ' + randomColorValue2 + '%, ' + randomColorValue3 + '%)';
}


function getColorLightness(chosenColor) {
    let hslColorCode = chosenColor.slice(4).split(',');
    let colorValues = hslColorCode.map((value) => parseInt(value));
    chosenColorValue1 = colorValues[0];
    chosenColorValue2 = colorValues[1];
    chosenColorValue3 = colorValues[2];
    return Number(chosenColorValue3);
}





