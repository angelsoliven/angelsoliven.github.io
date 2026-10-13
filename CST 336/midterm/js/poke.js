let pokePics = document.querySelector("#pokeInfo");
let filterBtn = document.querySelector("#filter-btn");
let resetBtn = document.querySelector("#reset-btn");

async function getGenMons(pokeResults) {
    pokeData = await pokeResults.json();
    for (let mon of pokeData.pokemon_species) {
        let monResults = await fetch("https://pokeapi.co/api/v2/pokemon/" + mon.name);

        if (monResults.status === 404) {
            continue;
        }

        let monData = await monResults.json();
        let newMon = document.createElement("img");
        newMon.src = monData.sprites.front_default;
        newMon.id = mon.name;
        newMon.alt = "Picture of " + newMon.id;


        let picDiv = document.createElement("div");
        let pokeLabel = document.createElement("p");
        pokeLabel.textContent = newMon.id.toUpperCase();
        picDiv.classList.add("results");
        picDiv.appendChild(newMon);
        picDiv.appendChild(pokeLabel);
        pokePics.appendChild(picDiv);

    }
}

filterBtn.addEventListener("click", async function () {
    while (pokePics.hasChildNodes()) {
        pokePics.removeChild(pokePics.firstChild);
    }

    let typeCheckboxes = document.querySelectorAll("input[name=type]:checked");
    let types = [];
    let colorInput = document.querySelector("#colorSearch");
    let genInput = document.querySelector("input[name=gen]:checked");
    let pokeResults;
    let pokeData;
    let valid_color = false;
    let valid_gen = false;
    const VALID_COLORS = ["red", "black", "white", "purple", "blue", "yellow", "brown", "pink", "green", "gray"];


    if (genInput != null) {
        valid_gen = true;
    }


    if (valid_gen) {
        if (genInput.value == "i") {
            pokeResults = await fetch("https://pokeapi.co/api/v2/generation/1/");
            getGenMons(pokeResults);
        } else if (genInput.value == "ii") {
            pokeResults = await fetch("https://pokeapi.co/api/v2/generation/2/");
            getGenMons(pokeResults);
        } else if (genInput.value == "iii") {
            pokeResults = await fetch("https://pokeapi.co/api/v2/generation/3/");
            getGenMons(pokeResults);
        } else if (genInput.value == "iv") {
            pokeResults = await fetch("https://pokeapi.co/api/v2/generation/4/");
            getGenMons(pokeResults);
        } else if (genInput.value == "v") {
            pokeResults = await fetch("https://pokeapi.co/api/v2/generation/5/");
            getGenMons(pokeResults);
        } else if (genInput.value == "vi") {
            pokeResults = await fetch("https://pokeapi.co/api/v2/generation/6/");
            getGenMons(pokeResults);
        } else if (genInput.value == "vii") {
            pokeResults = await fetch("https://pokeapi.co/api/v2/generation/7/");
            getGenMons(pokeResults);
        } else if (genInput.value == "viii") {
            pokeResults = await fetch("https://pokeapi.co/api/v2/generation/8/");
            getGenMons(pokeResults);
        } else if (genInput.value == "ix") {
            pokeResults = await fetch("https://pokeapi.co/api/v2/generation/9/");
            getGenMons(pokeResults);
        }
    }

    for (let typeCheckbox of typeCheckboxes) {
        if (typeCheckbox.checked) {
            types.push(typeCheckbox.value);
        }
    }

    for (let type of types) {
        pokeResults = await fetch("https://pokeapi.co/api/v2/type/" + type);
        pokeData = await pokeResults.json();

        for (let mon of pokeData.pokemon) {
            let monResults = await fetch("https://pokeapi.co/api/v2/pokemon/" + mon.pokemon.name);

            if (monResults.status === 404) {
                continue;
            }

            let monData = await monResults.json();
            let newMon = document.createElement("img");
            newMon.src = monData.sprites.front_default;
            newMon.id = monData.name
            newMon.alt = "Picture of " + newMon.id;


            let picDiv = document.createElement("div");
            let pokeLabel = document.createElement("p");
            pokeLabel.textContent = newMon.id.toUpperCase();

            picDiv.classList.add("results");
            picDiv.appendChild(newMon);
            picDiv.appendChild(pokeLabel);

            pokePics.appendChild(picDiv);

        }
    }

    for (let color of VALID_COLORS) {
        if (colorInput.value.toString().toLowerCase() == color) {
            valid_color = true;
        }
    }

    if (valid_color) {
        pokeResults = await fetch("https://pokeapi.co/api/v2/pokemon-color/" + colorInput.value.toString());
        pokeData = await pokeResults.json();

        for (let colorMon of pokeData.pokemon_species) {

            let monResults = await fetch("https://pokeapi.co/api/v2/pokemon/" + colorMon.name);

            if (monResults.status === 404) {
                continue;
            }

            let monData = await monResults.json();
            let newMon = document.createElement("img");
            newMon.src = monData.sprites.front_default;
            newMon.id = colorMon.name;
            newMon.alt = "Picture of " + newMon.id;


            let picDiv = document.createElement("div");
            let pokeLabel = document.createElement("p");
            pokeLabel.textContent = newMon.id.toUpperCase();
            picDiv.classList.add("results");
            picDiv.appendChild(newMon);
            picDiv.appendChild(pokeLabel);
            pokePics.appendChild(picDiv);

        }
    } else if (!valid_color && colorInput.value != "") {
        let errorElt = document.createElement("p");
        errorElt.textContent = "Can't generate pictures based on input. Invalid color or text!";
        pokePics.appendChild(errorElt);
    }
});

resetBtn.addEventListener("click", function () {
    for (let checkbox of document.querySelectorAll("input[name=type]:checked")) {
        checkbox.checked = false;
    }

    if (document.querySelector("#colorSearch").value != "") {
        document.querySelector("#colorSearch").value = "";
    }

    for (let radioBtn of document.querySelectorAll("input[name=gen]:checked")) {
        radioBtn.checked = false;
    }
});
