import React from "react";
import "./HowToPlay.scss";

type Props = {
  clickHandler:Function
}

function HowToPlay({clickHandler}:Props) {
  return (
    <div className="how-to">
      <div>
        <h2>How to Play</h2>

        <p className="how-to__text">
          <br />
          Prove you're the biggest sneaker head but answering which random jordan is showing.
          <br />
          <br />
          You have 3 fields to guess correct: <br />
          Shoe model, Colorway and what year it released in.
          <br />
          <br />
          ⬆️ ⬇️ will tell you if your guess is above or below the selected shoe model number or shoe release year.
          <br />
          <br />
          You have 6 attempts to guess and your guess field will turn green if correct and red if wrong.
          <br />
          <br />
          This app is a side project made in TypeScript.
          <br /> Email me at <a href="mailto:PhilipAguiar@gmail.com">PhilipAguiar@gmail.com</a> and find the code for the game here:
          <br />
          <a href="https://github.com/PhilipAguiar/Jordle-TypeScript">https://github.com/PhilipAguiar/Jordle-TypeScript</a>
          <br />
          <br />
          More Features coming so check back soon!
        </p>
      </div>
      <button onClick={()=>{clickHandler()}} className="how-to__button">Close</button>
    </div>
  );
}

export default HowToPlay;
