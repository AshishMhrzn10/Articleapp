var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/nodekb", { useNewUrlParser: true });
let db = mongoose.connection;

//Check connection
db.once("open", function () {
	console.log("Connected to mongo db");
});

//Check for db errors
db.on("error", function (err) {
	console.log(err);
});

//Init app
var app = express();

//Bring in models
let Article = require("./models/article");

//Load view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Home route
app.get("/", function (req, res) {
	Article.find({}, function (err, articles) {
		if (err) {
			console.log(err);
		} else {
			res.render("index", {
				title: "Hello",
				articles: articles,
			});
		}
	});
});

//Add route
app.get("/articles/add", function (req, res) {
	res.render("add_article", {
		title: "Add article",
	});
});

//Add submit post route
app.post("/articles/add", function (req, res) {
	let article = new Article();
	article.title = req.body.title;
	article.author = req.body.author;
	article.body = req.body.body;

	article.save(function (err) {
		if (err) {
			console.log(err);
			return;
		} else {
			res.redirect("/");
		}
	});
});

//Start server
app.listen(3000, function () {
	console.log("Server started on port 3000...");
});
