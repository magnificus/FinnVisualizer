
const express = require('express');
const cors = require('cors');



require("isomorphic-fetch")
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

 const mapRouter = require('./routes/map')
 app.use("/map", mapRouter);

app.listen(port, () => {

    console.log(`Server is running on port: ${port}`);
});