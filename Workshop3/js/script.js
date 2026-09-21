// Workshop 3 - JavaScript Events & DOM

// ====================
// Exercise 1
// ====================

const buttons = document.querySelectorAll("button");

buttons[0].addEventListener("click", function () {
    alert("You clicked me!");
});

function showTable() {
    const animal = "Dog";
    const habitat = "Home";
    const diet = "Omnivore";

    const table = `
        <table border="1">
            <tr>
                <th>Animal</th>
                <th>Habitat</th>
                <th>Diet</th>
            </tr>
            <tr>
                <td>${animal}</td>
                <td>${habitat}</td>
                <td>${diet}</td>
            </tr>
        </table>
    `;

    const tableContainer = document.querySelector("#tableContainer");
    tableContainer.innerHTML = table;
}

buttons[1].addEventListener("click", showTable);


// ====================
// Exercise 2
// ====================

const headings = document.querySelectorAll("h2");

headings[1].addEventListener("mouseover", function () {
    console.log("Stepped over me with a mouse!");
});

headings[0].addEventListener("click", function () {
    headings[0].innerHTML = "Bye bye mouse!";
    headings[0].style.color = "red";
});


// ====================
// Exercise 3
// ====================

const feedback = document.querySelector("#feedback");
const status = document.querySelector("#status");
const charcount = document.querySelector("#charcount");
const preview = document.querySelector("#preview");

feedback.addEventListener("focus", function () {
    status.innerHTML = "You are writing feedback.";
    feedback.style.backgroundColor = "#f0f8ff";
});

feedback.addEventListener("blur", function () {
    status.innerHTML = "";
    feedback.style.backgroundColor = "";
});

feedback.addEventListener("input", function () {
    const length = feedback.value.length;

    charcount.innerHTML = length + "/200";
    preview.innerHTML = feedback.value;
});


// ====================
// Exercise 4
// ====================

const feedbackForm = document.querySelector("#feedbackForm");

feedbackForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const length = feedback.value.length;

    if (length < 10 || length > 200) {
        status.innerHTML = "Feedback must be between 10 and 200 characters.";
    } else {
        feedback.value = "";
        charcount.innerHTML = "0/200";
        preview.innerHTML = "(The preview will appear here)";
        status.innerHTML = "Thank you for your feedback!";
    }
});
