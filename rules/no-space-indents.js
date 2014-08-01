'use strict';

module.exports = function (context) {

	var error = 'Using spaces for indentation.',
		regex = /^\t* +/;

	return {
		Program: function (node) {
			var lines = context.getSourceLines(),
				length = lines.length,
				match,
				i;

			for (i = 0; i < length; i++) {
				match = regex.exec(lines[i]);

				if (match) {
					context.report(node, {
						line: i + 1,
						column: match.index + 1
					}, error);
				}
			}
		}
	};
};