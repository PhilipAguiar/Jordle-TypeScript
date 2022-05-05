import React from "react";
import { Guess, Shoe } from "../../types";
import "./GuessAttempt.scss";

type Props = {
  guessedShoe: Guess;
  answerShoe: Shoe;
  attemptCounter: number;
};

function GuessAttempt({ guessedShoe, answerShoe, attemptCounter }: Props) {
  const checkIfGreater = (guessedModel: string, answerModel: string) => {
    let guessedModelNumber: number = parseInt(guessedModel.replace(/[^0-9]/g, ""));
    let guessedAnswerNumber: number = parseInt(answerModel.replace(/[^0-9]/g, ""));

    if (guessedModelNumber > guessedAnswerNumber) {
      return 1;
    }

    if (guessedModelNumber === guessedAnswerNumber) {
      return 0;
    }

    if (guessedModelNumber < guessedAnswerNumber) {
      return -1;
    }
  };

  return (
    <>
      <h2 className="guess__header">Guess Attempt {attemptCounter}</h2>
      <section className="guess">
        <div className="guess__field-container">
          <h2
            className={`guess__text ${guessedShoe.model !== answerShoe.model && "guess__text--wrong"} ${
              checkIfGreater(guessedShoe.model, answerShoe.model) === 0 && guessedShoe.model !== answerShoe.model && "guess__text--close"
            }`}
          >
            {guessedShoe.model}
          </h2>

          {checkIfGreater(guessedShoe.model, answerShoe.model) === 1 ? (
            <p className="guess__arrow">⬇️</p>
          ) : (
            checkIfGreater(guessedShoe.model, answerShoe.model) === -1 && <p className="guess__arrow">⬆️</p>
          )}
        </div>

        <div className="guess__field-container guess__field-container--middle">
          <h2 className={`guess__text ${guessedShoe.colorway !== answerShoe.colorway && "guess__text--wrong"}`}>{guessedShoe.colorway}</h2>
        </div>

        <div className="guess__field-container guess__field-container--year">
          <h2 className={`guess__text ${guessedShoe.releaseYear !== answerShoe.releaseYear && "guess__text--wrong"}`}>{guessedShoe.releaseYear}</h2>
          {guessedShoe.releaseYear > answerShoe.releaseYear ? (
            <p className="guess__arrow">⬇️</p>
          ) : (
            guessedShoe.releaseYear < answerShoe.releaseYear && <p className="guess__arrow">⬆️</p>
          )}
        </div>
      </section>
    </>
  );
}

export default GuessAttempt;
