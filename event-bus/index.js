const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const events = [];

app.post("/events", async (req, res) => {
	const event = req.body;
	events.push(event);
	try {
		await axios.post("http://posts-clusterip-srv:4000/events", event); //posts
		await axios.post("http://comments-srv:4001/events", event); //comments
		await axios.post("http://query-srv:4002/events", event); //query
		await axios.post("http://moderation-srv:4003/events", event); //moderation

		res.send({ status: "OK" });
	} catch (e) {
		console.log(e);
	}
});

app.get("/events", async (req, res) => {
	res.send(events);
});

app.listen(4005, () => {
	console.log("listening on port:4005");
});
