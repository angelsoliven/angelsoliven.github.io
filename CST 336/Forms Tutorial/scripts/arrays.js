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


// Average of ages array
let ages = [50, 40, 20, 25, 80];
let average = 0;

for (let age of ages) {
    average += age;
}

average /= ages.length;
console.log(average);


// Count how many checkboxes are checked for ingredient list
let checkboxes = document.querySelectorAll("input[name=ingredients]");
let totalChecked = 0;

for (let checkbox of checkboxes) {
    if (checkbox.checked) {
        totalChecked++;
    }
}

console.log(totalChecked);

// Create HTML elements

// Step 1: Create the element
let newParagraph = document.createElement("p");

// Step 2: Configure element content
newParagraph.textContent = "bababooey";
newParagraph.id = "dynamic-paragraph";

// Step 3: Insert it into the page
// Make a variable for which part of the page the element should go into
let insertArea = document.querySelector("#insert-area");
insertArea.appendChild(newParagraph);

let names = ["cloud", "tifa", "aerith", "sephiroth"];

for (let name of names) {
    let newP = document.createElement("p");
    newP.textContent = name;
    insertArea.appendChild(newP);
}

let namesDropdown = document.querySelector("#names-dropdown");
for (let name of names) {
    let newOption = document.createElement("option");
    newOption.textContent = name;
    newOption.value = name;
    namesDropdown.appendChild(newOption);
}

// USING CAT API
let limit = 20;
let searchResults = document.querySelector("#search-results");
// don't finish running the code until fetch() is finished

// async keyword lets OS know that this function could take an unknown amount of time to finish
// w/o await, code can just keep running. Good practice to have await to prevent code that needs fetch results from running
// await and async keywords always go together
async function getCats() {
    let catsResult = await fetch("https://api.thecatapi.com/v1/images/search?limit=10"); // fetch gets content from URL
    console.log("Cats: ");
    // Returns info about catsResult
    console.log(catsResult);

    let catsData = await catsResult.json(); // json() reads results and makes it available
    console.log(catsData);

    for (let cat of catsData) {
        let newImage = document.createElement("img");
        newImage.src = cat.url;
        newImage.style.height = cat.height;
        newImage.style.width = cat.width;
        newImage.id = cat.id;
        searchResults.appendChild(newImage);
    }
}

getCats();

// any code after getCats() can get started before it finishes

// loop through elts to check if they're all checked
// generate list of paragraph elts from array of strings