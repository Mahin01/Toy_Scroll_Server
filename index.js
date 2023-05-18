const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Toy Scrolls server Running");
});

app.listen(port, () => {
  console.log(`Toy Scrolls running on port: ${port}`);
});