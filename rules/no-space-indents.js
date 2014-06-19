'use strict';

module.exports = function (context) {

	var error = 'General: using spaces for indentation near {{lines}}';


	return {
		'Program': function (node) {
			var source = context.getSource(node),
				lines,
				wrongLines;

			if (source.match(/^\t* +\t*/m)) {
				lines = source.split('\n');
				wrongLines = [];

				lines.forEach(function (line, i) {
					if (line.match(/^\t* +\t*/)) {
						wrongLines.push(i);
					}
				});

				context.report(node, error, {
					lines: wrongLines.join(',')
				});
			}
		}
	};
};
