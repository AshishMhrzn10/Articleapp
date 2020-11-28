var express = require("express");
var path = require("path");
//Init app
var app = express();

//Load view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//Home route
app.get("/", function (req, res) {
	let articles = [
		{
			id: 1,
			title: "Article 1",
			author: "Ashish",
			body: "This is test 1",
		},
		{
			id: 2,
			title: "Article 2",
			author: "John Doe",
			body: "This is test 2",
		},
		{
			id: 3,
			title: "Article 3",
			author: "Ashish",
			body: "This is test 3",
		},
	];
	res.render("index", {
		title: "Hello",
		articles: articles,
	});
});

//Add route
app.get("/articles/add", function (req, res) {
	res.render("add_article", {
		title: "Add article",
	});
});

//Start server
app.listen(3000, function () {
	console.log("Server started on port 3000...");
});
