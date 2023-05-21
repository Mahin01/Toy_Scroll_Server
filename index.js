const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const carDataByCat = require("./fakeData/carsDataByCat.json");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hcrmfrb.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const allToysCollection = client.db("toy-scroll").collection("all-toys");

    app.get("/all-toys", async (req, res) => {
      const cursor = allToysCollection.find().limit(20);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get('/toy-details/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }

      const options = {
          // Include only the `title` and `imdb` fields in the returned document
          projection: { 
            seller_name: 1, price: 1, seller_email :1, 
            ToyName:1, quantity:1, Photo_URL: 1 },
      };

      const result = await allToysCollection.findOne(query, options);
      res.send(result);
    });

    

    app.post('/add-toy', async (req, res) => {
      const newToy = req.body;
      console.log(newToy);
      const result = await allToysCollection.insertOne(newToy);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Toy Scrolls server Running");
});

app.get("/cars-by-category", (req, res) => {
  res.send(carDataByCat);
});

app.listen(port, () => {
  console.log(`Toy Scrolls running on port: ${port}`);
});
