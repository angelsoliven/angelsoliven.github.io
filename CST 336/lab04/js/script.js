let city = document.querySelector("#city");
let latitude = document.querySelector("#latitude");
let longitude = document.querySelector("#longitude");
let zipCodeInput = document.querySelector("#zipCode");

let passwordInput = document.querySelector("#passwordInput");
let suggestedPass = document.querySelector("#suggested");

let usernameChoice = document.querySelector("#username");
let available = document.querySelector("#available");

let stateInput = document.querySelector("#state");

zipCodeInput.addEventListener("blur", async function () {
    let zipResults = await fetch("https://csumb.space/api/cityInfoAPI.php?zip=" + zipCodeInput.value);
    let zipData = await zipResults.json();
    console.log(zipData);

    city.textContent += zipData.city;
    latitude.textContent += zipData.latitude;
    longitude.textContent += zipData.longitude;
});

passwordInput.addEventListener("click", async function () {
    let random = Math.floor(Math.random() * 10);
    let passResults = await fetch("https://csumb.space/api/suggestedPassword.php?length=" + random.toString());
    let passData = await passResults.json();
    console.log(passData);
    suggestedPass.textContent = "Suggested Password: " + passData.password ;
});

usernameChoice.addEventListener("blur", async function () {
    let availableResults = await fetch("https://csumb.space/api/usernamesAPI.php?username=" + usernameChoice.value);
    let availableResultsData = await availableResults.json();
    console.log(availableResultsData);

    if (availableResultsData.available == false) {
        available.style.color = "red"
        available.textContent = "Username not available";
    } else {
        available.style.color = "green"
        available.textContent = "Username available";
    }
});

stateInput.addEventListener("click", async function () {
    let stateResults = await fetch("https://csumb.space/api/allStatesAPI.php");
    let stateData = await stateResults.json();
    console.log(stateData);

    for (let state of stateData) {
        let option = document.createElement("option");
        option.value = state.state;
        option.id = state.state;
        option.textContent = state.state;
        stateInput.appendChild(option);
    }
});

stateInput.addEventListener("blur", async function () {
    let countyResults = await fetch("https://csumb.space/api/countyListAPI.php?state=" + stateInput.value);
    let countyData = await countyResults.json();
    console.log(countyData);
});

