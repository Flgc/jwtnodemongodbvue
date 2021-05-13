const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(
  'mongodb://localhost:27017/api',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  },
  function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('MongoDB CONNECTED Sucessifully');
    }
  }
);

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get('/', function (req, res) {
  res.json({ message: 'Hello World' });
});

app.listen(port, function () {
  console.log(`Server runing on PORT: ${port}`);
});
