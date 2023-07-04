const mongoose = require('mongoose');

// We will export the connection to the DB, which will be used in the server.js
module.exports = () => {
  mongoose
    .connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));
};
