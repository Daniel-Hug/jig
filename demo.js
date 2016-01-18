function renderComment(commentData) {
	var html = template.comment(commentData);

	var commentsEl = document.getElementById('comments');
	commentsEl.insertAdjacentHTML('beforeend', html);
}


renderComment({
	author: {
		username: 'joey12',
		full_name: 'Joe Sparks'
	},
	comment_html: 'Does <em>this</em> support <strong>markdown</strong>?'
});