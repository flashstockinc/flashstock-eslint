'use strict';

module.exports = function(context) {

	function checkBody(node, body, name, suffix, hard) {
		var hasBlock = (body.type === 'BlockStatement'),
			oneLine = node.loc.start.line === node.loc.end.line;

		if (!hasBlock && (!oneLine || hard)) {
			context.report(node, 'Expected { after \'{{name}}\'{{suffix}}.', {
				name: name,
				suffix: (suffix ? ' ' + suffix : '')
			});
		}
	}

	//--------------------------------------------------------------------------
	// Public
	//--------------------------------------------------------------------------

	return {

		'IfStatement': function(node) {

			checkBody(node, node.consequent, 'if', 'condition');

			if (node.alternate && node.alternate.type !== 'IfStatement') {
				checkBody(node, node.alternate, 'else', '', true);
			}

		},

		'WhileStatement': function(node) {
			checkBody(node, node.body, 'while', 'condition');
		},

		'DoWhileStatement': function (node) {
			checkBody(node, node.body, 'do', '', true);
		},

		'ForStatement': function(node) {
			checkBody(node, node.body, 'for', 'condition');
		}
	};

};