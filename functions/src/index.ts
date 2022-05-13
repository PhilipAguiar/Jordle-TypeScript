import * as express from "express";

const functions = require("firebase-functions");
const fs = require("fs");
const cors = require("cors");
// const SneaksAPI = require("sneaks-api");
// const sneaks = new SneaksAPI();

const app = express();

app.use(cors());
app.use(express.json());

type Shoe = {
  model: string;
  colorway: string;
  releaseYear: number;
  imageURL: string;
  description: string;
};

const modelList: string[] = [];
const colorwayList: string[] = [];
const releaseYearList: number[] = [];

// let shoeList: Shoe[] = [];
// let modelNumber: number = 1;

// for (let i = modelNumber; i <= 26; i++) {
//   sneaks.getProducts(`Jordan ${i}`, 100, function (err: unknown, products: any) {
//     if (products) {
//       products.forEach((product: any) => {
//         if (product.make && product.releaseDate && product.shoeName && product.thumbnail && product.description) {
//           console.log(product);
//           let colorWay: string = product.shoeName.replace(product.make + " ", "");
//           let releaseYear: number = parseInt(product.releaseDate.split("-")[0]);

//           let newShoe: Shoe = {
//             model: product.make,
//             colorway: colorWay,
//             releaseYear: releaseYear,
//             imageURL: product.thumbnail,
//             description: product.description,
//           };

//           if (!shoeList.includes(newShoe) && parseInt(product.make.match(/\d+/g)) === i) {
//             shoeList.push(newShoe);
//           }
//         }
//       });
//       fs.writeFileSync("../data/shoes.json", JSON.stringify(shoeList));
//     }
//   });
// }

const getShoes = () => JSON.parse(fs.readFileSync("./data/shoes.json"));

app.get("/shoes", (_req, res) => {
  const shoes = getShoes();

  if (shoes.length === 0) {
    res.status(400).send("No shoes");
    return;
  }
  res.status(200).json(shoes);
});

app.get("/shoes/random", (_req, res) => {
  const shoes = getShoes();

  let ranNum: number = Math.floor(Math.random() * shoes.length);

  let newShoe: Shoe = {
    model: shoes[ranNum].model,
    colorway: shoes[ranNum].colorway,
    releaseYear: shoes[ranNum].releaseYear,
    imageURL: shoes[ranNum].imageURL,
    description: shoes[ranNum].description,
  };
  res.status(200).json(newShoe);
});

app.get("/shoes/models", (_req, res) => {
  const shoes = getShoes();

  shoes.forEach((shoe: Shoe) => {
    if (!modelList.includes(shoe.model)) {
      modelList.push(shoe.model);
    }
  });
  res.status(200).json(modelList);
});

app.get("/shoes/colorways", (_req, res) => {
  const shoes = getShoes();

  shoes.forEach((shoe: Shoe) => {
    if (!colorwayList.includes(shoe.colorway)) {
      colorwayList.push(shoe.colorway);
    }
  });

  res.status(200).json(colorwayList);
});

app.get("/shoes/years", (_req, res) => {
  const shoes = getShoes();

  shoes.forEach((shoe: Shoe) => {
    if (!releaseYearList.includes(shoe.releaseYear)) {
      releaseYearList.push(shoe.releaseYear);
    }
  });

  res.status(200).json(releaseYearList);
});

exports.app = functions.https.onRequest(app);
