//Dependencies
const express = require("express");
const open = require("open");
const path = require("path");
const app = express();
const port = 3000;


//Serve all the files in the folder as static assets
app.use(express.static("./"));
//Start server
app.listen(port, (err) => {
    if (err) { console.log(err); }
    else { open(`http://localhost:${port}`) }
});


