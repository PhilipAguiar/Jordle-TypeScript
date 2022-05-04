import "./App.scss";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import GuessAttempt from "./components/Guess/GuessAttempt";
import {Shoe,Guess} from "./types"

function App() {
 

  const [randShoe, setRandShoe] = useState<Shoe>();
  const [guessList, setGuessList] = useState<Array<Guess>>([]);
  // const [shoeList, setShoeList] = useState<Array<Shoe>>([]);
  const [modelList, setModelList] = useState<Array<string>>([]);
  const [colorwayList, setColorwayList] = useState<Array<string>>([]);
  const [releaseYearList, setReleaseYearList] = useState<Array<number>>([]);
  const [userWon, setUserWon] = useState<boolean>(false);
  const correctModelRef = useRef<HTMLSelectElement>(null);
  const correctColorwayRef = useRef<HTMLSelectElement>(null);
  const correctReleaseYearRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    axios.get("https://jordle-game.web.app/shoes").then((res) => {
      console.log(res);
      let newModelList: string[] = [];
      let newColorwayList: string[] = [];
      let newReleaseYearList: number[] = [];

      res.data.forEach((shoe: Shoe) => {
        if (!newModelList.includes(shoe.model)) {
          newModelList.push(shoe.model);
        }

        if (!newColorwayList.includes(shoe.colorway)) {
          newColorwayList.push(shoe.colorway);
        }

        if (!newReleaseYearList.includes(shoe.releaseYear)) {
          newReleaseYearList.push(shoe.releaseYear);
        }
      });

      setModelList(newModelList);
      setColorwayList(newColorwayList);
      setReleaseYearList(newReleaseYearList);

      let ranNum: number = Math.floor(Math.random() * res.data.length);

      let newShoe: Shoe = {
        model: res.data[ranNum].model,
        colorway: res.data[ranNum].colorway,
        releaseYear: res.data[ranNum].releaseYear,
        imageURL: res.data[ranNum].imageURL,
      };

      setRandShoe(newShoe);
      console.log(newShoe.model, newShoe.colorway, newShoe.releaseYear);
    });
  }, []);

  const submitHandler = (e: any) => {
    e.preventDefault();
    let newGuess: Guess;

    if (correctModelRef.current && correctColorwayRef.current && correctReleaseYearRef.current && randShoe) {
      newGuess = {
        model: correctModelRef.current.value,
        colorway: correctColorwayRef.current.value,
        releaseYear: parseInt(correctReleaseYearRef.current.value),
      };
      setGuessList(prevList=>[...prevList,newGuess])

      if (newGuess.model === randShoe.model && newGuess.colorway === randShoe.colorway && newGuess.releaseYear === randShoe.releaseYear) {
        setUserWon(true);
      }
    }

    // if (randShoe && correctReleaseYearRef.current?.value) {
    //   if (
    //     correctModelRef.current?.value.localeCompare(randShoe.model) === 0 &&
    //     correctColorwayRef.current?.value.localeCompare(randShoe.colorway) === 0 &&
    //     parseInt(correctReleaseYearRef.current.value) === randShoe.releaseYear
    //   ) {
    //     setUserWon(true);
    //   }
    // }
  };

  if (!randShoe) {
    return <></>;
  }

  return (
    <div className="App">
      <h1>Jordle</h1>

      <h3>Guess the Jordan</h3>

      <img className="App__image" src={randShoe.imageURL} alt="Jordan" />

      {userWon && <h1>You Won!</h1>}
      <form onSubmit={(e) => submitHandler(e)}>
        <label>Jordan Model</label>
        <select ref={correctModelRef}>
          {modelList
            .sort((a: string, b: string) => {
              return parseInt(a.replace(/[^0-9]/g, "")) - parseInt(b.replace(/[^0-9]/g, ""));
            })
            .map((model) => {
              return <option>{model}</option>;
            })}
        </select>

        <label>Colorway:</label>
        <select ref={correctColorwayRef}>
          {colorwayList.sort().map((colorway) => {
            return <option>{colorway}</option>;
          })}
        </select>

        <label>Release Year:</label>
        <select ref={correctReleaseYearRef}>
          {releaseYearList.sort().map((releaseYear) => {
            return <option>{releaseYear}</option>;
          })}
        </select>
        <button>Click</button>
      </form>

      {guessList &&
        guessList.map((guess: Guess) => {
          return (
            <GuessAttempt guess= {guess}/>
           
          );
        })}

      {/* 


      <h2>{randShoe.model}</h2>
      <h2>{randShoe.colorway}</h2>
      <h2>{randShoe.releaseYear}</h2> */}
    </div>
  );
}

export default App;
