const mongoose = require('mongoose');

// Database URI
const MONG_URI = 'mongodb://localhost:27017/lab_Iek6';  // Replace with your DB URI

// Establish MongoDB connection
mongoose.connect(MONG_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => {
    console.log('Connection is successful to ' + MONG_URI);
}).catch((err) => {
    console.error('Error occurred: ' + err);
});

module.exports = mongoose.connection;  // Export the connection object
