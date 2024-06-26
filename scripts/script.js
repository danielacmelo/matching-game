// Get references to the sections in the HTML document
const startGameSection = document.getElementById('start-game');
const gameScreenSection = document.getElementById('game-screen');
const winGamePopUp = document.getElementById('win-game');

// Get references to the start game and end game buttons
const btnStartGame = document.getElementById('btn-start-game');
const btnEndGame = document.getElementById('btn-end-game');

// Get reference to the match count element
const matchCountElement = document.getElementById('match-count');

// Get reference to the moves count element
const movesCountElement = document.getElementById('moves-count');
let movesCount = 0; // Initialize moves count

// Get reference to the update opacity and image 
const containerOpacity = document.getElementById('container-opacity');
const pawsTrail = document.getElementById('paws-trail2');


// Variables to track the first clicked image
let firstImageName = '';
let firstImageIndex = '';


// Array of all dog image filenames
const allDogs = [
    'dachshund.jpg',
    'heartshapedmark.jpg',
    'corgi.jpg',
    'cockerspaniel.jpg',
    'cardiganwelshcorgi.jpg',
    'jackrussell.jpg'
];

// Filename for the paw image
const paw = "dogs_paws_AdobeStock_252849218.jpg";

// Store the sections in an array for easy iteration
const gameElements = [gameScreenSection, startGameSection, winGamePopUp];

// Function to toggle the display of sections based on the active section
function toggleSectionDisplay(activeSection) {
    // Iterate through each section
    gameElements.forEach(section => {
        // If the section matches the active section, display it; otherwise, hide it
        section.style.display = section === activeSection ? 'block' : 'none';
        winGamePopUp.style.display = 'none'; 
    });
}

// By default, display the start game section
toggleSectionDisplay(startGameSection);

// Event listener for the start game button
btnStartGame.addEventListener('click', () => {
    // When the start game button is clicked, display the game screen section
    toggleSectionDisplay(gameScreenSection);
    btnEndGame.style.display = 'block';
    containerOpacity.style.opacity = '1';
    pawsTrail.style.display = 'none';
});

// Event listener for the end game button
btnEndGame.addEventListener('click', () => {
    // When the end game button is clicked, display the start game section
    toggleSectionDisplay(startGameSection);
});

// Event listener for the "Yes" button in the win-game section
document.getElementById('btn-yes').addEventListener('click', () => {

    resetGameVars();
    // Reset the game (hide win-game section, reset matched images, shuffle cards)
    toggleSectionDisplay(startGameSection);
    updateMatchCount(); // Update the match count display
    updateMovesCount(); // Upate moves count display
    shuffleAllDogs = shuffleArray(allDogs); // Reshuffle the cards
    // Reset all card images to the paw image
    imageCards.forEach(card => {
        card.src = `images/${paw}`;
    });
});

// Event listener for the "No" button in the win-game section
document.getElementById('btn-no').addEventListener('click', () => {
    return;
});

// Container element where the game cards will be displayed
const gameScreen = document.querySelector("#cards-container");

// Array to store matched images
let matchedImages = [];

// Function to shuffle an array
function shuffleArray(array) {
    return array.concat(array).sort(() => Math.random() - 0.5);
}

// Function to create an image element with the given index
function createImageElement(index) {
    const div = document.createElement('div');
    const img = document.createElement('img');
    img.classList.add('image-card');
    img.dataset.index = index;
    img.src = `images/${paw}`;
    div.appendChild(img);
    return div;
}


// Function to update and display the match count
function updateMatchCount() {
    matchCountElement.textContent = `Matches: ${matchedImages.length}`;
}

// Function to update and display the moves count
function updateMovesCount() {
    movesCountElement.textContent = `Moves: ${movesCount}`;
}

// Function to handle click event on image cards
function handleClick(imageCard) {
    const index = imageCard.dataset.index;
    const imageName = shuffleAllDogs[index];

    // Image previously matched
    if(matchedImages.includes(imageName)) {
        return;
    }

    // Image clicked twice
    if(index === firstImageIndex) {
        return;
    }
    
    imageCard.src = `images/${imageName}`;

    // Check if it's the first image clicked
    if (!firstImageName) {
        firstImageName = imageName;
        firstImageIndex = index;
    } else {
    // Check if the second clicked image matches the first one
        if (firstImageName === imageName &&
            firstImageIndex !== index &&
            !matchedImages.includes(imageName)) {
            matchedImages.push(imageName);
            updateMatchCount(); // Update match count after each match
            checkWinCondition(); // Check win condition after each match
        }

        // Increment moves count after the second card is revealed
        movesCount++;
        updateMovesCount(); // Update moves count display

        firstImageName = ""; // Reset variables for the next pair
        firstImageIndex = "";
        clearImages(); // Clear images after a short delay
    }
}

// Function to clear unmatched images after a delay
function clearImages() {
    setTimeout(() => {
        for (let imageCard of imageCards) {
            const index = imageCard.dataset.index;
            const imageName = shuffleAllDogs[index];
            if (!matchedImages.includes(imageName)) {
                imageCard.src = `images/${paw}`;
            }
        }
    }, 500);
}

// Function to reset game variables
function resetGameVars() {
    shuffleAllDogs = [];
    matchedImages = [];
    movesCount = 0;
    firstImageName = '';
    firstImageIndex = '';
}

// Function to check if all images are matched
function checkWinCondition() {
    if (matchedImages.length === allDogs.length) {
        // All images are matched, display the win-game pop-up
        winGamePopUp.style.display = 'block';
        btnEndGame.style.display = 'none';
        containerOpacity.style.opacity = '0.5';
        pawsTrail.style.display = 'block'
    }
}

// Shuffle the array of dog images
let shuffleAllDogs = shuffleArray(allDogs);

// Create and append image elements to the game screen
for (let i = 0; i < shuffleAllDogs.length; i++) {
    const card = createImageElement(i);
    // Attach click event listener to each image card
    card.addEventListener('click', () => handleClick(card.querySelector('img')));
    gameScreen.appendChild(card);
}

// Select all image cards
const imageCards = document.querySelectorAll('.image-card');