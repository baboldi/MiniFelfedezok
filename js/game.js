// js/game.js

document.addEventListener("DOMContentLoaded", () => {
  const animals = ["🦁", "🐘", "🐶", "🐱", "🐸", "🐼"];
  let cards = [...animals, ...animals];

  const gameContainer = document.getElementById("memory-game");
  const restartButton = document.getElementById("restart-game");
  const movesCounter = document.getElementById("moves-counter");

  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;
  let moves = 0;
  let matchedPairs = 0;

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function createBoard() {
    if (!gameContainer) return;
    gameContainer.innerHTML = "";
    shuffle(cards);
    cards.forEach((symbol, index) => {
      const card = document.createElement("button");
      card.classList.add("memory-card");
      card.dataset.symbol = symbol;
      card.dataset.index = index;
      card.textContent = "❓";
      card.addEventListener("click", handleCardClick);
      gameContainer.appendChild(card);
    });

    moves = 0;
    matchedPairs = 0;
    updateMoves();
  }

  function handleCardClick(e) {
    if (lockBoard) return;

    const card = e.currentTarget;
    if (card === firstCard) return;

    revealCard(card);

    if (!firstCard) {
      firstCard = card;
    } else {
      secondCard = card;
      moves++;
      updateMoves();
      checkForMatch();
    }
  }

  function revealCard(card) {
    card.textContent = card.dataset.symbol;
    card.disabled = true;
  }

  function hideCard(card) {
    card.textContent = "❓";
    card.disabled = false;
  }

  function checkForMatch() {
    if (!firstCard || !secondCard) return;

    const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;

    if (isMatch) {
      matchedPairs++;
      resetPickedCards();
      if (matchedPairs === animals.length) {
        setTimeout(() => {
          alert(`Ügyes vagy! Kész, megtaláltál minden párt ${moves} lépésből!`);
        }, 300);
      }
    } else {
      lockBoard = true;
      setTimeout(() => {
        hideCard(firstCard);
        hideCard(secondCard);
        resetPickedCards();
        lockBoard = false;
      }, 800);
    }
  }

  function updateMoves() {
    if (movesCounter) {
      movesCounter.textContent = `Lépések: ${moves}`;
    }
  }

  function resetPickedCards() {
    firstCard = null;
    secondCard = null;
  }

  if (restartButton) {
    restartButton.addEventListener("click", createBoard);
  }

  if (gameContainer) {
    createBoard();
  }
});
