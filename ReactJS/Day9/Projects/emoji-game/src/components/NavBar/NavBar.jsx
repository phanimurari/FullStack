import "./NavBar.css";

const NavBar = ({ currentScore, topScore, isGameOver }) => {
  // 🧮 Conditionally render the scores only when the game is not over
  const renderScores = () => {
    if (isGameOver) return null;

    return (
      <div className="scores-container">
        <p className="score-label">
          Score: <span className="score-value">{currentScore}</span>
        </p>
        <p className="score-label">
          Top Score: <span className="score-value">{topScore}</span>
        </p>
      </div>
    );
  };

  // 🧩 Final render
  return (
    <nav className="nav-bar-container">
      <div className="title-with-score-container">
        <div className="logo-and-title-container">
          <img
            className="emoji-logo"
            src="https://assets.ccbp.in/frontend/react-js/game-logo-img.png"
            alt="Emoji Logo"
          />
          <h1 className="title">Emoji Game</h1>
        </div>
        {renderScores()}
      </div>
    </nav>
  );
}

export default NavBar;
