console.log("bababooey");

// BASIC INPUT
// making variable for input
let basicInput = document.querySelector("#basic-input");
// access value property to look up what user typed
console.log(basicInput.value);

// NUMERIC INPUT
let numericInput = document.querySelector("#age-input");
// still use value to look up what the user typed
// adding plus (+) converts the input from a string to a number
console.log(+numericInput.value);

// DROP DOWN INPUT
let dropDownInput = document.querySelector("#car-model-input");
// looking at the selected value is the same
console.log(dropDownInput.value);

// CHECK BOX LIST INPUT
// each check option gets a variable
let lettuceOption = document.querySelector("#lettuce");
let tomatoOption = document.querySelector("#tomato");
let onionOption = document.querySelector("#onion");

// checking if user selected options
if (lettuceOption.checked && tomatoOption.checked) {
    ;
}

// RADIO BUTTON LIST
let selectedOption = document.querySelector("input[name=truth]:checked").value;
console.log(selectedOption);