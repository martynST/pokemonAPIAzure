//Dependencies
const express = require("express");
const open = require("open");
const path = require("path");
const app = express();
const port = 8080;


//Serve all the files in the folder as static assets
app.use(express.static("./"));
//Start server
app.listen(process.env.PORT || 8080));


