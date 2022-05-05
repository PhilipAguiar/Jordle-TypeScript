import "./App.scss";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import GuessAttempt from "./components/Guess/GuessAttempt";
import { Shoe, Guess } from "./types";
import HowToPlay from "./components/HowToPlay/HowToPlay";

function App() {
  const [answerShoe, setAnswerShoe] = useState<Shoe>();
  const [guessList, setGuessList] = useState<Array<Guess>>([]);
  const [modelList, setModelList] = useState<Array<string>>([]);
  const [colorwayList, setColorwayList] = useState<Array<string>>([]);
  const [releaseYearList, setReleaseYearList] = useState<Array<number>>([]);
  const [userWon, setUserWon] = useState<boolean>(false);
  const [howToPlayActive, setHowToPlayActive] = useState<boolean>(false);

  const correctModelRef = useRef<HTMLSelectElement>(null);
  const correctColorwayRef = useRef<HTMLSelectElement>(null);
  const correctReleaseYearRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    axios.get("https://jordle-game.web.app/shoes/random").then((res) => {
      setAnswerShoe(res.data);
    });

    axios.get("https://jordle-game.web.app/shoes/models").then((res) => {
      setModelList(res.data);
    });
    axios.get("https://jordle-game.web.app/shoes/colorways").then((res) => {
      setColorwayList(res.data);
    });
    axios.get("https://jordle-game.web.app/shoes/years").then((res) => {
      setReleaseYearList(res.data);
    });
  }, []);

  const removeHowTo = () => {
    setHowToPlayActive(false);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let newGuess: Guess;

    if (correctModelRef.current && correctColorwayRef.current && correctReleaseYearRef.current && answerShoe) {
      newGuess = {
        model: correctModelRef.current.value,
        colorway: correctColorwayRef.current.value,
        releaseYear: parseInt(correctReleaseYearRef.current.value),
      };

      setGuessList((prevList) => [newGuess, ...prevList]);

      if (newGuess.model === answerShoe.model && newGuess.colorway === answerShoe.colorway && newGuess.releaseYear === answerShoe.releaseYear) {
        setUserWon(true);
      }
    }
  };

  if (!answerShoe) {
    return <></>;
  }

  return (
    <div className="main">
      {howToPlayActive && <HowToPlay clickHandler={removeHowTo} />}
      <h1>Jordle</h1>

      <h3>Guess the Jordan</h3>

      <h5 className="main__how-to"
        onClick={() => {
          setHowToPlayActive(true);
        }}
      >
        How to Play?
      </h5>

      <img className="main__image" src={answerShoe.imageURL} alt="Jordan" />

      {userWon && <h1>You Won!</h1>}
      <form className="main__form" onSubmit={(e) => submitHandler(e)}>
        <div className="main__form-wrapper">
          <label className="main__label">Jordan Model:</label>
          <select className="main__select" ref={correctModelRef}>
            {modelList
              .sort((a: string, b: string) => {
                return parseInt(a.replace(/[^0-9]/g, "")) - parseInt(b.replace(/[^0-9]/g, ""));
              })
              .map((model) => {
                return <option className="main__option">{model}</option>;
              })}
          </select>

          <label className="main__label">Colorway:</label>
          <select className="main__select" ref={correctColorwayRef}>
            {colorwayList.sort().map((colorway) => {
              return <option>{colorway}</option>;
            })}
          </select>

          <label className="main__label">Release Year:</label>
          <select className="main__select" ref={correctReleaseYearRef}>
            {releaseYearList.sort().map((releaseYear) => {
              return <option>{releaseYear}</option>;
            })}
          </select>
        </div>

        <button className="main__button">Guess</button>
      </form>

      {guessList &&
        guessList.map((guessedShoe: Guess, index: number) => {
          return <GuessAttempt guessedShoe={guessedShoe} answerShoe={answerShoe} attemptCounter={guessList.length - index} />;
        })}

      {/* 


      <h2>{randShoe.model}</h2>
      <h2>{randShoe.colorway}</h2>
      <h2>{randShoe.releaseYear}</h2> */}
    </div>
  );
}

export default App;
