// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
var stringifyJSON = function(obj) {
	// your code goes here
	var key = typeof obj;
	// catch edge case where arrays are objects
	if (key === "object" && Array.isArray(obj)) key = "array";

	var conversionFuncs = {
		string: function(obj) {
			var result = "\"" + obj + "\"";
			return result;
		},
		number: function(obj) {
			var result = obj.toString();
			return result;
		},
		boolean: function(obj) {
			var result = obj.toString();
			return result;
		},
		object: function(obj) {
			// check for null edge case
			if (obj === null) {
				return "null";
			}
			// stringify object
			var result = "{";
			for (var key in obj) {
				var substring = stringifyJSON(obj[key]);
				if (substring !== undefined) {
					result += "\"" + key + "\"" + ":";
					result += substring + ",";
				}
			}
			if (result.slice(-1) === ",") result = result.slice(0, -1);
			result += "}";
			return result;
		},
		array: function(obj) {
			var result = "[";
			for (var i = 0; i < obj.length; i++) {
				var substring = stringifyJSON(obj[i]);
				if (substring !== undefined) {
					result += substring + ",";
				}
			}
			if (result.slice(-1) === ",") result = result.slice(0, -1);
			result += "]";
			return result;
		},
		function: function(obj) {
			return undefined;
		},
		undefined: function(obj) {
			return undefined;
		}
	}

	// convert obj to string
	return conversionFuncs[key](obj);
};
