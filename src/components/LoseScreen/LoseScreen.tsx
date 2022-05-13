import "./LoseScreen.scss";
import { AnswerShoe, Shoe } from "../../types";
type Props = {
  answerShoe: AnswerShoe;
};

function LoseScreen({ answerShoe }: Props) {
  return (
    <div className="lose">
      <h1>You Lost!</h1>
      <h3 className="lose__subheading">Better Luck Next Time!</h3>
      <h4>The Correct Answer was :</h4>
      <h2 className="lose__answer">
        {answerShoe.model} {answerShoe.colorway} {answerShoe.releaseYear}
      </h2>
      <p className="lose__description">{answerShoe.description}</p>
    </div>
  );
}

export default LoseScreen;
