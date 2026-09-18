let submitButton = document.querySelector("#submit-button");
shuffleQuiz();
submitButton.addEventListener("click", gradeQuiz);

function shuffleQuiz() {
    let q1Choices = ["select", "select2", "select3", "select4"];

    for (let i = q1Choices.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [q1Choices[i], q1Choices[j]] = [q1Choices[j], q1Choices[i]];
    }

    for (let i of q1Choices) {
        let inputElement = document.createElement("input");
        inputElement.type = "radio";
        inputElement.name = "q1";
        inputElement.value = i;

        let labelElement = document.createElement("label");
        labelElement.textContent = i;
        labelElement.prepend(inputElement);
        document.querySelector("#q1Choices").append(labelElement);
    }
}

function gradeQuiz() {
    let q1Answer = "select";
    let q2Answer = "option";
    let q3Answer = 7;
    let q4Answer = "r";
    let q5Answer = "h";

    let q1Message = document.querySelector("#q1Message");
    let q2Message = document.querySelector("#q2Message");
    let q3Message = document.querySelector("#q3Message");
    let q4Message = document.querySelector("#q4Message");
    let q5Message = document.querySelector("#q5Message");

    let userAnswerQ1 = document.querySelector("input[name=q1]:checked").value;
    let userAnswerQ2 = document.querySelector("#textBox").value;
    let userAnswerQ3 = document.querySelector("#numberBox").value;
    let userAnswerQ4 = document.querySelector("#colorInput").value;
    let userAnswerQ5 = document.querySelector("input[name=human]:checked").value;
    let score = 0;

    if (q1Answer == userAnswerQ1) {
        q1Message.style.color = "green";
        q1Message.textContent = "Correct!";
        score += 20;
    } else {
        q1Message.style.color = "red";
        q1Message.textContent = "Inorrect!";
    }

    if (q2Answer == userAnswerQ2) {
        q2Message.style.color = "green";
        q2Message.textContent = "Correct!";
        score += 20;
    } else {
        q2Message.style.color = "red";
        q2Message.textContent = "Inorrect!";
    }

    if (q3Answer == +userAnswerQ3) {
        q3Message.style.color = "green";
        q3Message.textContent = "Correct!";
        score += 20;
    } else {
        q3Message.style.color = "red";
        q3Message.textContent = "Inorrect!";
    }

    if (q4Answer == userAnswerQ4) {
        q4Message.style.color = "green";
        q4Message.textContent = "Correct!";
        score += 20;
    } else {
        q4Message.style.color = "red";
        q4Message.textContent = "Inorrect!";
    }

    if (q5Answer == userAnswerQ5) {
        q5Message.style.color = "green";
        q5Message.textContent = "Correct!";
        score += 20;
    } else {
        q5Message.style.color = "red";
        q5Message.textContent = "Inorrect!";
    }

    let scoreDisplay = document.getElementById("score").textContent = score + "/100";

    console.log(q1Message);
    console.log(q2Message);
    console.log(q3Message);
    console.log(q4Message);
    console.log(q5Message);
    console.log(scoreDisplay);
}