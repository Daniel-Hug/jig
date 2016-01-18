// Make strings safe for innerHTML and attribute insertion (templates):
var escapeHTML = (function() {
	var entityMap = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#39;'
	},
	re = /[&<>"']/g;
	
	return function(str) {
		return String(str).replace(re, function (char) {
			return entityMap[char];
		});
	};
})();


// Templating:
var template = {};
(function(regExp) {
	// get the value of passed keys when chained on obj:
	// getVal(document, ['body', 'parentNode', 'children', 'length']);
	// => 2
	function getVal(obj, keys) {
		if (keys.length) {
			var nextObj = obj[keys[0]];
			return keys.length > 1 ?
				getVal(nextObj, keys.slice(1)) :
				nextObj;
		} else {
			return obj;
		}
	}

	// loop through scripts
	var templateScripts = document.querySelectorAll('script[data-template]');
	[].forEach.call(templateScripts, function(el) {
		var src = el.innerHTML;

		// data-template="comment" -> template.comment()
		template[el.dataset.template] = function(data) {

			// replace each {{of.these}}
			var newSrc = src.replace(regExp, function(match, key) {
				var keyChain = key.split('.');

				// {{{do_nothing}}
				var numCurlyBraces = match.length - key.length;
				return numCurlyBraces % 2 ? match :

					// {{{replace_without_escaping}}}
					numCurlyBraces === 6 ? getVal(data, keyChain) :

					// {{replace_with_escaped_string}}
					escapeHTML(getVal(data, keyChain));
			});

			return newSrc;
		};
	});
})(/{{{?([\w.]+)}}}?/g);