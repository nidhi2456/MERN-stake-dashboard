// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const PORT = 5000;



// Middleware


// app.use(bodyParser.json());
// app.use(cors());



// Connect to MongoDB



// mongoose.connect('mongodb://localhost:27017/mern_dashboard', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });





// Define a schema and model


// const DataSchema = new mongoose.Schema({}, { strict: false });
// const DataModel = mongoose.model('Data', DataSchema);



// Load initial data from JSON file


// const loadInitialData = async () => {
//   try {
//     const dataPath = path.join(__dirname, 'data.json');
//     const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
//     await DataModel.deleteMany({});
//     await DataModel.insertMany(data);
//     console.log('Initial data loaded');
//   } catch (err) {
//     console.error(err);
//   }
// };




// REST API Endpoints


// app.get('/api/data', async (req, res) => {
//   try {
//     const data = await DataModel.find({});
//     res.json(data);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// app.post('/api/data', async (req, res) => {
//   try {
//     const newData = new DataModel(req.body);
//     await newData.save();
//     res.status(201).send(newData);
//   } catch (err) {
//     res.status(400).send(err);
//   }
// });

// Load initial data and start server


// loadInitialData().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//   });
// });

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mern_dashboard', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a schema and model
const DataSchema = new mongoose.Schema({}, { strict: false });
const DataModel = mongoose.model('Data', DataSchema);

// Load initial data from JSON file
const loadInitialData = async () => {
  try {
    const dataPath = path.join(__dirname, 'data.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    await DataModel.deleteMany({});
    await DataModel.insertMany(data);
    console.log('Initial data loaded');
  } catch (err) {
    console.error(err);
  }
};

// REST API Endpoints
app.get('/api/data', async (req, res) => {
  try {
    const data = await DataModel.find({});
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Load initial data and start server
loadInitialData().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
