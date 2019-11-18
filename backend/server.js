const express = require('express');
const cors = require('cors');

require("isomorphic-fetch")
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

function testFetch(){
    (async () => {
    const response = await fetch('https://google.com');
    const text = await response.text();
    console.log(text);
  })();
  }


app.listen(port, () => {
    testFetch();


    console.log(`Server is running on port: ${port}`);
});