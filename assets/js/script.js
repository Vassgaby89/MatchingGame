let rows = 2
let columns = 5
const gameboard = document.querySelectorAll("#gameboard");
const music = document.getElementById("relax");
music.volume = 0.1;
let actualCard = ''
let actualCardValue = ''
let foundPairs = 0
counter = document.querySelectorAll('.counter')
let clockIsRunning = false
const message = document.querySelector('.message')
let clicks = 0
let clickCounter = 0
let startTime = new Date();
let seconds = 0
let minutes = 0

//Initialize the cards
const initCards = () => {
    allCards = [] //generate all of the cards
    cardSymbols = ['clubs', 'diamonds', 'hearts', 'spades']
    cardRanks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace']
    for (let i = 0; i < cardSymbols.length; i++) {
        for (let j = 0; j < cardRanks.length; j++) {
            let newCard = `${cardSymbols[i]}-${cardRanks[j]}`
            allCards.push(newCard)
        }
    }
    const numberOfCards = (rows * columns) / 2 //choose cards random to play with
    playCards = []
    for (let i = 0; i < numberOfCards; i++) {
        const random = Math.round(Math.random() * (allCards.length - 1));
        playCards[i] = allCards[random]
        playCards[i + numberOfCards] = allCards[random]
        allCards.splice(random, 1)
    }
    return playCards
}

//Initialize tha gameboard
const initGameboard = () => {
    const playCards = initCards()
    for (let i = 0; i < rows; i++) {
        gameboard[0].innerHTML += `<tr id="row${i+1}">`
        for (let j = 0; j < columns; j++) {
            const row = document.querySelectorAll(`#row${i+1}`);
            const random = Math.round(Math.random() * (playCards.length - 1))
            row[0].innerHTML += `<td class="card"><div class="card-inner"><div class="back"><img src="./img/t360.png" width="100%" alt="T360 logo"></div><div class="front"><img src="./img/cards/${playCards[random]}.png" width="100%" alt="${playCards[random]}"></div></div></td>`
            playCards.splice(random, 1)
        }
        gameboard[0].innerHTML += '</tr>'
    }
}

const addClickListener = () => {
    cards = document.querySelectorAll(".back");
    for (let i = 0; i < cards.length; i += 1) {
        cards[i].addEventListener('click', turnCards)
    }
}

const removeClickListener = () => {
    for (let i = 0; i < cards.length; i += 1) {
        cards[i].removeEventListener('click', turnCards)
    }
}

const newGame = () => {
    let clearCards = document.querySelectorAll(".front");
    if (clearCards) {
        for (let i = 0; i < length.clearCards; i++) {
            clearCards[i].parentElement.style = 'transform: rotateX(0deg)'
        }
    }
    message.innerHTML = 'Get ready!'
    setTimeout(() => {
        clockIsRunning = true
        timeCounter()
        startTime = new Date()
        clicks = 0
        clickCounter = document.querySelector(".clickCounter");
        clickCounter.innerHTML = clicks
        message.innerHTML = 'Go! Try again!'
        initCards()
        gameboard[0].innerHTML = '' //clear game board
        initGameboard()
        addClickListener()
        foundPairs = 0
    }, 2000)
}

//turn up a card and check end of game
const turnCards = (event) => {
    if (!clockIsRunning) {
        clockIsRunning = true;
        /*startTime.setMinutes(0);
        startTime.setSeconds(0);
        startTime.setMilliseconds(0);*/
        timeCounter();
        message.innerHTML = 'Go on!'
    }

    if (actualCardValue == '') { //if this is the 1. card, we save it
        event.target.parentElement.parentElement.style = 'transform: rotateX(180deg)'
        actualCard = event.target
        actualCardValue = event.target.parentElement.parentElement.children[1].children[0].alt
    } else { //if this is the 2. card and if they're not pairs, turn back
        event.target.parentElement.parentElement.style = 'transform: rotateX(180deg)'
        if (actualCardValue === event.target.parentElement.parentElement.children[1].children[0].alt) {
            foundPairs += 2
            if (foundPairs === rows * columns) {
                clockIsRunning = false
                removeClickListener()
                message.innerHTML = `Congratulation! You found all the <span style="color:red">${rows*columns/2} pairs </span>in <span style="color:red">${clicks+1} steps</span> under <span style="color:red">${Math.floor(startTime.getMinutes())}:${Math.floor(startTime.getSeconds()-1)}</span> !`
                setTimeout(() => {
                    newGame()
                }, 5000)
            }
        } else {
            setTimeout(() => {
                event.target.parentElement.parentElement.style = 'transform: rotateX(0deg)'
                actualCard.parentElement.parentElement.style = 'transform: rotateX(0deg)'
                actualCardValue = ''
            }, 750)
        }
        actualCardValue = ''
        clicks++
        clickCounter = document.querySelector(".clickCounter");
        clickCounter.innerHTML = clicks
    }
}

const timeCounter = () => {
    if (clockIsRunning) {

        let now = new Date()
        let suspendedTime = now - startTime
        minutes = parseInt(suspendedTime / 1000 / 60)
        if (minutes > 0) {
            seconds = parseInt(suspendedTime / 1000) - (minutes * 60)
        } else {
            seconds = parseInt(suspendedTime / 1000)
        }

        counter[0].innerHTML = `${minutes.toString().padStart(2,0)}: 
    ${seconds.toString().padStart(2,0)}`

        setTimeout(timeCounter, 1000)

    }
    return startTime
}

const startGame = () => {
    initCards()
    initGameboard()
    let cards = document.querySelectorAll(".back");
    addClickListener()

}

startGame()

const newGameBtn = document.querySelector("#newGameBtn")
const difficultyList = document.querySelector("#difficulty")

newGameBtn.onclick = () => {
    switch (difficultyList.value) {
        case '1': {
            rows = 2;
            columns = 5
        }
        break;
    case '2': {
        rows = 3;
        columns = 6
    }
    break;
    case '3': {
        rows = 3;
        columns = 7
    }
    break;
    case '4': {
        rows = 3;
        columns = 8
    }
    break;
    case '5': {
        rows = 4;
        columns = 8
    }
    break;
    case '6': {
        rows = 5;
        columns = 8
    }
    break;
    default: {
        rows = 2;
        columns = 5
    }
    break;
    }
    newGame()
}