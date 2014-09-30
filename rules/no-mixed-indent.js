'use strict';

module.exports = function (context) {

	var mode = (context.options && context.options[0]) || 'tabs',
		config = {
			spaces: {
				error: 'Using tabs for indentation',
				regex: /^ *\t+/
			},
			tabs: {
				error: 'Using spaces for indentation',
				regex: /^\t* +/
			}
		}[mode];

	return {
		Program: function (node) {
			var lines = context.getSourceLines(),
				length = lines.length,
				match,
				i;

			for (i = 0; i < length; i++) {
				match = config.regex.exec(lines[i]);

				if (match) {
					context.report(node, {
						line: i + 1,
						column: match.index + 1
					}, config.error);
				}
			}
		}
	};
};
