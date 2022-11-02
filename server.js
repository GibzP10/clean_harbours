const express = require('express');

const cors = require('cors');

require('dotenv').config()

const { PORT } = process.env;

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hit Homepage');
})


//hit this url to get the data: http://localhost:8000/api/getPickups
app.get('/pickups', (req, res) => {
  res.send('Pickup Page');
})

require('./app/routes/pickup.routes')(app);

app.listen(PORT, () => { console.log(`Server has begun at port ${PORT}`) });



module.exports = app;
