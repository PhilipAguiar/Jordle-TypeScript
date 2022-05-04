// const SneaksAPI = require("sneaks-api");
const functions = require("firebase-functions");
const fs = require("fs");
const cors = require("cors");
import * as express from 'express';
const SneaksAPI = require("sneaks-api");
const sneaks = new SneaksAPI();

const app = express();

app.use(express.json());
app.use(cors());

type Shoe = {
  model: string;
  colorway: string;
  releaseYear: number;
  imageURL: string;
};

// let shoeList: Shoe[] = [];
// let modelNumber: number = 1;

// for (let i = modelNumber; i <= 26; i++) {
//   sneaks.getProducts(`Jordan ${i}`, 30, function (err: unknown, products: any) {
//     if (products) {
//       products.forEach((product: any) => {
//         if(product.make && product.releaseDate && product.shoeName && product.thumbnail){
//           let colorWay: string = product.shoeName.replace(product.make + " ", "");
//           let releaseYear: number = parseInt(product.releaseDate.split("-")[0]);
  
//           let newShoe: Shoe = {
//             model: product.make,
//             colorway: colorWay,
//             releaseYear: releaseYear,
//             imageURL: product.thumbnail,
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

exports.app = functions.https.onRequest(app);
