window.addEventListener('load', init);

//global

//available levels
const levels = {
    easy: 5,
    medium: 3,
    hard: 1
}

//to change level
const currentLevel = levels.hard;

let time = currentLevel;
let score = 0;
let isPlaying;

const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

const words = [
    "possibly", "chair", "slipped", "map", "blood", "vessels", "new", "pile", "weight", "chance",
    "exact", "government", "unhappy", "paper", "art", "alphabet", "outside", "single", "facing", "sing",
    "swung", "prevent", "thank", "shout", "mind", "atmosphere", "respect", "supper", "printed", "mass",
    "recent", "shelf", "which", "third", "production", "attached", "slight", "twice", "through", "nation",
    "choice", "smell", "dried", "port", "flow", "halfway", "meal", "valley", "made", "noise",
    "thus", "capital", "cut", "molecular", "closely", "although", "modern", "amount", "cannot", "duck",
    "plus", "directly", "either", "kind", "anyone", "pole", "heat", "happened", "station", "characteristic",
    "board", "sky", "little", "palace", "wild", "kept", "wonderful", "birthday", "belong", "depth",
    "bare", "hearing", "arrive", "which", "milk", "tiny", "term", "perfect", "put", "milk",
    "me", "later", "impossible", "no", "arrangement", "forget", "shoot", "information", "completely", "planned",
    "bottom", "wash", "cowboy", "harder", "opinion", "song", "common", "upper", "treated", "president",
];

//initialize game
function init() {
    //show number of seconds in UI
    seconds.innerHTML = currentLevel;
    //load word from array
    showWord(words);
    //start matching on word input
    wordInput.addEventListener('input', startMatch);
    //call countdown, evey second
    setInterval(countdown, 1000);
    //check game status
    setInterval(checkStatus, 50);
}

//start match
function startMatch() {
    if (matchWords()) {
        isPlaying = true;
        //set time to one above initial time, to allow for page load
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = '';
        score++;

        if (score === -1) {
            scoreDisplay.innerHTML = 0;
        }
        scoreDisplay.innerHTML = score;
    }
}

//match currentword to wordinput
function matchWords() {
    if (wordInput.value === currentWord.innerHTML) {
        message.innerHTML = 'Correct :)';
        return true;
    } else {
        message.innerHTML = '';
        return false;
    }
}

//pick and show random word
function showWord(words) {
    //generate random array index
    const randIndex = Math.floor(Math.random() * words.length);
    //output random word
    currentWord.innerHTML = words[randIndex];
}

//condown timer
function countdown() {
    if (time > 0) {
        //decrement
        time--;
    } else if (time === 0) {
        //game over
        isPlaying = false;
    }

    //show time
    timeDisplay.innerHTML = time;
}

//check game status
function checkStatus() {
    if (!isPlaying && time === 0) {
        message.innerHTML = 'Game Over :('
        //setting score to -1 because when you start a new game it counts it as a success - which is unfair :)
        score = -1;
    }
}