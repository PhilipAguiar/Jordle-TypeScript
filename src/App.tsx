import "./App.scss";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

function App() {
  type Shoe = {
    model: string;
    colorway: string;
    releaseYear: number;
    imageURL: string;
  };
  const [randShoe, setRandShoe] = useState<Shoe>();
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
      let newModelList: string[] = [];
      let newColorwayList: string[] = [];
      let newReleaseYearList: number[] = [];

      res.data.forEach((shoe: any) => {
        if (!newModelList.includes(shoe.make)) {
          newModelList.push(shoe.make);
        }

        let colorWay = shoe.shoeName.replace(shoe.make, "");

        if (!newColorwayList.includes(colorWay)) {
          newColorwayList.push(colorWay);
        }

        let releaseYear = shoe.releaseDate.split("-")[0];
        if (!newReleaseYearList.includes(releaseYear)) {
          newReleaseYearList.push(releaseYear);
        }
      });

      setModelList(newModelList);
      setColorwayList(newColorwayList);
      setReleaseYearList(newReleaseYearList);

      let ranNum: number = Math.floor(Math.random() * res.data.length);
      let colorWay: string = res.data[ranNum].shoeName.replace(res.data[ranNum].make + " ", "");
      let releaseYear: number = parseInt(res.data[ranNum].releaseDate.split("-")[0]);

      let newShoe: Shoe = {
        model: res.data[ranNum].make,
        colorway: colorWay,
        releaseYear: releaseYear,
        imageURL: res.data[ranNum].thumbnail,
      };

      setRandShoe(newShoe);
    });
  }, []);

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (randShoe && correctReleaseYearRef.current?.value) {
      if (
        correctModelRef.current?.value.localeCompare(randShoe.model) === 0 &&
        correctColorwayRef.current?.value.localeCompare(randShoe.colorway) === 0 &&
        parseInt(correctReleaseYearRef.current.value) === randShoe.releaseYear
      ) {
        setUserWon(true);
      }
    }
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
          {modelList.sort().map((model) => {
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
{/* 
      <h2>{randShoe.model}</h2>
      <h2>{randShoe.colorway}</h2>
      <h2>{randShoe.releaseYear}</h2> */}
    </div>
  );
}

export default App;
