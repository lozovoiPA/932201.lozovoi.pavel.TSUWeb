var total = 0;
var gm;
var max;
var min;
function load(){
    input = document.getElementById("input");
    max = input.max;
    min = input.min;
}
function randomInt(maxV){
    return Math.floor(Math.random() * maxV);
}
function crGeometry(type){
    value = input.value;
    gm = document.getElementsByClassName("shape");

    let gmCont = document.getElementById("GeometryContainer");
    let rect = gmCont.getBoundingClientRect();
    let max_x = rect.right;
    let max_y = rect.bottom;
    let min_y = rect.top;
    max_y -= min_y;
    console.log(max_x, max_y, min_y);
    for(let i = 0; i < value; i++){
        let gm_size = randomInt(250) + 30;
        let gm_x = randomInt(max_x - gm_size);
        let gm_y = randomInt(max_y - gm_size) + min_y;

        let div = document.createElement("div");
        div.classList.add("shape");
        div.style.height = (div.style.width = gm_size + "px");
        div.style.top = gm_y + "px";
        div.style.left = gm_x + "px";
        
        switch(type){
            case 0:
                div.classList.add("square");
                break;
            case 1:
                div.classList.add("triangle");
                div.style.width = "0px";
                div.style.height = "0px";
                
                div.style.fontSize = "0px"; div.style.lineHeight = "0%"; div.style.width = "0px";
                div.style.borderTop = "0";
                div.style.borderBottom = gm_size + "px solid blue";
                div.style.borderLeft = gm_size / 2 + "px solid transparent";
                div.style.borderRight = gm_size / 2 + "px solid transparent";
                break;
            case 2:
                div.classList.add("circle");
                div.style.borderRadius = gm_size / 2 + "px";
                break;
        }
        gmCont.insertAdjacentElement("beforeend", div);

        div.onclick = function(){
            if(type == 1){
                div.style.borderBottomColor = "yellow";
            }
            else{
                div.style.backgroundColor = "yellow";
            }
        };
        div.ondblclick = function(){
            div.remove();
        };
    }
}
