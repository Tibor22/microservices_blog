const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
	res.send(posts);
});
app.post("/posts", async (req, res) => {
	try {
		const id = randomBytes(4).toString("hex");
		const { title } = req.body;
		posts[id] = { title: title, id };

		await axios.post("http://event-bus-srv:4005", {
			type: "PostCreated",
			data: { id, title },
		});

		res.status(201).send(posts[id]);
	} catch (e) {
		console.log(e);
	}
});

app.post("/events", (req, res) => {
	console.log("Received Event:", req.body.type);

	res.send({});
});

app.listen(4000, () => {
	console.log("v55");
	console.log("listening on port:4000");
});
