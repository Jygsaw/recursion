// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  // your code here
  var node = arguments[1] !== undefined ? arguments[1] : document.body;
  var result = [];

  // checking className against classList
  if (node.classList !== undefined && node.classList !== null) {
	var classArray = Array.prototype.slice.call(node.classList);
	for (var i = 0; i < classArray.length; i++) {
	  if (className === classArray[i]) {
		result.push(node);
	  }
	}
  }

  // recursing through children if necessary
  if (node.hasChildNodes()) {
	var childNodes = node.childNodes;
	for (var i = 0; i < childNodes.length; i++) {
	  var childResult = getElementsByClassName(className, childNodes[i]);
	  if (childResult.length > 0) {
		result = result.concat(childResult);
	  }
	}
  }

  return result;
};
