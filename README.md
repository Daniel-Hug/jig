# jig
lightweight logicless templating with HTML escaping

## usage

1. Include [jig.js](jig.js)

2. Put templates in `<script>` elements

	```html
	<script data-template="comment" type="text/template">
		<li><a href="/user/{{author.username}}">{{author.full_name}}</a>:
		{{{comment_html}}}</li>
	</script>
	```

3. Render templates with `template.template_name(data)`

	```js
	var html = template.comment({
		author: {
			username: 'joey12',
			full_name: 'Joe Sparks'
		},
		comment_html: 'Does <em>this</em> support <strong>markdown</strong>?'
	});
	```

4. Append to DOM with [`Element.insertAdjacentHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML)

	```js
	var commentsEl = document.getElementById('comments');
	commentsEl.insertAdjacentHTML('beforeend', html);
	```
