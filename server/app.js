require('dotenv').config(); // .env dosyasını yükler

const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");

const app = express();

const MONGOURI = process.env.MONGOURI;
const PORT = process.env.PORT || 5000; 

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log("connected to mongo");
});

mongoose.connection.on('error', (err) => {
  console.log("connecting error to mongo", err);
});

require('./models/user');
require('./models/book');


app.use(express.json());
app.use(cors());

app.use(require('./routes/auth'));
app.use(require('./routes/book'));
app.use(require('./routes/user'));

// Sunucuyu başlatın
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
