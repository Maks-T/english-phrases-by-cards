let curIndex = 0;
const card = document.querySelector('.card');
const title = document.querySelector('.title');
const btnNext = document.querySelector('#btn-next');
const btnKnow = document.querySelector('#btn-know');
const btnRestart = document.querySelector('#btn-restart');
const frontTextElem = document.querySelector('#front-text');
const backTextElem = document.querySelector('#back-text');
const frontCardElem = document.querySelector('#front-card');
const backCardElem = document.querySelector('#back-card');
if (isIOS()) {
  backCardElem.classList.toggle('hide');
}
const countQues = document.querySelector('.count-ques');
const countKnow = document.querySelector('.count-know');
const countUnknown = document.querySelector('.count-unknown');

let countQ = 0;

let questions = [];

window.onload = async () => {
  card.addEventListener('click', clickCardHandle(card));

  const data = await loadData('./data/unit1.json');

  title.innerHTML = `Topic: ${data.name}`;
  countQ = data.phrases.length;
  countQues.innerHTML = `Всего фраз: ${countQ}`;

  questions = [...data.phrases];
  loadNextQuestion(questions);
  btnNext.addEventListener('click', clickBtnNextHandle);
  btnKnow.addEventListener('click', clickBtnKnowHandle);
  btnRestart.addEventListener('click', clickBtnRestartHandle);
};

const clickCardHandle = (card) => {
  return (e) => {
    card.classList.toggle('rotated');
    if (isIOS()) {
      console.log('=>');
      setTimeout(() => {
        frontCardElem.classList.toggle('hide');
        backCardElem.classList.toggle('hide');
      }, 1000);
    }
  };
};

const loadNextQuestion = (questions) => {
  countKnow.innerHTML = `Изучено: ${countQ - questions.length}`;
  countUnknown.innerHTML = `Осталось изучить: ${questions.length}`;

  if (questions.length === 0) {
    frontTextElem.innerHTML = 'Вы знаете все фразы!';
    backTextElem.innerHTML = 'You know all the phrases!';
    btnNext.classList.add('hide');
    btnKnow.classList.add('hide');
    btnRestart.classList.remove('hide');
    return;
  }
  if (curIndex >= questions.length) {
    curIndex = 0;
  }

  frontTextElem.innerHTML = questions[curIndex].ru;
  backTextElem.innerHTML = questions[curIndex].en;

  card.classList.remove('rotated');
};

const clickBtnNextHandle = () => {
  if (curIndex >= questions.length) {
    curIndex = 0;
  }
  curIndex++;

  loadNextQuestion(questions);
};

const clickBtnKnowHandle = () => {
  if (curIndex >= questions.length) {
    curIndex = 0;
  }
  questions.splice(curIndex, 1);
  loadNextQuestion(questions);
};

const clickBtnRestartHandle = () => {
  location.reload();
};

const loadData = async (path) => {
  const response = await fetch(path);

  const data = await response.json();

  data.phrases.sort(() => Math.random() - 0.5);

  return data;
};

/*function isIOS() {
  return (
    [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod',
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  );
}*/

function isIOS() {
  return ['iPad', 'iPhone', 'iPod'].indexOf(navigator.platform) >= 0;
}
