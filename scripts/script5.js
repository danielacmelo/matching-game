// Get references to the sections in the HTML document
const startGameSection = document.getElementById('start-game');
const gameScreenSection = document.getElementById('game-screen');
const winGameSection = document.getElementById('win-game');

// Store the sections in an array for easy iteration
const gameElements = [gameScreenSection, startGameSection, winGameSection];

// Function to toggle the display of sections based on the active section
function toggleSectionDisplay(activeSection) {
    // Iterate through each section
    gameElements.forEach(section => {
        // If the section matches the active section, display it; otherwise, hide it
        section.style.display = section === activeSection ? 'block' : 'none';
    });
}

// By default, display the start game section
toggleSectionDisplay(startGameSection);

// Get references to the start game and end game buttons
const btnStartGame = document.getElementById('btn-start-game');
const btnEndGame = document.getElementById('btn-end-game');

// Event listener for the start game button
btnStartGame.addEventListener('click', () => {
    // When the start game button is clicked, display the game screen section
    toggleSectionDisplay(gameScreenSection);
});

// Event listener for the end game button
btnEndGame.addEventListener('click', () => {
    // When the end game button is clicked, display the start game section
    toggleSectionDisplay(startGameSection);
});

// Array of all dog image filenames
const allDogs = [
    'dog1_AdobeStock_99884104.jpg',
    'dog2_AdobeStock_167618810.jpg',
    'dog3_AdobeStock_202747104.jpg',
    'dog4_AdobeStock_273162497.jpg',
    'dog5_AdobeStock_439003091.jpg',
    'dog6_AdobeStock_322612102.jpg'
];

// Filename for the paw image
const paw = "dogs_paws_AdobeStock_252849218.jpg";

// Container element where the game cards will be displayed
const gameScreen = document.querySelector("#cards-container");

// Array to store matched images
const matchedImages = [];

// Variables to track the first clicked image
let firstImageName = '';
let firstImageIndex = '';

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


// Get reference to the match count element
const matchCountElement = document.getElementById('match-count');

// Function to update and display the match count
function updateMatchCount() {
    matchCountElement.textContent = `Matches: ${matchedImages.length}`;
}

// Get reference to the moves count element
const movesCountElement = document.getElementById('moves-count');
let movesCount = 0; // Initialize moves count

// Function to update and display the moves count
function updateMovesCount() {
    movesCountElement.textContent = `Moves: ${movesCount}`;
}


// // Get reference to the audio element
// const cardAudio = document.getElementById('card-audio');

// // Function to play the card click sound
// function playCardSound() {
//     // Check if the audio is already playing, if so, rewind it to the start
//     if (!cardAudio.paused) {
//         cardAudio.currentTime = 0;
//     }
//     cardAudio.play(); // Play the audio
// }


// Function to handle click event on image cards
function handleClick(imageCard) {
//    // Play the card click sound
//    playCardSound();

    const index = imageCard.dataset.index;
    const imageName = shuffleAllDogs[index];
    imageCard.src = `images/${imageName}`;

    // Check if it's the first image clicked
    if (!firstImageName) {
        firstImageName = imageName;
        firstImageIndex = index;
    } else {
            // Increment moves count
            movesCount++;
            updateMovesCount(); // Update moves count display
    // Check if the second clicked image matches the first one
        if (firstImageName === imageName &&
            firstImageIndex !== index &&
            !matchedImages.includes(imageName)) {
            matchedImages.push(imageName);
            updateMatchCount(); // Update match count after each match
            checkWinCondition(); // Check win condition after each match
        }
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


// Function to check if all images are matched
function checkWinCondition() {
    if (matchedImages.length === allDogs.length) {
        // All images are matched, display the win-game section
        toggleSectionDisplay(winGameSection);
    }
}


// Shuffle the array of dog images
const shuffleAllDogs = shuffleArray(allDogs);

// Create and append image elements to the game screen
for (let i = 0; i < shuffleAllDogs.length; i++) {
    const card = createImageElement(i);
    // Attach click event listener to each image card
    card.addEventListener('click', () => handleClick(card.querySelector('img')));
    gameScreen.appendChild(card);
}

// Select all image cards
const imageCards = document.querySelectorAll('.image-card');


// Event listener for the "Yes" button in the win-game section
document.getElementById('btn-yes').addEventListener('click', () => {
    // Reset the game (hide win-game section, reset matched images, shuffle cards)
    toggleSectionDisplay(startGameSection);
    matchedImages.length = 0; // Clear the matched images array
    updateMatchCount(); // Update the match count display
    shuffleAllDogs = shuffleArray(allDogs); // Reshuffle the cards
    // Reset all card images to the paw image
    imageCards.forEach(card => {
        card.src = `images/${paw}`;
    });
});

// Event listener for the "No" button in the win-game section
document.getElementById('btn-no').addEventListener('click', () => {
    // Hide the win-game section and stay on the same screen
    toggleSectionDisplay(gameScreenSection);
});