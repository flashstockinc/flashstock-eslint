'use strict';

function lineFinder(context, source) {
	var lines = source.split('\n'),
		MAX_ITERATIONS = 1024 * 1024;

	return function (node) {
		var prev = 0,
			following = 0,
			nodeSrc = context.getSource(node, prev, following),
			firstFind = source.indexOf(nodeSrc),
			lastFind = source.lastIndexOf(nodeSrc),
			counter = 0,
			line = 0;

		while (firstFind !== lastFind) {
			counter++;
			prev++;
			following++;

			nodeSrc = context.getSource(node, prev, following);
			firstFind = source.indexOf(nodeSrc);
			lastFind = source.lastIndexOf(nodeSrc);

			if (counter === MAX_ITERATIONS) {
				return null;
			}
		}

		firstFind = firstFind + prev;
		counter = 0;

		while (firstFind > lines[line].length) {
			firstFind -= lines[line].length;
			firstFind--;
			line++;
			counter++;

			if (counter === MAX_ITERATIONS) {
				return null;
			}
		}

		return {
			text: lines[line],
			number: line 
		};
	};
};

module.exports = function (MAX_LENGTH) {
	return function (context) {
		var linesWarned = {},
			error = 'Line above ' + MAX_LENGTH + ' characters.',
			finder;

		function checkLongLine(node) {
			var line = finder(node),
				length = lengthWithTabs(line.text);

			if (length > MAX_LENGTH && !linesWarned[line.number]) {
				linesWarned[line.number] = true;
				context.report(node, error);
			}
		}

		function lengthWithTabs(line) {
			var length = line.length,
				i = 0;

			while (line[i] === '\t') {
				length++;
				i++;
			}

			return length;
		}

		return {
			Program: function () {
				finder = lineFinder(context, context.getSource())
			},
			Statement: checkLongLine,
			EmptyStatement: checkLongLine,
			BlockStatement: checkLongLine,
			ExpressionStatement: checkLongLine,
			IfStatement: checkLongLine,
			LabeledStatement: checkLongLine,
			BreakStatement: checkLongLine,
			ContinueStatement: checkLongLine,
			WithStatement: checkLongLine,
			SwitchStatement: checkLongLine,
			ReturnStatement: checkLongLine,
			ThrowStatement: checkLongLine,
			TryStatement: checkLongLine,
			WhileStatement: checkLongLine,
			DoWhileStatement: checkLongLine,
			ForStatement: checkLongLine,
			ForInStatement: checkLongLine,
			ForOfStatement: checkLongLine,
			LetStatement: checkLongLine,
			DebuggerStatement: checkLongLine,
			Declaration: checkLongLine,
			FunctionDeclaration: checkLongLine,
			VariableDeclaration: checkLongLine,
			VariableDeclarator: checkLongLine,
		};

	};
}