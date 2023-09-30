const selectButtons = document.querySelectorAll("[data-selection]");
const selections = [
  {
    name: "rock",
    beats: "scissor",
  },
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissor",
    beats: "paper",
  },
];
const rockimg = document.getElementById("rockimg");
const paperimg = document.getElementById("paperimg");
const scissorimg = document.getElementById("scissorimg");
let computerScore = document.getElementById("compuScore");
let yourScore = document.getElementById("yourScore");
const finalColumn = document.querySelector("[data-final-column]");
let cont = 0;

selectButtons.forEach((selectButton) => {
  selectButton.addEventListener("click", () => {
    if (cont < 5) {
      cont++
      const selectionName = selectButton.dataset.selection;
      const selection = selections.find(
        (Selection) => Selection.name === selectionName
      );
      if (selection.name == "rock") {
        addHidden(paper, scissor);
        removeHidden(rock);
      } else if (selection.name == "paper") {
        addHidden(rock, scissor);
        removeHidden(paper);
      } else if (selection.name == "scissor") {
        addHidden(paper, rock);
        removeHidden(scissor);
      }
      makeSelection(selection);
    } else{
      alert("Se ha jugado la cantidad minima para determinar un ganador")
    }
  });
});

function makeSelection(selection) {
  const computerSel = computerSelect();
  const yourWin = winner(selection, computerSel);
  const computerwin = winner(computerSel, selection);
  if (yourWin) {
    ScorePoints(yourScore);
    let message = document.getElementById("winMessage");
    message.innerText = "Has Ganado";
  }
  if (computerwin) {
    ScorePoints(computerScore);
    let message = document.getElementById("winMessage");
    message.innerText = "Que mal ha Ganado la Computadora";
  }
  if(selection.beats === computerSel.beats){
    let message = document.getElementById("winMessage");
    message.innerText = "Es un Empate";
  }
  addSelectionResult(computerSel, computerwin);
  addSelectionResult(selection, yourWin);
}

function addSelectionResult(selection, winner) {
  const div = document.createElement("div");
  div.innerHTML = selection.name;
  div.classList.add("results_selection_container");
  finalColumn.after(div);
}

function ScorePoints(scoreSpan) {
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
}

function winner(selection, computSelection) {
  return selection.beats === computSelection.name;
}

function computerSelect() {
  const randomIndex = Math.floor(Math.random() * selections.length);
  if (randomIndex === 0) {
    addHidden(paperimg, scissorimg);
    removeHidden(rockimg);
  } else if (randomIndex === 1) {
    addHidden(rockimg, scissorimg);
    removeHidden(paperimg);
  } else if (randomIndex === 2) {
    addHidden(paperimg, rockimg);
    removeHidden(scissorimg);
  }
  return selections[randomIndex];
}

function removeHidden(element) {
  element.classList.remove("hidden");
}

function addHidden(element1, element2) {
  element1.classList.add("hidden");
  element2.classList.add("hidden");
}

const newGame = () => {
  window.location.reload()
}