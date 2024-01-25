const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.dbURI;

const connectDB = async () => {
    try {
      await mongoose.connect(uri, {});
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  };

  module.exports=connectDB;