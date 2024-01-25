const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors'); 
const connectDB = require('./db'); 
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use(cors());
connectDB();

app.use('/', routes({ port: process.env.PORT || 5000 }));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is Running on http://localhost:${port}`);
});
