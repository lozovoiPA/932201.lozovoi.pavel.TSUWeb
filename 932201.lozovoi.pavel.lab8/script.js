var fieldContainer;
var rows_count = 0;
const MAX_LEN = 3;
const MIN_VALUE = 0;
function validateNum(event){
    let text = event.target.value;
    if(text != ""){ // без этого при нажатии на пустое поле ввода чисел и выхода из него (без ввода чего-либо) в поле будут "000", а оно должно остаться пустым.
        if(text[0] == '-'){
            text = "0";
        }

        if (text.length < MAX_LEN){
            text = "0".repeat(MAX_LEN - text.length) + text;
        }
        else if(text.length > MAX_LEN){
            text = "999";
        }
    }
    event.target.value = text;
}
function validateNumByText(text){
    if(text[0] == '-'){
        text = "0";
    }
    if (text.length < MAX_LEN){
        text = "0".repeat(MAX_LEN - text.length) + text;
    }
    else if(text.length > MAX_LEN){
        text = "999";
    }
    return text;
}
function valueSwap(object1, object2){
    let value = object1.value;
    let valuet = object2.value;

    object2.value = value;
    object1.value = valuet;
}
function moveRowUp(event){
    let tr = event.target.parentNode;
    //console.log(Boolean(tr.previousSibling.firstChild)); если нет previousSibling, то он все равно не null. Если сделать просто console.log(tr.previousSibling), то в таблицу перед первым tr будут добавляться пустые tr. По крайней мере в Chrome.
    if(tr.previousSibling.firstChild){
        valueSwap(
            tr.previousSibling.children[0],
            tr.children[0]
        );
        valueSwap(
            tr.previousSibling.children[1],
            tr.children[1]
        );
    }
}
function moveRowDown(event){
    let tr = event.target.parentNode;
    //console.log(tr.nextSibling); при этом если нет nextSibling, то он null в отличие от previousSibling. Стандартизация - наше все?
    if(tr.nextSibling){
        valueSwap(
            tr.nextSibling.children[0],
            tr.children[0]
        );
        valueSwap(
            tr.nextSibling.children[1],
            tr.children[1]
        );
    }
}
function deleteRow(event){
    let tr = event.target.parentNode;
    while (tr.firstChild) {
        tr.removeChild(tr.firstChild);
    }
    tr.remove();

    rows_count -= 1;
}
function createButton(parent, string, onclick){
    let button = document.createElement("button");
    button.classList = "button";
    button.addEventListener("click", onclick);
    let text = document.createTextNode(string);

    parent.insertAdjacentElement("beforeend", button);
    button.appendChild(text);
}
function randomInt(max_value){
    return Math.floor(Math.random() * max_value);
}
function addFieldRow(empty = true){
    let tr = document.createElement("tr");
    fieldContainer.insertAdjacentElement("beforeend", tr);

    let input1 = document.createElement("input");
    input1.type = "text";
    input1.classList = "displayTCell input inputLabel";
    if(!empty){
        input1.value = "Строка " + String(rows_count+1);
    }

    tr.insertAdjacentElement("beforeend", input1);
    //===============
    let input2 = document.createElement("input");
    input2.type = "number";
    input2.max = "999";
    input2.min = "000";
    input2.classList = "displayTCell input inputNumber";
    input2.addEventListener("focusout", validateNum);
    if(!empty){
        input2.value = validateNumByText(String(randomInt(999)));
    }

    tr.insertAdjacentElement("beforeend", input2);
    //===============
    createButton(tr, "↑", moveRowUp);
    createButton(tr, "↓", moveRowDown);
    createButton(tr, "x", deleteRow);

    rows_count += 1;
}
function load(){
    fieldContainer = document.getElementById("fieldContainer");
    addFieldRow();
}
function saveRowContent(){
    let n = fieldContainer.childElementCount;
    let output = "{";
    for(let i = 0; i < n; i++){
        output += "\"" + fieldContainer.children[i].children[0].value + "\":";
        output += "\"" + fieldContainer.children[i].children[1].value + "\"";
        if (i < n-1) output += ","; 
    }
    output += "}";
    let div = document.createElement("div");
    let text = document.createTextNode(output);
    document.body.insertAdjacentElement("beforeend", div);
    div.appendChild(text);
}
