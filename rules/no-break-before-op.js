'use strict';

module.exports = function (context) {

	var error = 'Lines must be broken after binary operators',
		lines = {};

	function checkOperators(node) {
		if (node.loc.start.line === node.loc.end.line ||
				lines[node.loc.start.line]
		) {
			return;
		}
		var source = context.getSource(node),

			// Not perfect, there are some false positives, such as:
			// 
			// var x = a +
			//   +b + c;
			// 
			regex = RegExp('^[ \\t]*\\' + node.operator, 'm');

		if (source.match(regex)) {
			lines[node.loc.start.line] = true;
			context.report(node, error);
		}
	}

	return {
		'BinaryExpression:exit': checkOperators
	};
};