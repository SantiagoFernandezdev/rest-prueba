require('./config/config');

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");

 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());

app.use(express.static(`${__dirname}/public`));

app.use( require('./routes/index'));




mongoose.connect(process.env.URLDB, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false}, (err) => {
     if (err) throw new Error(err);
     console.log('Base de datos ONLINE');
})

app.listen(process.env.PORT, () => {
     console.log(`Corriendo en puerto ${process.env.PORT}`);
})


