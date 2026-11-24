
// WS5: Animal forms and localStorage

const animalForm = document.getElementById("animalForm");
const animalName = document.getElementById("animalName");
const animalSpecies = document.getElementById("animalSpecies");
const careNote = document.getElementById("careNote");
const nameError = document.getElementById("nameError");
const speciesError = document.getElementById("speciesError");
const noteError = document.getElementById("noteError");
const formResult = document.getElementById("formResult");

// Exercises 1 and 3: Animal care form and saving
animalForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Clear previous errors
    nameError.textContent = "";
    speciesError.textContent = "";
    noteError.textContent = "";
    formResult.textContent = "";

    // Read and trim values
    const name = animalName.value.trim();
    const species = animalSpecies.value.trim();
    const note = careNote.value.trim();

    // Validate fields
    let isValid = true;

    if (name === "") {
        nameError.textContent = "Please enter the animal name.";
        isValid = false;
    }

    if (species === "") {
        speciesError.textContent = "Please enter the animal species.";
        isValid = false;
    }

    if (note.length === 0 || note.length > 150) {
        noteError.textContent = "Care note must be between 1 and 150 characters.";
        isValid = false;
    }

    // Stop if the form is invalid
    if (!isValid) {
        return;
    }

    // Show the result
    formResult.textContent =
        `Animal added successfully: ${name} (${species}). Note: ${note}`;

    // Create an animal object and save it
    const animal = {
        name: name,
        species: species,
        note: note
    };

    localStorage.setItem("ws05Animal", JSON.stringify(animal));
});

// Exercise 2: Animal sponsorship calculator
const sponsorForm = document.getElementById("sponsorForm");
const animalType = document.getElementById("animalType");
const yearsInput = document.getElementById("years");
const cost = document.getElementById("cost");
const discountMessage = document.getElementById("discountMessage");

sponsorForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Convert input values to numbers
    const annualFee = Number(animalType.value);
    const years = Number(yearsInput.value);

    // Validate years
    if (!Number.isInteger(years) || years <= 0) {
        cost.textContent = "Please enter a positive whole number of years.";
        discountMessage.textContent = "";
        return;
    }

    // Calculate the total price
    let total = annualFee * years;
    let discount = 0;

    // Apply 20% discount for more than 2 years
    if (years > 2) {
        discount = total * 0.20;
        total = total - discount;
        discountMessage.textContent = "20% discount applied!";
    } else {
        discountMessage.textContent = "No discount applied.";
    }

    // Apply an extra €5 discount for 5 years or more
    if (years >= 5) {
        total = total - 5;
        discountMessage.textContent += " Extra €5 discount applied!";
    }

    // Display the final price
    cost.textContent = `Total: €${total.toFixed(2)}`;
});

// Exercise 4: Loading the saved animal
const loadButton = document.getElementById("loadAnimal");
const clearButton = document.getElementById("clearAnimal");
const savedAnimal = document.getElementById("savedAnimal");

function loadAnimal() {
    // Read saved animal data
    const animalData = localStorage.getItem("ws05Animal");

    // Check if data exists
    if (animalData === null) {
        savedAnimal.textContent = "No saved animal yet.";
        return;
    }

    // Convert JSON text into an object
    const animal = JSON.parse(animalData);

    // Display animal details
    savedAnimal.textContent =
        `Name: ${animal.name} | Species: ${animal.species} | Care note: ${animal.note}`;
}

// Load animal when button is clicked
loadButton.addEventListener("click", loadAnimal);

// Clear saved animal
clearButton.addEventListener("click", function () {
    localStorage.removeItem("ws05Animal");
    savedAnimal.textContent = "Saved animal has been cleared.";
});

// Restore saved animal when the page opens
loadAnimal();
