import React from 'react';

const CommentList = ({ comments }) => {
	const renderedComments = comments.map((comment) => {
		return (
			<li key={comment.id}>
				{comment.status === 'approved' && comment.content}
				{comment.status === 'pending' && 'This comment is awaiting moderation'}
				{comment.status === 'rejected' && 'This comment has been rejected'}
			</li>
		);
	});

	return <ul>{renderedComments}</ul>;
};

export default CommentList;
