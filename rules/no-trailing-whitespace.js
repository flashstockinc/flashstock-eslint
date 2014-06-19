'use strict';

module.exports = function (context) {

	var error = 'General: trailing whitespace near {{lines}}';

	return {
		'Program': function (node) {
			var source = context.getSource(node),
				lines,
				wrongLines;

			if (source.match(/[ \t]$/m)) {
				lines = source.split('\n');
				wrongLines = [];

				lines.forEach(function (line, i) {
					if (line.match(/[ \t]$/) && !line.match(/^[\t ]+\/\//)) {
						wrongLines.push(i);
					}
				});

				if (wrongLines.length === 0) return;

				context.report(node, error, {
					lines: wrongLines.join(',')
				});
			}
		}
	};
};
