"use strict";

// ==========================================
// EXAMPLE: SHOW / HIDE ANIMAL TABLE
// ==========================================

const animalButton = document.querySelector("#animalButton");
const animalTable = document.querySelector("#animalTable");

animalButton.addEventListener("click", function () {
    animalTable.hidden = !animalTable.hidden;
});

// ==========================================
// TASK 1: CHANGING CONTENT
// ==========================================

const taskOneHeading = document.querySelector("#taskOneHeading");
const changeHeadingButton = document.querySelector("#changeHeadingButton");
const changeStyleButton = document.querySelector("#changeStyleButton");
const changeTextButton = document.querySelector("#changeTextButton");
const animalText = document.querySelector("#animalText");

changeHeadingButton.addEventListener("click", function () {
    taskOneHeading.textContent = "Updated heading!";
});

changeStyleButton.addEventListener("click", function () {
    taskOneHeading.classList.toggle("highlight");
});

changeTextButton.addEventListener("click", function () {
    animalText.textContent =
        "Elephants are the world's largest land animals.";
});

// BONUS: Add another sentence without replacing existing text

const addFactButton = document.createElement("button");
addFactButton.textContent = "Add animal fact";
addFactButton.type = "button";
animalText.insertAdjacentElement("afterend", addFactButton);

addFactButton.addEventListener("click", function () {
    if (!animalText.dataset.factAdded) {
        animalText.textContent +=
            " Elephants use their trunks to smell, drink and pick up objects.";
        animalText.dataset.factAdded = "true";
    }
});

// BONUS: Change the page background

const backgroundButton = document.createElement("button");
backgroundButton.textContent = "Change background colour";
backgroundButton.type = "button";
document.querySelector("header").append(backgroundButton);

backgroundButton.addEventListener("click", function () {
    document.body.classList.toggle("alternate-background");
});

// ==========================================
// TASK 2: CREATE ELEMENTS WITH JAVASCRIPT
// ==========================================

const animalContent = document.querySelector("#animalContent");

const animalHeading = document.createElement("h3");
animalHeading.textContent = "Animal of the Day";
animalHeading.classList.add("animal-heading");

const animalParagraph = document.createElement("p");
animalParagraph.textContent =
    "Giant pandas mainly eat bamboo and are excellent climbers.";

const dailyAnimalImage = document.createElement("img");
dailyAnimalImage.src =
    "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=600";
dailyAnimalImage.alt = "Giant panda";

animalContent.append(animalHeading, animalParagraph, dailyAnimalImage);

// Show / hide the animal content

const hideAnimalButton = document.querySelector("#hideAnimalButton");
const showAnimalButton = document.querySelector("#showAnimalButton");

hideAnimalButton.addEventListener("click", function () {
    animalContent.hidden = true;
});

showAnimalButton.addEventListener("click", function () {
    animalContent.hidden = false;
});

// ==========================================
// TASK 3: SELECTING AN ANIMAL
// ==========================================

const animalSelect = document.querySelector("#animalSelect");
const animalName = document.querySelector("#animalName");
const animalImage = document.querySelector("#animalImage");
const animalDescription = document.querySelector("#animalDescription");

const animals = {
    elephant: {
        name: "Elephant",
        image: "images/elephant.png",
        description: "Elephants are the world's largest land animals."
    },

    tiger: {
        name: "Tiger",
        image: "images/tiger.png",
        description: "Tigers are large cats with distinctive stripes."
    },

    penguin: {
        name: "Penguin",
        image: "images/penguin.png",
        description: "Penguins are flightless birds and excellent swimmers."
    },

    panda: {
        name: "Panda",
        image: "images/panda.png",
        description: "Giant pandas mainly eat bamboo."
    }
};

animalSelect.addEventListener("change", function () {
    const selectedAnimal = animals[animalSelect.value];

    if (!selectedAnimal) {
        return;
    }

    animalName.textContent = selectedAnimal.name;
    animalImage.src = selectedAnimal.image;
    animalImage.alt = selectedAnimal.name;
    animalDescription.textContent = selectedAnimal.description;

    // If an image was previously faded, restore its opacity.
    animalImage.classList.remove("image-faded");
});

animalImage.addEventListener("mouseenter", function () {
    animalImage.classList.add("image-highlight");
});

animalImage.addEventListener("mouseleave", function () {
    animalImage.classList.remove("image-highlight");
});

// ==========================================
// TASK 4: ADD ANIMAL OBSERVATIONS
// ==========================================

const animalForm = document.querySelector("#animalForm");
const observationAnimal = document.querySelector("#observationAnimal");
const observationLocation = document.querySelector("#observationLocation");
const observationDate = document.querySelector("#observationDate");
const observationTableBody =
    document.querySelector("#observationTableBody");

// Add a fourth heading for the bonus remove buttons.

const actionHeading = document.createElement("th");
actionHeading.textContent = "Action";
document.querySelector("#observationTable thead tr").append(actionHeading);

// Function to add a remove button to a table row.

function addRemoveButton(row) {
    const actionCell = document.createElement("td");
    const removeButton = document.createElement("button");

    removeButton.textContent = "Remove";
    removeButton.type = "button";

    removeButton.addEventListener("click", function () {
        row.remove();
    });

    actionCell.append(removeButton);
    row.append(actionCell);
}

// Add remove buttons to the two example rows already in the HTML.

observationTableBody.querySelectorAll("tr").forEach(function (row) {
    addRemoveButton(row);
});

// Listen for form submission.

animalForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const animal = observationAnimal.value.trim();
    const location = observationLocation.value.trim();
    const date = observationDate.value;

    if (!animal || !location || !date) {
        alert("Please complete all three fields.");
        return;
    }

    const row = document.createElement("tr");

    [animal, location, date].forEach(function (value) {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.append(cell);
    });

    addRemoveButton(row);
    observationTableBody.append(row);

    animalForm.reset();
});

// ==========================================
// BONUS: IMAGE CONTROLS
// ==========================================

const imageTools = document.createElement("div");
imageTools.classList.add("buttons");

const moveButton = document.createElement("button");
moveButton.textContent = "Move image";
moveButton.type = "button";

const animateButton = document.createElement("button");
animateButton.textContent = "Animate image";
animateButton.type = "button";

const fadeButton = document.createElement("button");
fadeButton.textContent = "Fade image";
fadeButton.type = "button";

const removeImageButton = document.createElement("button");
removeImageButton.textContent = "Remove image";
removeImageButton.type = "button";

imageTools.append(
    moveButton,
    animateButton,
    fadeButton,
    removeImageButton
);

document.querySelector("#selectedAnimal").append(imageTools);

moveButton.addEventListener("click", function () {
    animalImage.classList.toggle("image-moved");
});

animateButton.addEventListener("click", function () {
    animalImage.classList.remove("image-faded");
    animalImage.classList.toggle("image-animated");
});

fadeButton.addEventListener("click", function () {
    animalImage.classList.toggle("image-faded");
});

removeImageButton.addEventListener("click", function () {
    animalImage.remove();
});

// ==========================================
// BONUS: HIGHLIGHT ALL LIST ITEMS ON HOVER
// ==========================================

document.querySelectorAll("li").forEach(function (item) {
    item.addEventListener("mouseenter", function () {
        item.classList.add("list-highlight");
    });

    item.addEventListener("mouseleave", function () {
        item.classList.remove("list-highlight");
    });
});
