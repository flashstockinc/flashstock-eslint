'use strict';

module.exports = function (context) {

	var error = 'Missing space between \'function\' and (.';

	function checkBracketSpacing(node) {
		var match;

		if (!node.id) {
			match = context.getSource(node).match(/^function\(/);

			if (match) {
				context.report(node, error);
			}
		}
	}


	return {
		'FunctionDeclaration': checkBracketSpacing,
		'FunctionExpression': checkBracketSpacing,
	};
};
