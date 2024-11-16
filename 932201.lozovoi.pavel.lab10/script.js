var curtains;
var lamp;
var light;

var wizard, hat, rabbit, bird;

var light_on = false;
var cur_animal;
var hidden_animal;
var animal_shown = true;

var timeout;

function load(){
    curtains = document.getElementById('curtains');
    lamp = document.getElementById('lampTurnOn');
    light = document.getElementById('light');

    wizard = document.getElementById('wizard');
    hat = document.getElementById('hat');
    rabbit = document.getElementById('rabbit');
    bird = document.getElementById('bird');

    cur_animal = rabbit;
    hidden_animal = bird;
    screenResize();
}

function screenResize(){
    let newWidth = 0;
    if(curtains.offsetHeight < document.body.offsetWidth / 16 * 9){
        newWidth = document.body.offsetWidth;
    }
    else{
        newWidth = curtains.offsetHeight / 9 * 16;
    }
    curtains.style.width = newWidth.toString() + "px";

    newWidth = document.body.offsetHeight;
    newWidth-= 145;
    light.style.borderBottomWidth = newWidth.toString() + "px";
}

function curtainsLeave(){
    curtains.style.transitionDuration = "1s";
    curtains.style.top = "calc(-100%)";
}

function holdLamp(){
    lamp.style.top = "0px";
    if(light_on){
        light.style.opacity = "0";
        light_on = false;

        wizard.style.opacity = "0";
        hat.style.opacity = "0";
        rabbit.style.opacity = "0";
        bird.style.opacity = "0";
    }
    else{
        light.style.opacity = "0.5";
        light_on = true;

        wizard.style.opacity = "1";
        hat.style.opacity = "1";
        rabbit.style.opacity = "1";
        bird.style.opacity = "1";
    }
}
function unholdLamp(){
    lamp.style.top = "-10px";
}

function showAnimal(){
    if(!animal_shown){
        timeout = setTimeout(function(){ changeVisibility(cur_animal, false)}, 1.5 * 100);
        cur_animal.style.bottom = "280px";
        cur_animal.style.left = "calc(50% + 60px)";
        animal_shown = true;
    }
}
function changeVisibility(obj, hide = true){
    if(hide)
        obj.style.visibility = "hidden";
    else
        obj.style.visibility = "visible";
    clearTimeout(timeout);
}
function hideAnimal(){
    cur_animal.style.bottom = "110px";
    cur_animal.style.left="calc(50% + 80px)";
    timeout = setTimeout(function(){ changeVisibility(hidden_animal)}, 1.5 * 100);
    if(cur_animal == rabbit){
        cur_animal = bird;
        hidden_animal = rabbit;
    }
    else{
        cur_animal = rabbit;
        hidden_animal = bird;
    }
    animal_shown = false;
}
