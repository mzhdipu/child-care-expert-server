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
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xlu8zyp.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  serverApi: ServerApiVersion.v1 
});


async function run() {
    try {
      const childCareExpertDB = client.db("childCareExpertDatabase").collection("childCareExpertCollection");
  
      // Home 
      app.get('/services', async (req, res)=>{
        const query = {}
        const result = await childCareExpertDB.find(query).toArray()
        res.send(result)
      })

      // Services
      app.get('/services', async (req, res)=>{
        const query = {}
        const result = await childCareExpertDB.find(query).toArray()
        res.send(result)
      })

       app.post('/services', async (req, res)=>{
        const addServices = req.body
        const result = await childCareExpertDB.insertOne(addServices);
        res.send(result)
      })


      app.get('/services/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const service = await childCareExpertDB.findOne(query); 
        res.send(service); 
    });


    
    

      
      // Reviews
      const childCareExpertReviews = client.db("childCareExpertReviews").collection("childCareExpertReviewsCollection"); 

      app.get('/my-reviews', async (req, res)=>{
        const query = {}
        const result = await childCareExpertReviews.find(query).toArray()
        res.send(result)
      })

      app.post("/my-reviews", async (req, res)=>{
        const addReviews = req.body
        const result = await childCareExpertReviews.insertOne(addReviews);
        res.send(result)
      })

      // Review Delete 
      app.delete('/my-reviews/:id', async function (req, res) {
          const id = req.params.id;
          const query = { _id: ObjectId(id) };
          const result = await childCareExpertReviews.deleteOne(query);
          console.log(result);
          res.send(result);
        });
  

      
// Review find
app.get('/my-reviews/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const review = await childCareExpertReviews.findOne(query);
  res.send(review);
})


// Review Update
// app.put('/my-reviews/:id', async (req, res) => {
//   const id = req.params.id;
//   const query = { _id: ObjectId(id) };
//   const review = req.body;
//   const option = {upsert: true};
//   const updatedReview = {
//       $set: {
//           name : review.name,
//           email : review.email,
//           review : review.review
//       }
//   }
//   const result = await childCareExpertReviews.updateOne(query, updatedReview, option);
//   res.send(result);
// })
  


    app.delete('/my-reviews/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) }
      const result = await childCareExpertReviews.deleteOne(query);
      console.log(result);
      res.send(result);
    });


    } finally {
      
    }
  }
  run().catch(console.dir);



app.get("/", (req, res)=>{
    res.send('Child Care Expert Server is Running')
})

app.listen(port, () =>{
    console.log(`The Server Running Port is ${port}`)
})



