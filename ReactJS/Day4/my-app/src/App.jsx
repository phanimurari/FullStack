import { ThemeContext, ThemeProvider} from "./ThemeContext";
import Header from "./Header";
import ThemeToggle from "./ThemeToggle";
import { useContext } from "react";
import { useEffect } from "react";




function ThemedApp() {
  const { theme } = useContext(ThemeContext);

  // To fetch the data from the API

  // const handelr  = () => {
  //   const { theme } = useContext(ThemeContext);
  //   // useState, useEffect, useRef, any other hook
  // }

  

  const appStyle = {
    height: "100vh",
    margin: 0,
    backgroundColor: theme === "light" ? "#f0f0f0" : "#121212",
    color: theme === "light" ? "#000" : "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.3s ease, color 0.3s ease"
  };

  return (
    <div style={theme}>
      <Header />
      <ThemeToggle />
    </div>
  );
}

function App() {
  return (
    <>
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
    </>
  );
}

export default App;
