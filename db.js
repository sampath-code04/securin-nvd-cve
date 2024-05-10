const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/my_database'; // Replace 'my_database' with your actual database name

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

const db = mongoose.connection;

// Event handlers for MongoDB connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('MongoDB connection successful.');
});

module.exports = db;
