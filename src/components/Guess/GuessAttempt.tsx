import React from "react";
import { Guess } from "../../types";
import "./GuessAteempt.scss";

type Props = {
  guess: Guess;
};

function GuessAttempt({ guess }: Props) {
  return (
    <div className="guess">
      <h2 className="guess__model">{guess.model}</h2>
      <h2 className="guess__colorway">{guess.colorway}</h2>
      <h2 className="guess__year">{guess.releaseYear}</h2>
    </div>
  );
}

export default GuessAttempt;
