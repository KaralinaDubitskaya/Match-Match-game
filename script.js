// deck of all cards in the game
const deck = document.getElementById("deck");
const num_of_cards = 16;


deck.innerHTML = "";
for (let i = 1; i <= num_of_cards / 2; i++) {
    deck.innerHTML += "<div class=\"card\" type=\"fish_" + i + "\"><img src=\"img/" + i + ".JPG\"></div>";
}
deck.innerHTML += deck.innerHTML;

// cards array holds all cards
let cardsList = document.getElementsByClassName("card");
let cards = [...card]

let openedCards;
let matchedCards;

let moves;
let counter = document.getElementById("counter");

let second, minute;
let time = document.getElementById("timer");
let timer;

let popup = document.getElementById("popup");

// add event listener to each card
for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", displayCard);
    cards[i].addEventListener("click", cardOpen);
    cards[i].addEventListener("click", showResult);
}

window.onload = startGame();


function startGame() {
    formDeck();

    // initialize variables
    moves = 0;
    minute = 0;
    second = 0;
    openedCards = [];
    matchedCards = [];

    timer.innerHTML = "Time: " + minute + ":" + second;
    counter.innerHTML = "Count: 0";

    // Reset the timer
    clearInterval(timer);
}

function formDeck() {
    cards = shuffle(cards);

    deck.innerHTML = "";

    for (var i = 0; i < cards.length; i++) {
        Array.prototype.forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "matched", "disabled");
        deck.appendChild(card);
    }
}

// toggles open, show and disabled classes on click
var displayCard = function() {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
}

// Fisher-Yates Shuffle
function shuffle(array) {
    let counter = array.length;

    // while there are elements in the array
    while (counter > 0) {
        // random index
        let index = Math.floor(Math.random() * counter);
        counter--;

        // swap the last element with selected
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

function cardOpen() {
    openedCards.push(this);
    if (openedCards.length === 2) {
        addMove();
        if (openedCards[0].type === openedCards[1].type) {
            match();
        } else {
            miss();
        }
    }
}

// cards match
function match() {
    openedCards[0].classList.add("matched", "disabled");
    openedCards[1].classList.add("matched", "disabled");
    openedCards[0].classList.remove("show", "open");
    openedCards[1].classList.remove("show", "open");
    matchedCards.add(openedCards[0]);
    matchedCards.add(openedCards[1]);
    openedCards = [];
}

// cards don't match
function miss() {
    disableCards();
    setTimeout(function() {
        openedCards[0].classList.remove("show", "open");
        openedCards[1].classList.remove("show", "open");
        enableCards();
        openedCards = [];
    }, 1000);
}

function disableCards() {
    cards.forEach(card => {
        card.classList.add("disabled");
    });
}

function enableCards() {
    cards.forEach(card => {
        if (!matchedCards.includes(card)) {
            card.classList.remove("disabled");
        }
    });
}

function addMoves() {
    moves++;
    counter.innerHTML = "Moves: " + moves;
    // start timer on the first move
    if (moves == 1) {
        startTimer();
    }
}

function startTimer() {
    timer = setInterval(function() {
        time.innerHTML = "Time: " + minute + ":" + second;
        second++;

        if (second == 60) {
            minute++;
            second = 0;
        }

        if (minute == 60) {
            minute = 0;
        }
    }, 1000);
}

function showResult() {
    if (matchedCards.length == num_of_cards) {
        clearInterval(timer);

        popup.classList.add("show");
        document.getElementById("moves").innerHTML = counter.innerHTML;
        document.getElementById("finalTime").innerHTML = time.innerHTML;
    }
}

function playAgain() {
    popup.classList.remove("show");
    startGame();
}