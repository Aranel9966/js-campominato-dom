/*
Consegna
L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
Bonus
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
- con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;

*/

/*

->>select per le difficolta 
?difficolta 1  => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
?:difficolta 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
?:difficolta 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
-->generare una griglia al clicc
    ->ogni cella ha un numero progressivo (da 1 a 100)
        ->10 righe 10 casselle 
->al clicca di una cassella cambia colore in azzurro 
->emette un messaggio in consol del numero
->generare 16 numeri casuali
->Quando si clicca su una bomba finisce la partita,
-> il software scopre tutte le bombe nascoste.

*/

let difficultyEL = document.getElementById("difficulty");
let startBtnEl = document.getElementById("start-btn");
let containerSquareEl = document.getElementById("container-square");
let resultGame = document.getElementById("result");
let newRandom = [];
let newClick = [];
let caselle;
let totalPointEl=0;




startBtnEl.addEventListener("click", function () {
  removeClass();
  if (difficultyEL.value == 1) {
    randomNumber(100, 16);
    
    for (let i = 1; i <= 100; i++) {
      createSquareAndColor(containerSquareEl, i);

      containerSquareEl.classList.add("container-square-f");
     
      
    }
    
  } else if (difficultyEL.value == 2) {
    randomNumber(81, 16);

    for (let i = 1; i <= 81; i++) {
      createSquareAndColor(containerSquareEl, i);
      
      containerSquareEl.classList.add("container-square-n");
      
     
    }
  } else {
    randomNumber(49, 16);

    for (let i = 1; i <= 49; i++) {
        createSquareAndColor(containerSquareEl, i);
        
      containerSquareEl.classList.add("container-square-d");
      
    }
  }

});

//////////function/////////

function removeClass() {
  containerSquareEl.innerHTML = "";
  resultGame.innerHTML = "";
  totalPointEl=0;

  containerSquareEl.classList.remove(
    "container-square-f",
    "container-square-n",
    "container-square-d"
  );
}

// numeri random tutti diversi
function randomNumber(max, number) {
  newRandom = [];

  for (let i = 0; i < number; i++) {
    let random = Math.floor(Math.random() * (max - 1 + 1) + 1);

    let nuovo = true;

    for (let add = 0; add < i; add++) {
      if (newRandom[add] == random) {
        nuovo = false;
      }
    }

    if (nuovo) {
      newRandom[i] = random;
    } else {
      i--;
    }
  }
//   console.log(newRandom);

  caselle = max - number;

//   console.log(caselle);

  return newRandom;
}

//function che crea i quadrati e assegna classColor
function createSquareAndColor(container, i) {
  let newSquare = document.createElement("div");

  newSquare.classList.add("square");
  newSquare.setAttribute("id" , i);
  container.append(newSquare);

  newSquare.textContent = i;

  addColor(newSquare,i)
  
}

// evento che assegna le classi
function addColor(newSquare,i) {
    click = false;

    newSquare.addEventListener("click", function () {
      if (click === false ) {
        

        if (newRandom.includes(i)) {
          for (let j = 0; j < newRandom.length; j++) {
            let bombs = document.getElementById( newRandom[j]);
            bombs.classList.add("red");
          }
          resultGame.innerHTML = "Hai perso  <br>  punteggio:" + totalPointEl;

          click = true;
        } else {
          newSquare.classList.add("green");

          if (!newClick.includes(i)){
              newClick.push(i);
              totalPointEl++
          }

        //   console.log(totalPointEl)

        //   console.log(newClick);

        }
      }

      if (caselle === newClick.length) {
         resultGame.innerHTML = "Hai Vinto <br>  punteggio:" + totalPointEl;
      }
    });

}