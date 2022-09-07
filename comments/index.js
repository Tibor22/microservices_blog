const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const axios = require('axios');
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
	res.send(commentsByPostId[req.params.id] || []);
});
app.post('/posts/:id/comments', async (req, res) => {
	const commentId = randomBytes(4).toString('hex');
	const { content } = req.body;
	const comments = commentsByPostId[req.params.id] || [];

	comments.push({ id: commentId, content });
	commentsByPostId[req.params.id] = comments;
	try {
		await axios.post('http://localhost:4005/events', {
			type: 'CommentCreated',
			data: { commentId, content, postId: req.params.id },
		});
	} catch (e) {
		console.log(e);
	}

	res.status(201).send(comments);
});

app.listen(4001, () => {
	console.log('listening on port:4001');
});
