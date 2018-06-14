/*
 * Create a list that holds all of your cards
 */
const deckList = document.getElementsByClassName('card');
const cardList = [];
const movesDisplay = document.querySelector('.moves');
const starsDisplay = document.querySelector('.stars');
let starsList = starsDisplay.getElementsByClassName('fa');
let matchList = document.getElementsByClassName('match');
let starCounter = document.getElementsByClassName('fa-star').length;
let numberOfMoves = 0;

let m = 0;
let s = 0;

// Modal Variables:
const modal = document.getElementsByClassName('modal')[0];
const closeBtn = document.getElementsByClassName('close-button')[0];
const playAgainBtn = document.getElementsByClassName('play-again-button')[0];

document.getElementsByClassName('restart')[0].addEventListener('click', resetBoard); //Event listener to startover

initializeGame();
setCardList();
doShuffle();

function openModal() {
		modal.style.display = 'block';
		closeBtn.addEventListener('click', closeModal);
	}

function closeModal() {
	modal.style.display = 'none';
	console.log('closed modal');
}

function finalScore() {
	document.getElementsByClassName('stats-stars')[0].textContent = starCounter + " of 5";
	document.getElementsByClassName('stats-moves')[0].textContent = numberOfMoves;
	document.getElementsByClassName('stats-time')[0].textContent = m +' m '+ s +' s';
	if (matchList.length == 16) {
		openModal();
		console.log('matchList Test')
	}
}

function initializeGame () {
 // initialize eventListerners
	resetTimer();
	starRating();
	numberOfMoves = 0;
	movesDisplay.textContent = numberOfMoves;
	for (let i = 0; i < deckList.length; i++) {
			deckList[i].addEventListener('click', movesCounter);
			deckList[i].addEventListener('click', clicked);
			deckList[i].className = "card";
	window.addEventListener('click', finalScore);
	playAgainBtn.addEventListener('click', resetBoard);


//'Click' event listener for each card
	}
}

function doShuffle() {
	shuffle(cardList);
	for (let i = 0; i < deckList.length; i++) {
	deckList[i].getElementsByClassName('fa')[0].className = cardList[i];
}
}

function resetBoard () {
	// reset scoring
	// reset card eventlisteners and card UI (initial css classes)
	initializeGame();
	// shuffle (ie calling shuffle function and assign cards to HTML)
	doShuffle();
	resetStars();
	closeModal();
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {

    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

		return array;
}

let openedCards; //variable to store and compare cards

function openCard(evt) {
	evt.target.classList.add('show', 'open');
	evt.target.removeEventListener('click', clicked);
}

function matchCard(evt) {
	openedCards.classList.remove('show', 'open');
	openedCards.classList.add('match');
	evt.target.classList.add('match');
	evt.target.removeEventListener('click', clicked);
}

function movesCounter () {

	numberOfMoves++;
	movesDisplay.textContent = numberOfMoves;
	starRating();
}

function starRating() {
	if (numberOfMoves == 20) {
		starsDisplay.getElementsByTagName('i')[0].className = "fa";
		console.log('lost one star');
	} else if (numberOfMoves == 28) {
		starsDisplay.getElementsByTagName('i')[1].className = "fa";
	}	else if (numberOfMoves == 38) {
		starsDisplay.getElementsByTagName('i')[2].className = "fa";
	} else if (numberOfMoves == 48) {
		starsDisplay.getElementsByTagName('i')[3].className = "fa";
	}
}

function resetStars() {
	for (let i = 0; i < starsList.length; i++) {
			starsList[i].classList.add('fa-star');
		}
}

var timerVar = setInterval(startTimer, 1000);
function startTimer() {
		s++;
		if (s == 60) {
			m++;
			s = 00;
		}
		if (s < 10) {
			document.getElementsByClassName('timer')[0].textContent = m +':0'+ s;
		}	else {
			document.getElementsByClassName('timer')[0].textContent = m +':'+ s;}
		}


function resetTimer() {
	m = 0;
	s = -1;
	startTimer();
}

function clicked(evt){  //function to execute for 'click' event listener
	let cardClicked = evt.target;
	if (openedCards == null) {
		openCard(evt);
		openedCards = evt.target;
	} else if (evt.target.innerHTML == openedCards.innerHTML) {
			matchCard(evt);
			openedCards = null;
		} else {
			evt.target.classList.add('show', 'open');
			setTimeout(function () {
				openedCards.classList.remove('show', 'open');
				openedCards.addEventListener('click', clicked);
				cardClicked.classList.remove('show', 'open');
				cardClicked.addEventListener('click', clicked);
				openedCards = null;}, 300);
		}
}

function setCardList (){
for (let i = 0; i < deckList.length; i++) {	cardList.push(deckList[i].getElementsByClassName('fa')[0].className);
	}
}
//[0] will return a DOM element for the <i> within the <li> and pushing the className
