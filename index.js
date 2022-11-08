const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// Middelware Setup
app.use(cors());
app.use(express.json());

// require dot env
require('dotenv').config();

// Connect MongoDB
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xlu8zyp.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  serverApi: ServerApiVersion.v1 
});

app.get("/", (req, res)=>{
    res.send('Child Care Expert Server is Running')
})

app.listen(port, () =>{
    console.log(`The Server Running Port is ${port}`)
})