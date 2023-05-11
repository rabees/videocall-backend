const mongoose = require('mongoose');

// We will export the connection to the DB, which will be used in ther server.js
module.exports = () => {
  mongoose
    .connect("mongodb+srv://admin:1DsqqhrE02mEs3Wj@atlascluster.dogkuxg.mongodb.net/test")
    .then(() => console.log(`CONNECTED`))
    .catch((err) => console.log(`Cannot connect`, err));
};
