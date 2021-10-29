const dictionary = [
    'hola', 'esto', 'es', 'o', 'son', 'palabras', 'de', 'prueba', 'para', 'el', 'test', 'de', 'velocidad', 'bren', 'purri', 'jose', 'jet', 'sopita'
];

let speedTestArea = document.getElementById('speedTest');
let timerElement = document.getElementById('timer');

let matrix = [];
let totalWords = 50;
let maxLetterError = 20;
let currentWord = 0;
let currentLetter = 0;
let timeLeft = 30;
let interval = undefined;

const init = (refresh = false) => {
    currentWord = 0;
    currentLetter = 0;
    totalWords = 50;
    matrix = [];
    speedTestArea.innerHTML = '';

    for(var index = 0; index < totalWords; index++) {
        let word = dictionary[ Math.floor( Math.random() * dictionary.length ) ];
        let letters = word.split('');

        matrix[index] = word;
        let wordHtml = document.createElement('div');
        wordHtml.classList.add('word');
        wordHtml.id = `word-${index}`;

        for(var x = 0; x < letters.length; x++) {
            let letter = letters[x];

            matrix[index][x] = letter;

            let letterHtml = document.createElement('span');
            letterHtml.id = index + "-" + x;    
            letterHtml.innerText = letter;

            wordHtml.appendChild(letterHtml);
        }

        speedTestArea.appendChild(wordHtml);
        let space = document.createElement('span');
        space.innerText = ' ';

        speedTestArea.appendChild(space);
    }

    if(refresh) restartTimer();
}

const restartTimer = () => {
    timeLeft = 30;
    timerElement.innerText = '';
    clearInterval(interval);
}

const startTimer = () => {
    interval = setInterval(() => {
        timerElement.innerText = timeLeft;

        timeLeft--;

        if(timeLeft == 0) {
            clearInterval(interval)
            timerElement.innerText = '';
            return;
        }
    }, 1000);
}

init();

//Infinite refresh
document.getElementById('refresh').addEventListener('click', event => init(true));

document.addEventListener('keyup', event => {
    if(currentWord == 0 && currentLetter == 0) startTimer();

    let key = event.key;
    let letter = document.getElementById(`${currentWord}-${currentLetter}`);

    if(event.keyCode == 32) {
        currentWord++;
        currentLetter = 0;
        return;
    }

    if(matrix[currentWord].length <= currentLetter) {
        currentLetter++;
        let wordContainer = document.getElementById(`word-${currentWord}`);

        let errors = currentLetter - matrix[currentWord].length;

        if(errors >= 20) return;

        let newLetter = document.createElement('span');
        newLetter.classList.add('horrible');
        newLetter.innerText = key;

        wordContainer.appendChild(newLetter);
        return;
    } 

    if(matrix[currentWord][currentLetter] == key) {
        letter.classList.add('fine');
        currentLetter++;
    }
    else {
        letter.classList.add('bad');
        currentLetter;
    }
})
