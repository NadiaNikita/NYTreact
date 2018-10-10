'use strict'

// Server Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

// Schema
const Article = require("./models/Article");

// Express
const app = express();
//  port.
const PORT = process.env.PORT || 8080;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// -------------------------------------------------

// MongoDB Config
mongoose.connect("mongodb://<Nadia22>:<NadiaNikita1>@ds227243.mlab.com:27243/nytreact");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// saved articles.
app.get("/api/saved", function(req, res) {

  // We will find all the records, sort it in descending order, then limit the records to 5
  Article.find({}).limit(10).exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.send(doc);
    }
  });
});

//  placeholder function runSearch(term){
	// 	return axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=f00d8dbd623a99f7d310810bf38cff90:9:74629258&q=" + term)
	// 		.then(function(results){
	// 			console.log(results)
	// 			for (var i = 0; i < results.data.response.docs.length; i++) {
	// 				console.log(results.data.response.docs[i].headline.main)
// 			}


app.get("*", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});




app.post("/api/saved", function(req, res) {
  console.log("Article title: " + req.body.title);
  console.log("Article date: " + req.body.date);
  console.log("Article url: ") + req.body.url;


  Article.create({
    title: req.body.title,
    date: req.body.date,
    url: req.body.url
  }, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      res.send("Saved Article");
    }
  });
});


app.delete("/api/saved/:id", function(req, res) {

  console.log("Article ID to delete: " + req.params.id);

  Article.findByIdAndRemove(req.params.id, function (err, response) {
    if(err){
      res.send("Delete didn't work: " + err);
    }
    res.send(response);
  });
});

// Listener.
app.listen(PORT, () => {
  console.log("App listening on PORT: " + PORT);
});
