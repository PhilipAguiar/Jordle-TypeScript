import React from "react";
import "./HowToPlay.scss";

type Props = {
  clickHandler: Function;
};

function HowToPlay({ clickHandler }: Props) {
  return (
    <div className="how-to">
      <div>
        <h2>How to Play</h2>
        <div className="how-to__text-container">
          <p className="how-to__text">
            Prove you're the biggest sneaker head but answering which random jordan is showing.</p>
            <p className="how-to__text">You have 3 fields to guess correct:</p>
            <p className="how-to__text">Shoe model, Colorway and what year it released in.</p>
            <p className="how-to__text">⬆️ ⬇️ will tell you if your guess is above or below the selected shoe model number or shoe release year.</p>
            <p className="how-to__text">You have 6 attempts to guess and your guess field will turn green if correct and red if wrong.</p>
            <p className="how-to__text">This app is a side project made in TypeScript.
            <br /> Email me at <a  href="mailto:PhilipAguiar@gmail.com">PhilipAguiar@gmail.com</a> and find the code for the game here:
            <br />
            <br />
            <a href="https://github.com/PhilipAguiar/Jordle-TypeScript">https://github.com/PhilipAguiar/Jordle-TypeScript</a>
            </p>
            <br />
            <br />
            More Features coming so check back soon!
          
        </div>
      </div>
      <button
        onClick={() => {
          clickHandler();
        }}
        className="how-to__button"
      >
        Close
      </button>
    </div>
  );
}

export default HowToPlay;
