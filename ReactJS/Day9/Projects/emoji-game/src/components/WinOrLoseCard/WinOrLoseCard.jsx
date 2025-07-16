import React from "react";
import "./WinOrLoseCard.css";

// 🎯 Constants for image URLs
const LOSE_IMAGE = "https://assets.ccbp.in/frontend/react-js/lose-game-img.png";
const WON_IMAGE = "https://assets.ccbp.in/frontend/react-js/won-game-img.png";

const WinOrLoseCard = React.memo(({ isWon, onClickPlayAgain, score }) => {
  // 🧠 Compute dynamic values based on win/lose status
  const imageUrl = isWon ? WON_IMAGE : LOSE_IMAGE;
  const gameStatus = isWon ? "You Won" : "You Lose";
  const scoreLabel = isWon ? "Best Score" : "Score";
  const altText = isWon ? "won" : "lose";

  return (
    <div className="win-or-lose-card">
      {/* 🎉 Game result and score section */}
      <div className="details-section">
        <h1 className="game-status">{gameStatus}</h1>
        <p className="current-score-label">{scoreLabel}</p>
        <p className="current-score-value">{score}/12</p>
        <button
          type="button"
          className="play-again-button"
          onClick={onClickPlayAgain}
        >
          Play Again
        </button>
      </div>

      {/* 📷 Image section */}
      <div className="image-section">
        <img
          className="win-or-lose-image"
          src={imageUrl}
          alt={altText}
        />
      </div>
    </div>
  );
});

export default WinOrLoseCard;


// React.memo()	Avoids unnecessary re-renders if isWon, score, or onClickPlayAgain don't change