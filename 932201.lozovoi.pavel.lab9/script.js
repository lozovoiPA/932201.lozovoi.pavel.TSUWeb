var input;
var operand1 = 0; // if this is 1, then do not replace text in input
var operand2 = 0;
var operation = "";
var dotIndex = 0;

String.prototype.removeCharAt = function (i) {
    var tmp = this.split('');
    tmp.splice(i, 1);
    return tmp.join('');
}

function load(){
    input = document.getElementById("input");
}

function addNum(num){
    let val = input.value;
    if(operand1 == 0 && val[input.value.length - 1] == "0"){
        val = val.removeCharAt(input.value.length-1);
        if(num != 0) operand1 = 1;
    }
    if(operand1 == -1){
        if(num == 0)
            operand1 = 0;
        else
            operand1 = 1;
        val += " ";
    } 
        
    val += String(num);
    input.value = val;
}
function addDot(){
    if(!dotIndex){
        dotIndex = input.value.length;
        input.value += ".";
        operand1 = 1;
    }
}
function addOper(oper){
    let strs = input.value.split(' ');
    let val = Number(strs[strs.length - 1]);
    if(operand1 == -1){
        input.value.removeCharAt(input.value.length - 1);
        input.value += oper;   
    }
    else if(operand2 != 0 && ((operation == "/" && val != 0) || (operation != "/"))){
        //perform operation in memory if there's already a saved value (and it's not division by zero ^)
        if(operand2 != 0){
            switch(operation){
                case "+":
                    operand2 = operand2 + val;
                break;
                case "-":
                    operand2 = operand2 - val;
                break;
                case "*":
                    operand2 = operand2 * val;
                break;
                case "/":
                    operand2 = operand2 / val;
                break;
            }
        }
    }
    else if(operand2 == 0) 
        operand2 = val;
    operation = oper;

    input.value = String(operand2) + " " + operation;
    dotIndex = 0; // can enter point again
    operand1 = -1; // no number is shown yet
}

function clearc(){
    input.value = "0";
    operand1 = 0;
    operand2 = 0;
    operation = "";
    dotIndex = 0;
}
function removeLast(){
    let strs = input.value.split(' ');
    let n = strs.length;
    if(strs[n-1][strs[n-1].length - 1] == ".") 
        dotIndex = 0;
    strs[n - 1] = strs[n - 1].removeCharAt(strs[n-1].length - 1);
    if (strs[n-1].length == 0){
        if(n == 1) {
            operand1 = 0; // current number is 0 and can be replaced
            strs[n-1] = "0";
        }
        else if (n == 2){
            operand2 = 0; // second operand fully deleted
            operand1 = 1; // second operand is now the first one
        }
        else{
            operand1 = -1; // no number entered
        }
    }
    else if(n == 2 && dotIndex == 0 && strs[0].indexOf('.') != -1){
        dotIndex = 1; // if first number has a point, we can't place it
    }
    let val = strs.join(' ');
    if(strs[n-1].length == 0 && n != 1){
        val = val.removeCharAt(val.length - 1);
    }
    input.value = val;
}
function count(){
    if(operand2 != 0){
        if(operand1 != -1){
            let strs = input.value.split(' ');
            let val = Number(strs[strs.length - 1]);
            switch(operation){
                case "+":
                    operand2 = operand2 + val;
                break;
                case "-":
                    operand2 = operand2 - val;
                break;
                case "*":
                    operand2 = operand2 * val;
                break;
                case "/":
                    operand2 = operand2 / val;
                break;
            }
        }
        input.value = String(operand2);
        if(input.value.indexOf('.') != -1){
            dotIndex = 1;
        }
        else{
            dotIndex = 0;
        }
        if(operand2 == 0)
            operand1 = 0;
        else
            operand1 = 1;
        operand2 = 0;
        operation = "";
    }
}