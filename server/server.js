const express = require('express')
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());


// --- CONNECT TO DB USING MONGOOSE ---
require('./config/mongoose.config');

// --- IMPORTS ROUTES after teh DB is connected ---
require('./routes/dev.routes')(app);


app.listen(port, () => console.log(`>>>>Listening on port ${port}<<<<`))