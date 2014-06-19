'use strict';

module.exports = function (context) {

	var smallError = 'General: line{{plural}} beyond 80 characters near {{lines}}',
		bigError = 'General: line{{plural}} beyond 100 characters near {{lines}}!';

	return {
		'Program': function (node) {
			var lines = context.getSource(node).split('\n'),
				lengths = lines.map(function (line) {
					var length = line.length,
						i = 0;

					while (line[i] && line[i] === '\t') {
						length++;
						i++;
					}

					return length;
				}),
				beyond80 = false,
				beyond100 = false,
				longLines100 = [],
				longLines80 = [];

			lengths.forEach(function (length, i) {
				if (length > 100) {
					beyond100 = true;
					longLines100.push(i);
				} else if (length > 80) {
					beyond80 = true;
					longLines80.push(i);
				}
			});

			if (beyond100) {
				context.report(node, bigError, {
					lines: longLines100.join(','),
					plural: longLines100.length > 1 ? 's' : ''
				});
			}
			if (beyond80) {
				context.report(node, smallError, {
					lines: longLines80.join(','),
					plural: longLines80.length > 1 ? 's' : ''
				});
			}
		},
	};
};
