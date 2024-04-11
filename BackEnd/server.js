// Import required modules
const express = require('express')
const app = express()
const port = 4000;
const cors = require('cors');

// Enable CORS(Cross-Origin Resource Sharing) middleware
app.use(cors());
// Additional headers for CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Body parsing middleware to handle JSON and URL-encoded data
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
const mongoose = require('mongoose');
// Call the main function to connect to MongoDB
main().catch(err => console.log(err));

async function main() {
    // username:password
    await mongoose.connect('mongodb+srv://User:user2023@cluster0.aarrxqk.mongodb.net/');
}

// Bird schema definition
const birdSchema = new mongoose.Schema({
    name:String,
    latinName:String,
    picture:String,
    type:String,
    sighting:String
})
    
// Create a model based on the bird schema 
const birdModel = mongoose.model(`my_birds`, birdSchema)

// Handle DELETE request to delete a bird by ID
app.delete('/api/bird/:id', async (req, res) => {
    console.log("Delete: " + req.params.id)

    // Find and delete the bird by ID
    let bird = await birdModel.findByIdAndDelete(req.params.id);
    res.send(bird);
})

// Updating existing data using id
app.put('/api/bird/:id', async (req,res)=>{

    console.log("Update: "+req.params.id);

    //await so it changes it only after finding the bird
    let bird = await birdModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
    res.send(bird);
})

// Add a new bird
app.post('/api/bird', (req, res) => {
    // Logging the received data to the console
    console.log(req.body.id);
    // Sending a response message
    // res.send("Data Received!");
    birdModel.create({
        name:req.body.name,
        latinName:req.body.latinName,
        picture:req.body.picture,
        type:req.body.type,
        sighting:req.body.sighting
    })
    .then(() =>{res.send("Bird added")})
    .catch(() =>{res.send("Bird not added")})
})

app.get(`/api/bird/:id`, async (req, res)=>{
    console.log(req.params.id);

    let bird = await birdModel.findById({_id:req.params.id})
    res.send(bird);
})

// Handling a GET request to '/api/birds'
app.get('/api/birds', async (req, res) => {

    let birds = await birdModel.find({});
    res.json(birds);
})

// Start the Express app and listen on the specified port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})