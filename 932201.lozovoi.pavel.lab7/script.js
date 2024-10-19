var cur_col = -1;   // -1 - left, 0 - center, 1 - right 

var f_cont_w = "90%"    // full container width
var s_cont_w = "50%"    // small container width
var f_img_w = "550px"   // full image width
var s_img_w = "100%"    // small image width

// 0 - small width, 1 - full width
const cont_w = ["50%", "90%"]; 
const img_w = ["calc(100% - 30px)", "550px"];
const dog_pos = ["0", "calc(70px - 100%)"];

var cat;
var dog;
var aImg;
function load(){
    cat = document.getElementById("cat");
    dog = document.getElementById("dog");

    aImg = document.getElementsByClassName("aImg");
}
function changeWidths(w){
    cat.style.width = cont_w[w];
    dog.style.width = cont_w[w];
    for (var i = 0; i < aImg.length; i++) {
        aImg[i].style.width = img_w[w];
    }
    dog.style.top = dog_pos[w];
}
function changeCol(col){
    if(cur_col != col){
        switch(col){
            case -1:
                cat.style.zIndex = "0";
                dog.style.zIndex = "-1";

                aImg[0].style.float = "none";
                break;
            case 1:
                cat.style.zIndex = "-1";
                dog.style.zIndex = "0";

                aImg[0].style.float = "right";
                break;
        }

        changeWidths(Math.abs(col));
        cur_col = col;
    }
}
function leftCol(){
    if(cur_col != -1){
        cat.style.zIndex = "0";
        dog.style.zIndex = "-1";

        if(cur_col == 0){
            cat.style.width = f_cont_w;
            dog.style.width = f_cont_w;
            aImg.array.forEach(element => {
                element.style.width = f_img_w;
            });
        }

        cur_col = -1;
    }
}
function centerCol(){
    if(cur_col != 0){

        {
            cat.style.width = s_cont_w;
            dog.style.width = s_cont_w;
            aImg.array.forEach(element => {
                element.style.width = s_img_w;
            });
        }

        cur_col = 0;
    }
}
function rightCol(){
    if(cur_col != 1){
        cat.style.zIndex = "-1";
        dog.style.zIndex = "0";

        if(cur_col == 0){
            cat.style.width = f_cont_w;
            dog.style.width = f_cont_w;
            aImg.array.forEach(element => {
                element.style.width = f_img_w;
            });
        }

        cur_col = 1;
    }
}