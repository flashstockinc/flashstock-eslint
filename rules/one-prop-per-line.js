'use strict';

module.exports = function (context) {

	var error = 'Object literal must be contained in 1 line, or have 1 prop. per line.';

	function checkLines(node) {
		var linesHash = {},
			length = node.properties.length,
			line,
			i;

		if (node.loc.start.line === node.loc.end.line) {
			return;
		}

		linesHash[node.loc.start.line] = true;
		linesHash[node.loc.end.line] = true;

		for (i = 0; i < length; i++) {
			line = node.properties[i].loc.start.line;

			if (linesHash[line]) {
				context.report(node, error);
				return;
			} else {
				linesHash[line] = true;
			}
		}
	}

	return {
		ObjectExpression: checkLines,
	};
};
