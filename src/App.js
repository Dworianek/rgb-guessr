import React, { useEffect, useState } from "react";

import "./style/App.css";

import sun from "./img/sun.png";
import moon from "./img/moon.png";

import ColorPalette from "./component/colorPalette";

function App() {
  const [toggleMode, setToogleMode] = useState("dark");

  const [rgbArray, setRgbArray] = useState([]);
  const [randomrgbArray, setRandomRgbArray] = useState("");

  const [inputNumber, setInputNumber] = useState(3);

  const [winner, setWinner] = useState(false);
  const [startGame, setStartGame] = useState(false);

  const [counter, setCounter] = useState(0);

  const hangleToggleColor = () => {
    if (toggleMode === "light") {
      setToogleMode("dark");
    } else if (toggleMode === "dark") {
      setToogleMode("light");
    }
  };

  useEffect(() => {
    document.body.className = toggleMode;
  }, [toggleMode]);

  useEffect(() => {
    randomRgb();
  }, []);

  const randomRgb = () => {
    setCounter(0);
    setStartGame(true);
    setWinner(false);
    let temp_tab = [];
    for (var i = 0; i < inputNumber; i++) {
      const randomBetween = (min, max) =>
        min + Math.floor(Math.random() * (max - min + 1));
      const r = randomBetween(0, 255);
      const g = randomBetween(0, 255);
      const b = randomBetween(0, 255);
      const rgb = `rgb(${r},${g},${b})`;
      temp_tab.push(rgb);
    }
    setRgbArray(temp_tab);
    setRandomRgbArray(temp_tab[Math.floor(Math.random() * temp_tab.length)]);
  };

  const handleDivValue = (value) => {
    if (value === randomrgbArray) {
      if (!winner) {
        setCounter(counter + 1);
        setWinner(true);
      }
    } else {
      if (!winner) {
        setCounter(counter + 1);
      }
    }
  };

  const tempColorPalet = [...rgbArray];
  const colorPalet = tempColorPalet.map((palet) => (
    <ColorPalette key={palet} paletP={palet} handler={handleDivValue} />
  ));

  return (
    <div>
      <div className="modeToggle">
        <div className="toggleSwitch">
          <img
            src={sun}
            alt=""
            style={
              toggleMode === "light"
                ? { height: "40px" }
                : { height: "40px", opacity: "0.2" }
            }
          />
          <label className="switch">
            <input onChange={hangleToggleColor} type="checkbox"></input>
            <span className="slider round"></span>
          </label>
          <img
            src={moon}
            alt=""
            style={
              toggleMode === "dark"
                ? { height: "40px" }
                : { height: "40px", opacity: "0.2" }
            }
          />
        </div>
      </div>
      <div className="gamePanel">
        <p className="gamePanelText">{randomrgbArray}</p>
        <div className="gamlePanelButton">
          <input
            type="number"
            min="3"
            max="15"
            value={inputNumber}
            onChange={(e) => setInputNumber(e.target.value)}
          />
          <button className="newGameButton" onClick={randomRgb}>
            Nowa gra
          </button>
        </div>
        <div className={winner ? "scoreTextGood" : "scoreTextBad"}>
          <p>
            {" "}
            {startGame
              ? winner
                ? `Poprawna odpowiedz - Liczba prób: ${counter}.`
                : counter > 0
                ? `Błędna odpowiedz - Liczba prób: ${counter}.`
                : null
              : null}
          </p>
        </div>

        <div className="colorPalette">{colorPalet}</div>
      </div>
    </div>
  );
}

export default App;
