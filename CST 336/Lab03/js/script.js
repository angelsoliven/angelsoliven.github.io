let submitButton = document.querySelector("#submit-button");
shuffleQuiz();
submitButton.addEventListener("click", gradeQuiz);

function shuffleQuiz() {
    let q1Choices = ["Sora", "Riku", "Ventus", "Mickey"];

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
        labelElement.classList.add("question-body");
        document.querySelector("#q1Choices").appendChild(labelElement);
    }

    let q5Choices = ["Xigbar", "Axel", "Roxas", "Xehanort"];

    for (let i = q5Choices.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [q5Choices[i], q5Choices[j]] = [q5Choices[j], q5Choices[i]];
    }

    for (let c of q5Choices) {
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        if (c == "Xigbar") {
            checkbox.value = "xig";
        } else {
            checkbox.value = c.at(0).toLowerCase();
        }

        checkbox.name = "human";
        checkbox.id = c;

        let label = document.createElement("label");
        label.textContent = c;
        label.classList.add("question-body");
        label.prepend(checkbox);
        document.querySelector("#q5Choices").appendChild(label);
        
    }
}

function gradeQuiz() {
    let q1Answer = "Sora";
    let q2Answer = "curaga";
    let q3Answer = 7;
    let q4Answer = "r";
    let q5Answer = ["x", "xig", "a", "r"];

    let questions = document.querySelectorAll(".question");

    let userAnswerQ1 = document.querySelector("input[name=q1]:checked").value;
    let userAnswerQ2 = document.querySelector("#textBox").value.toLowerCase();
    let userAnswerQ3 = document.querySelector("#numberBox").value;
    let userAnswerQ4 = document.querySelector("#colorInput").value;
    let userAnswerQ5 = document.querySelectorAll("input[name=human]:checked");
    let quizCount = document.querySelector("#quizCount");
    let score = 0;

    if (q1Answer == userAnswerQ1) {
        questions[0].textContent += "✔️";
        score += 20;
    } else {
        questions[0].textContent += "❌";
    }

    if (q2Answer == userAnswerQ2) {
        questions[1].textContent += "✔️";
        score += 20;
    } else {
        questions[1].textContent += "❌";
    }

    if (q3Answer == +userAnswerQ3) {
        questions[2].textContent += "✔️";
        score += 20;
    } else {
        questions[2].textContent += "❌";
    }

    if (q4Answer == userAnswerQ4) {
        questions[3].textContent += "✔️";
        score += 20;
    } else {
        questions[3].textContent += "❌";
    }

    let count = 0;
    for (let i = 0; i < userAnswerQ5.length; i++) {
        for (let a of q5Answer) {
            if (a == userAnswerQ5[i].value) {
                count++;
            }
        }
    }

    if (count == 4) {
        questions[4].textContent += "✔️";
        score += 20;
    } else {
        questions[4].textContent += "❌";
    }

    let scoreDisplay = document.getElementById("score");
    scoreDisplay.textContent = "Score: " + score + "/100";

    if (score > 80) {
        let congratsMsg = document.querySelector("#congrats-msg");
        congratsMsg.textContent = "You're a Keyblade Master! 🗝";
    }

    if (localStorage.getItem("quizCount") == null) {
        localStorage.setItem("quizCount", "1");
    } else {
        localStorage.setItem("quizCount", (Number(localStorage.getItem("quizCount")) + 1).toString());
    }

    quizCount.textContent = "Total Quiz Submissions: " + localStorage.getItem("quizCount");

    console.log(scoreDisplay);
    console.log(localStorage.getItem("quizCount"));
}