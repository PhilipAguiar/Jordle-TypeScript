export type Shoe = {
  model: string;
  colorway: string;
  releaseYear: number;
  imageURL: string;
};

export type AnswerShoe = Shoe & { description: string };

export type Guess = {
  model: string;
  colorway: string;
  releaseYear: number;
};
