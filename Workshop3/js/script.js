// Workshop 3 - JavaScript Events & DOM

// Exercise 1 - Button click

// First button: show an alert
const buttons = document.querySelectorAll("button");

buttons[0].addEventListener("click", function () {
    alert("You clicked me!");
});

// Second button: show the animal table
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
