'use strict';

module.exports = function (context) {

	var error = 'There should be a space between ) and {',
		BLOCKS = {
			'FunctionDeclaration': 'body',
			'FunctionExpression': 'body',
			'IfStatement': 'consequent',
			'WhileStatement': 'body',
			'ForStatement': 'body',
			'ForInStatement': 'body',
			'ForOfStatement': 'body',
			'CatchClause': 'body',
		}

	function checkBracketSpacing(node) {
		var source = context.getSource(node),
			block = node[BLOCKS[node.type]],
			blockSource = context.getSource(block),
			index = source.indexOf(blockSource);

		if (source[index] === '{' && source[index - 1] === ')') {
			context.report(node, error);
		}
	}


	return {
		'FunctionDeclaration': checkBracketSpacing,
		'FunctionExpression': checkBracketSpacing,
		'IfStatement': checkBracketSpacing,
		'WhileStatement': checkBracketSpacing,
		'ForStatement': checkBracketSpacing,
		'ForInStatement': checkBracketSpacing,
		'ForOfStatement': checkBracketSpacing,
		'CatchClause': checkBracketSpacing,
		// TO DO: We are not testing switch statements
	};
};
