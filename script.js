const rightDisplayArea = document.querySelector(".calc-display-inner-right");
const leftDisplayArea = document.querySelector(".calc-display-inner-left");
const acButton = document.querySelector("#ac");
const cButton = document.querySelector("#c");
const backButton = document.querySelector("#back");

const addButton = document.querySelector("#add");
const subtractButton = document.querySelector("#subtract");
const multiplyButton = document.querySelector("#multiply");
const divideButton = document.querySelector("#divide");
const equalButton = document.querySelector("#equal");


const zeroButton = document.querySelector("#zero");
const zeroZeroButton = document.querySelector("#zero-zero");
const oneButton = document.querySelector("#one");
const twoButton = document.querySelector("#two");
const threeButton = document.querySelector("#three");
const fourButton = document.querySelector("#four");
const fiveButton = document.querySelector("#five");
const sixButton = document.querySelector("#six");
const sevenButton = document.querySelector("#seven");
const eightButton = document.querySelector("#eight");
const nineButton = document.querySelector("#nine");
const decimalButton = document.querySelector("#decimal");


const maxDisplaySize = 10; //set the max display size here

let operand1 = 0;
let operand2 = 0;
let previousOperator = null;
let newOperator = null;
let isOperationComplete = true;
let isOperandAvailable = false;
let isNewOperandRcvd = false;

resetCalculator();

acButton.addEventListener("click",() => {
    isOperationComplete = true;
    resetCalculator();});

cButton.addEventListener("click", () => {
    (isOperationComplete) ? resetCalculator() : resetCalculatorRight();}) ;

backButton.addEventListener("click",() => pressBack());

addButton.addEventListener("click",() => setOperator("+"));
subtractButton.addEventListener("click",() => setOperator("-"));
multiplyButton.addEventListener("click",() => setOperator("X"));
divideButton.addEventListener("click",() => setOperator("/"));
equalButton.addEventListener("click",() => setOperator("="));


zeroButton.addEventListener("click",() => pressNumber("0"));
zeroZeroButton.addEventListener("click",() => pressNumber("00"));
oneButton.addEventListener("click",() => pressNumber("1"));
twoButton.addEventListener("click",() => pressNumber("2"));
threeButton.addEventListener("click",() => pressNumber("3"));
fourButton.addEventListener("click",() => pressNumber("4"));
fiveButton.addEventListener("click",() => pressNumber("5"));
sixButton.addEventListener("click",() => pressNumber("6"));
sevenButton.addEventListener("click",() => pressNumber("7"));
eightButton.addEventListener("click",() => pressNumber("8"));
nineButton.addEventListener("click",() => pressNumber("9"));
decimalButton.addEventListener("click",() => pressDecimal());


//Keyboard mapping here
document.body.addEventListener("keydown",function(event){


    switch (event.key){
        case "0":
            zeroButton.click();
            break;
        case "1":
            oneButton.click();
            break;
        case "2":
            twoButton.click();
            break;
        case "3":
            threeButton.click();
            break;
        case "4":
            fourButton.click();
            break;
        case "5":
            fiveButton.click();
            break;
        case "6":
            sixButton.click();
            break;
        case "7":
            sevenButton.click();
            break;
        case "8":
            eightButton.click();
            break;
        case "9":
            nineButton.click();
            break;
        case "Enter":
            equalButton.click();
            break;
        case "+":
            addButton.click();
            break;
        case "-":
            subtractButton.click();
            break;
        case "*":
            multiplyButton.click();
            break;
        case "/":
            divideButton.click();
            break;
        case " ":
            acButton.click();
            break;        
        case "Backspace":
            backButton.click();
            break;        
        case ".":
            decimalButton.click();
            break;
    }
});


function getCurrentOperandLength(){
    return  rightDisplayArea.textContent.includes(".")? rightDisplayArea.textContent.length-1 : rightDisplayArea.textContent.length; //this excludes decimal poin when calculating length of string
}

function getLength(value)
{
    return  value.toString().includes(".")? value.toString().length-1 : value.toString().length;
    //this excludes decimal poin when calculating length of string
}

function resetCalculator(){
    display("0");
    leftDisplayArea.textContent = "";
    previousOperator = null;
    newOperator = null;
    isOperationComplete = true;
    operand1 = 0;
    operand2 = 0;
    isOperandAvailable = false;
    isNewOperandRcvd = false;
}

function resetCalculatorRight(){
    rightDisplayArea.textContent = "0";
}

function pressNumber(number){
    if(previousOperator === null) //empties operator display for first insertion of operand 
        leftDisplayArea.textContent = "";
    if(isOperationComplete) //resets calculator when number pressed after previous operation is complete
        resetCalculator();
    if (!isNewOperandRcvd){ 
        rightDisplayArea.textContent = "";
        isNewOperandRcvd = true;
    }
    if((maxDisplaySize - getCurrentOperandLength())>= number.length){
        rightDisplayArea.textContent = rightDisplayArea.textContent + number;
        isOperationComplete = false;
    }
    if (!rightDisplayArea.textContent.includes("."))
        rightDisplayArea.textContent = +(rightDisplayArea.textContent);
}

function pressBack(){
    rightDisplayArea.textContent = rightDisplayArea.textContent.slice(0,-1);
    if (!isNewOperandRcvd)
        {
            isOperationComplete = true;
            resetCalculator();
        }
    if (rightDisplayArea.textContent === "")
        rightDisplayArea.textContent = "0";

}

function pressDecimal(){
    if (!rightDisplayArea.textContent.includes(".")){
        if(isNewOperandRcvd === false)
            pressNumber("0");
        pressNumber(".");
    }
    else if(isNewOperandRcvd === false){
        pressNumber("0");
        pressNumber(".");
        isNewOperandRcvd = true;
    }
}

function display(value){
    let valueSplit;
    let availableDecimalPlace, multiplier;
    if(getLength(value)<=maxDisplaySize)
        rightDisplayArea.textContent = value;
    else if(value.toString().includes(".")){
        valueSplit = value.toString().split(".");
        if(valueSplit[0].length >= 10){
            rightDisplayArea.textContent = "Huge Value!";
            isOperationComplete = true;    
        }

        availableDecimalPlace = maxDisplaySize - valueSplit[0].length;
        multiplier = 10 ** availableDecimalPlace;
        value = Math.round((value + Number.EPSILON) * multiplier) / multiplier
        rightDisplayArea.textContent = value;
    }
    else{
        rightDisplayArea.textContent = "Huge Value!";
        isOperationComplete = true;
    }

}

function setOperator(newOperator){
    leftDisplayArea.textContent = newOperator;

    if(isOperationComplete === true){ /*this takes care of situation
     when user presses an operator without giving an operand in the 
     beginning of an operation. We will assume 0 as the first 
     operand in this case*/
        isOperationComplete = false;
        isNewOperandRcvd = true;
        if(isNaN(rightDisplayArea.textContent) === true)
            display("0");
    }

    if(previousOperator === null){
        if(isNewOperandRcvd)
            previousOperator = newOperator;
        isNewOperandRcvd = false;
        isOperandAvailable = true;
        operand1 = +(rightDisplayArea.textContent);
    }

    else if(isNewOperandRcvd){
        operand2 = rightDisplayArea.textContent;
        switch(previousOperator){
            case "+":
                operand1 = +(operand1) + +(operand2);
                display(operand1);
                break;
            case "-":
                operand1 = +(operand1) - +(operand2);
                display(operand1);
                break;
            case "X":
                operand1 = +(operand1) * +(operand2);
                display(operand1);
                break;
            case "/":
                if(+operand2 === 0)
                    {
                        display("Not today");
                        isOperationComplete = true;
                    }
                else{
                    operand1 = +(operand1) / +(operand2);
                    display(operand1);
                }
                break;

        }
        previousOperator = newOperator;
        isNewOperandRcvd = false;
        isOperandAvailable = true;

    }
    else{
        previousOperator = newOperator;
    }
    if(newOperator === "="){
        previousOperator = null;
        newOperator = "";
        isOperationComplete = true;
    }
        
}

