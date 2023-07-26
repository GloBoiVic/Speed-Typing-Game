const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');

quoteInputElement.addEventListener('input', () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll('span');
  const arrayValue = quoteInputElement.value.split('');

  let correct = true;

  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];

    if (character == null) {
      characterSpan.classList.remove('correct');
      characterSpan.classList.remove('incorrect');
      correct = false;
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct');
      characterSpan.classList.remove('incorrect');
    } else {
      characterSpan.classList.remove('correct');
      characterSpan.classList.add('incorrect');
      correct = false;
    }
  });

  if (correct) renderNewQuote();
});

// Create a promise to fetch quotes
function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then((response) => response.json())
    .then((data) => data.content);
}

// use async to handle promise returned
async function renderNewQuote() {
  const quote = await getRandomQuote();
  quoteDisplayElement.innerHTML = '';
  quote.split('').forEach((character) => {
    const characterSpan = document.createElement('span');
    characterSpan.innerText = character;
    quoteDisplayElement.appendChild(characterSpan);
  });
  quoteInputElement.value = null;
}

let START_TIME = 10;
// let interval;

// debugger;
const getTimer = setInterval(() => {
  START_TIME -= 1;
  timerElement.innerText = START_TIME;
  if (START_TIME <= 0) clearInterval(getTimer);
}, 1000);

// function startTimer() {
//   timerElement.innerText = START_TIME;
//   interval = setInterval(() => {
//     START_TIME -= 1;
//     timerElement.innerText = START_TIME;
//     if (START_TIME <= 0) {
//       clearInterval(interval);
//       interval = null;
//     }
//   });
// }

function startTimer() {
  return getTimer;
}
startBtn.addEventListener('click', () => {
  startTimer();
});

document.addEventListener('DOMContentLoaded', renderNewQuote);
