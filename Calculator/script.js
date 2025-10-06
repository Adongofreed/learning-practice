const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

//variable to store current input
let currentInput = "";

//looping through each buttons and add event listeners
buttons.forEach (button =>{
    button.addEventListener("click", () =>{
        const value = button.textContent;

        if (value === "C") {
            //clear display
            currentInput = "";
            display.value = "";
        } else if (value === "="){
            try {
                //evavluate the expression
                currentInput = eval(currentInput);
                display.value = currentInput;
            } catch {
                display.value = "Error";
                currentInput = "";
            }
        } else {
            //add value to input
            currentInput +=value;
            display.value = currentInput;
        }
    });
});