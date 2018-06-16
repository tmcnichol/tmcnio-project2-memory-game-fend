// Main Game Variables
const theDeck = document.getElementsByClassName('deck')[0];
const deckList = document.getElementsByClassName('card');//list of cards
const cardList = [];// var for setCardList() function child with classes used to compare cards for match
const movesDisplay = document.querySelector('.moves');//var for # of moves live & modal display
const starsLiParent = document.querySelector('.stars');//var to target stars <ul>
const restartBtn = document.getElementsByClassName('restart')[0];//var to target restart button for event listener
const timerDisplay = document.getElementsByClassName('timer')[0]//var to target timer display

let starsList = starsLiParent.getElementsByClassName('fa'); //var to control # of star displayed live
let matchList = document.getElementsByClassName('match'); //var to determine if game finished
let starCounter = 5; // var to display star score on modal
let openedCards; //variable to store and compare cards
let numberOfMoves = 0;//var to count # of moves
let m = 0; // minutes variable
let s = 0; // seconds variable

// Modal Variables:
const modal = document.getElementsByClassName('modal')[0];
const closeBtn = document.getElementsByClassName('close-button')[0];
const playAgainBtn = document.getElementsByClassName('play-again-button')[0];

initializeGame();
setCardList();
doShuffle();

function initializeGame () {
 // initialize eventListerners
  window.addEventListener('click', showFinalScore);
  playAgainBtn.addEventListener('click', resetBoard);
  closeBtn.addEventListener('click', closeModal);
  restartBtn.addEventListener('click', resetBoard);
  starRating();
	numberOfMoves = 0;
	movesDisplay.textContent = numberOfMoves;
  for (let i = 0; i < deckList.length; i++) {
			deckList[i].addEventListener('click', movesCounter);
			deckList[i].addEventListener('click', clicked);
      deckList[i].addEventListener('click', movesCounter);
			deckList[i].className = "card";
	}
}

function setCardList (){
  for (let i = 0; i < deckList.length; i++) {
    cardList.push(deckList[i].getElementsByClassName('fa')[0].className);
  }
}
//[0] will return a DOM element for the <i> within the <li> and pushing the className

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

function doShuffle() {
  	shuffle(cardList);
  	for (let i = 0; i < deckList.length; i++) {
      deckList[i].getElementsByClassName('fa')[0].className = cardList[i];
    }
}

function resetBoard () {
  	initializeGame();
    doShuffle();
  	resetStars();
  	closeModal();
    clearTimer();
}

var timer = setInterval(advanceTimer, 1000);
clearInterval(timer);

function advanceTimer() {
    s++;
		if (s == 60) {
			m++;
			s = 00;
		}
		if (s < 10) {
			timerDisplay.textContent = m +':0'+ s;
		}	else {
			timerDisplay.textContent = m +':'+ s;
    }
  }

function clearTimer() {
    clearInterval(timer);
    s = 0;
    m = 0;
    timer = setInterval(advanceTimer, 1000);
}

function startTimer() {
    timer = setInterval(advanceTimer, 1000);
    advanceTimer();
    theDeck.removeEventListener('click', startTimer);
}

theDeck.addEventListener('click', startTimer);

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

function clicked(evt){  //function for event listener to flip and compare cards

  let cardClicked = evt.target;

	if (openedCards == null) { //show 1st of two cards for match
  		openCard(evt);
  		openedCards = cardClicked;
	} else if (cardClicked.innerHTML == openedCards.innerHTML) {    //if 2nd is match, show, set and lock both cards as match
  			matchCard(evt);
  			openedCards = null;
		} else { // if 2nd card not match, show both cards for a moment, then hide 1st and 2nd card
  			cardClicked.classList.add('show', 'open');
  			setTimeout(function () {
  				openedCards.classList.remove('show', 'open');
  				openedCards.addEventListener('click', clicked);
  				cardClicked.classList.remove('show', 'open');
  				cardClicked.addEventListener('click', clicked);
  				openedCards = null;}, 300);
		  }
}

function movesCounter (evt) {

    let cardClicked = evt.target;

    if (cardClicked.className == 'card') {
      numberOfMoves++;
    	movesDisplay.textContent = numberOfMoves;
    	starRating();
    }
}

//Function to reduce number of stars showing as the # of moves increases
function starRating() {
  	if (numberOfMoves == 20) {
  		starsLiParent.getElementsByTagName('i')[0].className = "fa";
      starCounter--;
  	} else if (numberOfMoves == 28) {
  		starsLiParent.getElementsByTagName('i')[1].className = "fa";
      starCounter--;
  	}	else if (numberOfMoves == 38) {
  		starsLiParent.getElementsByTagName('i')[2].className = "fa";
      starCounter--;
  	} else if (numberOfMoves == 48) {
  		starsLiParent.getElementsByTagName('i')[3].className = "fa";
      starCounter--;
  	}
}

function resetStars() {
  	for (let i = 0; i < starsList.length; i++) {
  			starsList[i].classList.add('fa-star');
  		}
}

function openModal() {
		modal.style.display = 'block';
}

function closeModal() {
	  modal.style.display = 'none';
    initializeGame();
}

//Function to display finals scores modal after player wins
function showFinalScore() {
  	document.getElementsByClassName('stats-stars')[0].textContent = starCounter + " of 5";
  	document.getElementsByClassName('stats-moves')[0].textContent = numberOfMoves;
  	document.getElementsByClassName('stats-time')[0].textContent = m +' m '+ s +' s';
  	if (matchList.length == 16) {
  		openModal();
  	}
}
