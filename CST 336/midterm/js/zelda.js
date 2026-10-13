let zeldaPics = document.querySelector("#zeldaInfo");
let filterBtn = document.querySelector("#filter-btn");
let resetBtn = document.querySelector("#reset-btn");

filterBtn.addEventListener("click", async function () {
    while (zeldaPics.hasChildNodes()) {
        zeldaPics.removeChild(zeldaPics.firstChild);
    }

    let entryCheckboxes = document.querySelectorAll("input[name=entry]:checked");
    let entries = [];

    let entryInput = document.querySelector("#entrySearch");
    let zeldaResults;
    let zeldaData;

    for (let entryCheckbox of entryCheckboxes) {
        if (entryCheckbox.checked) {
            entries.push(entryCheckbox.value);
        }
    }

    for (let entry of entries) {
        zeldaResults = await fetch("https://api.hyrule-compendium.com/v3/compendium/category/" + entry);

        if (zeldaResults.status === 404) {
            continue;
        }

        zeldaData = await zeldaResults.json();

        for (let character of zeldaData.data) {
            let newChar = document.createElement("img");
            newChar.src = character.image;
            newChar.id = character.name;
            newChar.alt = "Picture of " + newChar.id;

            let picDiv = document.createElement("div");
            let zeldaLabel = document.createElement("p");
            zeldaLabel.textContent = newChar.id.toUpperCase();

            picDiv.classList.add("results");
            picDiv.appendChild(newChar);
            picDiv.appendChild(zeldaLabel);

            zeldaPics.appendChild(picDiv);
        }
    }


    zeldaResults = await fetch("https://api.hyrule-compendium.com/v3/compendium/entry/" + entryInput.value.toLowerCase());
    zeldaData = await zeldaResults.json();

    if (zeldaResults.status != 404) {
        let newChar = document.createElement("img");
        newChar.src = zeldaData.data.image;
        newChar.id = zeldaData.data.name;
        newChar.alt = "Picture of " + newChar.id;

        let picDiv = document.createElement("div");
        let zeldaLabel = document.createElement("p");
        zeldaLabel.textContent = newChar.id.toUpperCase();

        picDiv.classList.add("results");
        picDiv.appendChild(newChar);
        picDiv.appendChild(zeldaLabel);

        zeldaPics.appendChild(picDiv);
    } else if (entryInput.value != "") {
        let errorElt = document.createElement("p");
        errorElt.textContent = "Can't generate pictures based on input. Invalid entry name!";
        zeldaPics.appendChild(errorElt);
    }
});

resetBtn.addEventListener("click", function () {
    for (let checkbox of document.querySelectorAll("input[name=entry]:checked")) {
        checkbox.checked = false;
    }

    if (document.querySelector("#entrySearch").value != "") {
        document.querySelector("#entrySearch").value = "";
    }
});
