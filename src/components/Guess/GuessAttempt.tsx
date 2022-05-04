import React from "react";
import { Guess,Shoe } from "../../types";
import "./GuessAteempt.scss";

type Props = {
  guess: Guess;
  answerShoe:Shoe;
};

function GuessAttempt({ guess,answerShoe }: Props) {
  return (
    <div className="guess">
      <h2 className={`guess__heading ${guess.model!==answerShoe.model && "guess__heading--wrong"}`}>{guess.model}</h2>
      <h2 className={`guess__heading ${guess.colorway!==answerShoe.colorway && "guess__heading--wrong"}`}>{guess.colorway}</h2>
      <h2 className={`guess__heading ${guess.releaseYear!==answerShoe.releaseYear && "guess__heading--wrong"}`}>{guess.releaseYear}</h2>
    </div>
  );
}

export default GuessAttempt;
