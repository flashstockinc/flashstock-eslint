'use strict';

module.exports = function (context) {

	var error = 'Object props. must be all contained in 1 line, or be in separate lines.';

	function checkLines(node) {
		var length = node.properties.length,
			start = node.loc.start.line,
			end = node.loc.end.line,
			multiple = false,
			line,
			oneLine,
			repeated,
			linesHash,
			i;

		if (start === end) {
			return;
		}

		linesHash = {};

		for (i = 0; i < length; i++) {
			line = node.properties[i].loc.start.line;

			if (line === start || line === end) {
				context.report(node, error);
				return;
			}

			if (linesHash[line]) {
				repeated = true;
			} else {
				linesHash[line] = true;
			}

			if (!oneLine) {
				oneLine = line;
			} else {
				multiple = line !== oneLine;
			}

			if (multiple && repeated) {
				context.report(node, error);
				return;
			}
		}
	}

	return {
		ObjectExpression: checkLines
	};
};
