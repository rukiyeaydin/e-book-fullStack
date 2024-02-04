const express = require("express")
const cors = require('cors');
const app = express()
const mongoose = require("mongoose")
const PORT = 5000
const { MONGOURI }= require('./keys')

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
mongoose.connection.on('connected', () => {
  console.log("connected to mongo");
})
mongoose.connection.on('error', (err) => {
  console.log("connecting error to mongo", err);
})

require('./models/user')
require('./models/book')

app.use(express.json())
app.use(cors());

app.use(require('./routes/auth'))
app.use(require('./routes/book'))
app.use(require('./routes/user'))


app.listen(PORT, () => {
  console.log("server is running");
})