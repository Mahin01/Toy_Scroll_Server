const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(cors());

const carDataByCat = require("./fakeData/carsDataByCat.json");

app.get("/", (req, res) => {
  res.send("Toy Scrolls server Running");
});

app.get("/cars-by-category", (req, res) => {
  res.send(carDataByCat);
});

app.listen(port, () => {
  console.log(`Toy Scrolls running on port: ${port}`);
});