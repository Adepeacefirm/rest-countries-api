import React from "react";
import Home from "./components/Home";
import Header from "./components/Header";
import ThemeContextProvider from "./context/ThemeContext";

const App = () => {
  return (
    <div className="dark:bg-[hsl(207,26%,17%)]">
      <ThemeContextProvider>
        <Header />
        <Home />
      </ThemeContextProvider>
    </div>
  );
};

export default App;
