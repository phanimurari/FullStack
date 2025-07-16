import { useState, useCallback, useMemo } from "react";
import "./EmojiGame.css";
import EmojiCard from "../EmojiCard/EmojiCard";
import NavBar from "../NavBar/NavBar";
import WinOrLoseCard from "../WinOrLoseCard/WinOrLoseCard";

function EmojiGame({ emojisList }) {
  // ---------------------------
  // 🎯 State Management
  // ---------------------------
  const [clickedEmojis, setClickedEmojis] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [topScore, setTopScore] = useState(0);

  // ---------------------------
  // 🧠 Utility: Update Top Score
  // ---------------------------
  const updateTopScore = useCallback((currentScore) => {
    setTopScore(prev => Math.max(prev, currentScore));
  }, []);

  // ---------------------------
  // 🎮 Game Over Logic
  // ---------------------------
  const finishGame = useCallback((score) => {
    setIsGameOver(true);
    updateTopScore(score);
  }, [updateTopScore]);

  // ---------------------------
  // 👆 Handle Emoji Clicks
  // ---------------------------
  const onClickEmoji = useCallback((id) => {
    const isEmojiClicked = clickedEmojis.includes(id);
    const newClickedEmojis = [...clickedEmojis, id];

    if (isEmojiClicked) {
      finishGame(clickedEmojis.length);
    } else if (newClickedEmojis.length === emojisList.length) {
      finishGame(emojisList.length);
      setClickedEmojis(newClickedEmojis);
    } else {
      setClickedEmojis(newClickedEmojis);
    }
  }, [clickedEmojis, emojisList, finishGame]);

  // ---------------------------
  // 🎲 Shuffle Emojis (Memoized)
  // ---------------------------
  const shuffledEmojisList = useMemo(() => {
    return [...emojisList].sort(() => Math.random() - 0.5);
  }, [clickedEmojis, emojisList]); // reshuffle on each correct click


  // ---------------------------
  // 🛠️ Reset Game
  // ---------------------------
  const resetGame = useCallback(() => {
    setClickedEmojis([]);
    setIsGameOver(false);
  }, []);

  // ---------------------------
  // 🧾 Score Card Renderer
  // ---------------------------
  const renderScoreCard = () => {
    const isWon = clickedEmojis.length === emojisList.length;
    return (
      <WinOrLoseCard
        isWon={isWon}
        score={clickedEmojis.length}
        onClickPlayAgain={resetGame}
      />
    );
  };

  // ---------------------------
  // 😄 Emoji List Renderer
  // ---------------------------
  const renderEmojisList = () => (
    <ul className="emojis-list-container">
      {shuffledEmojisList.map((emoji) => (
        <EmojiCard
          key={emoji.id}
          emoji={emoji}
          onClickEmoji={onClickEmoji}
        />
      ))}
    </ul>
  );

  // ---------------------------
  // 🧩 Final Render
  // ---------------------------
  return (
    <div className="emoji-game-container">
      <NavBar
        currentScore={clickedEmojis.length}
        isGameOver={isGameOver}
        topScore={topScore}
      />
      <div className="emoji-game-body">
        {isGameOver ? renderScoreCard() : renderEmojisList()}
      </div>
    </div>
  );
}

export default EmojiGame;
