const category = document.getElementById("category");
const secretWord = document.getElementById("secret-word");
const hangman = document.getElementById("hangmanIMG");

let nameObj;
let categoryName;
let letterList = [];
let life = 6;
let alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "Ç",
];

function loadRandomObj() {
  const num = randomInteger(1, 35);
  const obj = findObject(num);

  nameObj = obj.name;
  categoryName = obj.category;
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function findObject(num) {
  if (localStorage.getItem("lang") === "en") {
    document.getElementById("category-name").innerHTML = "Category";
    for (const i in wordsEn) {
      if (wordsEn[i].id === num) {
        return wordsEn[i];
      }
    }
  } else {
    document.getElementById("category-name").innerHTML = "Categoria";
    for (const i in wordsPtBr) {
      if (wordsPtBr[i].id === num) {
        return wordsPtBr[i];
      }
    }
  }
}

function loadCategory() {
  loadRandomObj();
  category.innerHTML = categoryName;
}

function checkWrongLetter(bt) {
  document.getElementById("letter" + bt).style.backgroundColor = "#965c5c";
  document.getElementById("letter" + bt).style.border = "none";
  document.getElementById("letter" + bt).style.animation = "shake 0.2s";
}

function checkRightLetter(bt) {
  document.getElementById("letter" + bt).style.backgroundColor = "#5c966b";
  document.getElementById("letter" + bt).style.border = "none";
}

function checkLetter(letter) {
  if (!alphabet.includes(letter)) {
    return;
  }

  document.getElementById("letter" + letter).disabled = true;
  document.getElementById("letter" + letter).style.cursor = "not-allowed";
  if (nameObj.includes(letter.toLowerCase())) {
    checkRightLetter(letter);
    for (let i = 0; i < nameObj.length; i++) {
      if (nameObj[i] === letter.toLowerCase()) {
        letterList[i] = letter;
        showWordInScreen();
      }
    }
  } else {
    checkWrongLetter(letter);
    life--;
    loadHangman();
  }
}

function checkLetterOnKeyPress() {
  document.addEventListener("keydown", function (e) {
    const key = e.key.toUpperCase();
    checkLetter(key);
  });
}

function loadHangman() {
  switch (life) {
    case 5:
      hangman.src = "../assets/hangmanIMG/1 - head.png";
      break;
    case 4:
      hangman.src = "../assets/hangmanIMG/2 - body.png";
      break;
    case 3:
      hangman.src = "../assets/hangmanIMG/3 - right arm.png";
      break;
    case 2:
      hangman.src = "../assets/hangmanIMG/4 - left arm.png";
      break;
    case 1:
      hangman.src = "../assets/hangmanIMG/5 - right leg.png";
      break;
    case 0:
      hangman.src = "../assets/hangmanIMG/6 - game over.png";
      disableAllButtons();
      setTimeout(() => {
        loadGameOverHTML();
      }, 500);
      break;
  }
}

function showWordInScreen() {
  secretWord.innerHTML = "";

  for (let i = 0; i < nameObj.length; i++) {
    if (letterList[i] == undefined) {
      letterList[i] = "&nbsp";
      secretWord.innerHTML =
        secretWord.innerHTML +
        "<div class='letter'>" +
        letterList[i] +
        "</div>";
    } else {
      secretWord.innerHTML =
        secretWord.innerHTML +
        "<div class='letter'>" +
        letterList[i] +
        "</div>";
    }
    if (letterList.join("").toLowerCase() === nameObj) {
      disableAllButtons();
      setTimeout(() => {
        loadYouWinHTML();
      }, 500);
      break;
    }
  }
}

function loadGameOverHTML() {
  window.location.href = "../game_over/game_over.html";
}

function loadYouWinHTML() {
  window.location.href = "../you_win/you_win.html";
}

function disableAllButtons() {
  for (let i = 0; i < alphabet.length; i++) {
    document.getElementById("letter" + alphabet[i]).disabled = true;
    document.getElementById("letter" + alphabet[i]).style.cursor =
      "not-allowed";
  }
}

function setLanguage(lang) {
  if (lang === "en") {
    localStorage.setItem("lang", "en");
  } else {
    localStorage.setItem("lang", "pt_br");
  }
  window.location.reload();
}

function getLanguage() {
  if (localStorage.getItem("lang") === "en") {
    document.getElementsByClassName("dropdown-lang")[0].innerHTML = "EN";
  } else {
    document.getElementsByClassName("dropdown-lang")[0].innerHTML = "PT BR";
  }
}

getLanguage();
