
import { ThemeContext } from "./ThemeContext";
import { useContext } from "react";

function ThemeToggle() {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} style={{ padding: "0.5rem 1rem" }}>
      Toggle Theme
    </button>
  );
}

export default ThemeToggle;
