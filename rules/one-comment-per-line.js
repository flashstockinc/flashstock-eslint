'use strict';

module.exports = function (context) {

	var error = 'Each comment should be in its own line',
		regex = /^\s*\/\//,
		lines;

	function checkComments(node) {
		if (!regex.exec(lines[node.loc.start.line - 1])) {
			return context.report(node, error);
		}
	}


	return {
		Program: function () {
			lines = context.getSourceLines();
		},
		LineComment: checkComments
	};
};
