const front = document.querySelector("#card-front")
const back = document.querySelector("#card-back")
const CARD = "card"
const icon = "icon"


startGame();

function startGame() {
  cards = game.createCardFromTechs()
  game.shuffleCards(cards);
  
  initializeCards(game.cards);
}

async function initializeCards(cards) {
  let gameBoard = document.querySelector(".gameBoard");
  gameBoard.innerHTML = '';
  
  cards.forEach(card => {
    
    let cardElement = document.createElement('div');
    cardElement.id = card.id;
    cardElement.classList.add(CARD);  
    cardElement.dataset.icon = card.icon;

    createCardContent(card, cardElement);

    cardElement.addEventListener('click', flipCard);
    gameBoard.appendChild(cardElement);

  })

  return 
}

function createCardContent(card, cardElement) {

  createCardFace("front", card, cardElement);
  createCardFace("back", card, cardElement);
}

function createCardFace(face, card, element) {

  let cardElementFace = document.createElement('div');
  
  
  if(face === "front") {
    let iconElement = document.createElement('img');
    iconElement.classList.add(icon);
    iconElement.src = "./assets/images/" + card.icon + ".png";
    cardElementFace.appendChild(iconElement);
    cardElementFace.classList.add("card-front");
  } else {
    cardElementFace.classList.add("card-back");
    cardElementFace.innerHTML = "&lt/&gt"; 
  }
  element.appendChild(cardElementFace);
}
 


function flipCard() {

  if(game.setCard(this.id)) {

    this.classList.add("flip");
    if(game.secondCard) {
      if(game.checkMatch()) {
        game.clearCards();
      if (game.checkGameOver()) {
          let gameOverLayer = document.getElementById("game-over");
          gameOverLayer.style.display = 'flex';
      }

      } else {
        setTimeout(() => {
          
          let firstCardView = document.getElementById(game.firstCard.id);
          let secondCardView = document.getElementById(game.secondCard.id);
          
          firstCardView.classList.remove("flip");
          secondCardView.classList.remove("flip");
          game.unflipCards();
        }, 1000);
      };
    }
  }

}

function restart() {
  game.clearCards()
  startGame();
  let gameOverLayer = document.getElementById("game-over");
          gameOverLayer.style.display = 'none';
}