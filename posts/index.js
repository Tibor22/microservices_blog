const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const posts = {};

app.get('/posts', (req, res) => {
	res.send(posts);
});
app.post('/posts', (req, res) => {
	const id = randomBytes(4).toString('hex');
	const { title } = req.body;
	posts[id] = { title: title, id };

	res.status(201).send(posts[id]);
});
app.get('/posts/:id/comments', (req, res) => {
	const postId = req.params.id;
	res.send(posts[postId]);
});
app.post('/posts/:id/comments', (req, res) => {
	const id = randomBytes(4).toString('hex');
	const { content } = req.body;
	const postId = req.params.id;
	console.log(posts[postId]);
	posts[postId].comments = { [id]: { content: content, id } };
	res.status(201).send(posts[postId]);
});

app.listen(4000, () => {
	console.log('listening on port:4000');
});
