let input = prompt('Choose size of the deck', 18);

// deck of all cards in the game
const deck = document.getElementById("deck");
let num_of_cards = getDeckSize(input);


deck.innerHTML = "";
for (let i = 1; i <= num_of_cards / 2; i++) {
    deck.innerHTML += "<div class=\"card\" id=\"fish" + i + "\"><img class=\"hidden\" draggable=\"false\" src=\"img/" + i + ".JPG\"></div>";
}
deck.innerHTML += deck.innerHTML;

// cards array holds all cards
let cardsList = document.getElementsByClassName("card");
let cards = [...cardsList];

let openedCards = [];
let matchedCards;

let moves;
let counter = document.getElementById("counter");

let second, minute;
let time = document.getElementById("timer");
let timer;

let popup = document.getElementById("popup");

window.onload = startGame();

function displayCard() {
    this.classList.toggle("disabled");
    this.querySelector("img").classList.remove("hidden");
}

function cardOpen() {
    openedCards.push(this);
    if (openedCards.length == 2) {
        addMove();
        if (openedCards[0].id === openedCards[1].id) {
            match();
        } else {
            miss();
        }
    }
}

// add event listener to each card
for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", displayCard);
    cards[i].addEventListener("click", cardOpen);
    cards[i].addEventListener("click", showResult);
}

function startGame() {
    formDeck();

    // initialize variables
    moves = 0;
    minute = 0;
    second = 0;
    openedCards = [];
    matchedCards = [];

    time.innerHTML = minute + " : " + second;
    counter.innerHTML = "0";

    popup.classList.remove("visible");
    popup.classList.add("hidden");

    // Reset the timer
    clearInterval(timer);
}

function formDeck() {
    cards = shuffle(cards);

    deck.innerHTML = "";

    for (let i = 0; i < cards.length; i++) {
        Array.prototype.forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("matched", "disabled");
        cards[i].querySelector("img").classList.add("hidden");
        deck.appendChild(cards[i]);
    }
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

// cards match
function match() {
    openedCards[0].classList.add("matched", "disabled");
    openedCards[1].classList.add("matched", "disabled");
    matchedCards.push(openedCards[0]);
    matchedCards.push(openedCards[1]);
    openedCards = [];
}

// cards don't match
function miss() {
    disableCards();
    setTimeout(function() {
        openedCards[0].querySelector("img").classList.add("hidden");
        openedCards[1].querySelector("img").classList.add("hidden");
        enableCards();
        openedCards = [];
    }, 700);
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

function addMove() {
    moves++;
    counter.innerHTML = moves;
    // start timer on the first move
    if (moves == 1) {
        startTimer();
    }
}

function startTimer() {
    timer = setInterval(function() {
        time.innerHTML = minute + " : " + second;
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
        popup.classList.add("visible");
        document.getElementById("moves").innerHTML = counter.innerHTML;
        document.getElementById("finalTime").innerHTML = time.innerHTML;
        popup.classList.remove("hidden");
    }
}

function getDeckSize(input) {
    let validInput = [4,6,8,10,12,14,16,18];
    return validInput.includes(+input) ? input : 18;
}
