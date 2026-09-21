// Workshop 3 - JavaScript Events & DOM

// ====================
// Exercise 1
// ====================

const buttons = document.querySelectorAll("button");

// First button
buttons[0].addEventListener("click", function () {
    alert("You clicked me!");
});

// Second button
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

// Exercise 2 heading - mouseover
headings[1].addEventListener("mouseover", function () {
    console.log("Stepped over me with a mouse!");
});

// Exercise 1 heading - click
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

// When the textarea gets focus
feedback.addEventListener("focus", function () {
    status.innerHTML = "You are writing feedback.";
    feedback.style.backgroundColor = "#f0f8ff";
});

// When the textarea loses focus
feedback.addEventListener("blur", function () {
    status.innerHTML = "";
    feedback.style.backgroundColor = "";
});

// When the user types
feedback.addEventListener("input", function () {
    const length = feedback.value.length;

    charcount.innerHTML = length + "/200";
    preview.innerHTML = feedback.value;
});
