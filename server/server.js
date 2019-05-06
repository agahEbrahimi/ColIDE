const express = require("express");
const cors = require('cors');
const expressApp = express();

expressApp.use(cors());
expressApp.use(express.json());
expressApp.use(require('./controller'));

expressApp.listen(4000, () => console.log("Express Server is Running"));