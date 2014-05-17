// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  console.log('===== PARSING =====');
  console.log('json: ' + json);
  var remainder = json;

  // identify type and parse next value of JSON string
  function parseValue() {
    var result;
    var next = remainder.slice(0, 1);
    var elem;
    if (next === '[') {
      console.log('> ARRAY DETECTED <');
      parseNext();
      elem = parseElem([']']);
      result = parseArray(elem);
    } else if (next === '{') {
      parseNext();
      console.log('> OBJECT DETECTED <');
      parseNext();
      elem = parseElem([']']);
      result = parseObject(elem);
    } else if (next === '"') {
      console.log('> STRING DETECTED <');
      parseNext();
      elem = parseElem(['"']);
      result = parseString(elem);
    } else if (next === 't') {
      console.log('> TRUE DETECTED <');
      elem = parseElem([]);
      result = parseTrue(elem);
    } else if (next === 'f') {
      console.log('> FALSE DETECTED <');
      elem = parseElem([]);
      result = parseFalse(elem);
    } else if (next === 'n') {
      console.log('> NULL DETECTED <');
      elem = parseElem([]);
      result = parseNull(elem);
    } else {
      console.log('> NUMBER DETECTED <');
      elem = parseElem([]);
      result = parseNumber(elem);
    }
    return result;
  }

  // parse next element delimited by any value in given array
  function parseElem(delimArray) {
    var elem = '';
    var next = parseNext();
    while(next !== '' && delimArray.indexOf(next) === -1)  {
      elem = elem + next;
      next = parseNext();
    }
    return elem;
  }

  // parse array
  function parseArray(arrayStr) {
    var result = [];
    console.log("array str: " + arrayStr);
    return result;
  }

  // parse object
  function parseObject() {
    var result = {};
    while (remainder.length > 0 && next !== '}') {
    }
    return result;
  }

  // parse string
  function parseString(elem) {
    return elem;
  }

  // parse true
  function parseTrue(elem) {
    console.log(">>> PARSING TRUE <<<");
    var result = undefined;
    if (elem.slice(0, 4) === 'true') {
      result = true;
    }
    return result;
  }

  // parse false
  function parseFalse(elem) {
    console.log(">>> PARSING FALSE <<<");
    var result = undefined;
    if (elem.slice(0, 5) === 'false') {
      result = false;
    }
    return result;
  }

  // parse null
  function parseNull(elem) {
    console.log(">>> PARSING NULL <<<");
    var result = undefined;
    if (elem.slice(0, 4) === 'null') {
      result = null;
    }
    return result;
  }

  // parse number
  function parseNumber(elem) {
    console.log(">>> PARSING NUMBER <<<");
    return +elem;
  }

  // parse next char
  function parseNext() {
    var next = remainder.slice(0, 1);
    remainder = remainder.slice(1);
    return next;
  }

  return parseValue();
}
