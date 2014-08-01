'use strict';

module.exports = function (context) {

	var multipleError = 'Multiple variable initializations per line.',
		groupError = 'Uninitialized vars must be grouped at the top ' +
			'or bottom of the declaration.';

	return {
		VariableDeclaration: function (node) {
			var lines = {},
				minLine = Number.POSITIVE_INFINITY,
				maxLine = Number.NEGATIVE_INFINITY,
				above = false,
				below = false,
				i, line, declaration;

			for (i = 0; i < node.declarations.length; i++) {
				declaration = node.declarations[i];
				line = declaration.loc.start.line;

				if (declaration.init) {
					if (lines[line]) {
						context.report(declaration, multipleError);
						return;
					} else {
						if (line < minLine) {
							minLine = line;
						}
						if (line > maxLine) {
							maxLine = line;
						}
					}
				}

				lines[line] = true;
			}

			if (minLine > maxLine) return;

			for (i = 0; i < node.declarations.length; i++) {
				declaration = node.declarations[i];
				line = declaration.loc.start.line;

				if (!declaration.init) {
					if (line <= minLine) {
						above = true;
					}
					if (line >= maxLine) {
						below = true;
					}
					if (above && below) {
						context.report(declaration, groupError);
						return;
					}
				}
			}
		},
	};
};
