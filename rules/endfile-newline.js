'use strict';


// This rule does not work, since the API does not give access to the actual
// file contents


// module.exports = function (context) {

// 	var excessError = 'General: too many newlines at the end of the file',
// 		lackError = 'No newline at the end of file';


// 	return {
// 		'Program': function (node) {
// 			var source = context.getSource(node);

// 			if (source.match(/[^\n]$/)) {
// 				context.report(node, lackError);
// 			} else if (source.match(/\n\n/)) {
// 				context.report(node, excessError);
// 			}
// 		}
// 	};
// };
