// empty array named colors
let colors = [];

// checking the length of array
console.log(colors.length);

// pre-populated array
let ingredients = ["lettuce", "tomato", "buns"];

// adding to an array (basic)
// push adds to end of array
colors.push("red")
colors.push("yellow");

// insert elements between other elements
colors.splice();

// looking up value in array
colors[0]; // the first value
colors[1]; // the second value

// querySelectorAll groups html elts into an array
let ingredientsInputs = document.querySelectorAll("input[name=ingredients]");
// print ingredientsInputs array
console.log(ingredientsInputs);
let buttons = document.querySelectorAll(".confirm-btn");
// print empty array since class does not exist
console.log(buttons)

// for each loop
for (let color of colors) {
    console.log(color);
}

// loop through elts to check if they're all checked
// generate list of paragraph elts from array of strings