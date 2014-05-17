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
    console.log('next: ' + next);

    if (next === '[') {
      console.log('> ARRAY DETECTED <');
      result = parseArray();
    } else if (next === '{') {
      console.log('> OBJECT DETECTED <');
      result = parseObject();
    } else if (next === '"') {
      console.log('> STRING DETECTED <');
      result = parseString();
    } else if (next === 't') {
      console.log('> TRUE DETECTED <');
      result = parseTrue();
    } else if (next === 'f') {
      console.log('> FALSE DETECTED <');
      result = parseFalse();
    } else if (next === 'n') {
      console.log('> NULL DETECTED <');
      result = parseNull();
    } else {
      console.log('> NUMBER DETECTED <');
      result = parseNumber();
    }

    return result;
  }

  // parse array
  function parseArray() {
    var result = [];
    setNext();
    while (remainder.length > 0 && next !== ']') {
      result.push(parseValue());
    }
    return result;
  }

  // parse object
  function parseObject() {
    var result = {};
    setNext();
    while (remainder.length > 0 && next !== '}') {
    }
    return result;
  }

  // parse string
  function parseString() {
    var result = '';
    return result;
  }

  // parse true
  function parseTrue() {
    var result = undefined;
    if (remainder.slice(0, 4) === 'true') {
      remainder = remainder.slice(4);
      result = true;
    }
    return result;
  }

  // parse false
  function parseFalse() {
    var result = undefined;
    if (remainder.slice(0, 5) === 'false') {
      remainder = remainder.slice(5);
      result = false;
    }
    return result;
  }

  // parse null
  function parseNull() {
    var result = undefined;
    if (remainder.slice(0, 4) === 'null') {
      remainder = remainder.slice(4);
      result = null;
    }
    return result;
  }

  // parse number
  function parseNumber() {
    console.log(">>> PARSING NUMBER <<<");
    var result = "";
    var next = parseNext();
    while (next !== "") {
      result = result + next;
      next = parseNext();
    }
    return +result;
  }

  // parse next char
  function parseNext() {
    var next = remainder.slice(0, 1);
    remainder = remainder.slice(1);
    return next;
  }

  // parse string
  function parseString2() {
    var result = '';
    setNext();
    while (remainder.length > 0 && next !== '"') {
      result = result + next;
      setNext();
    }
    console.log('string return: ' + result);
    return result;
  }

  // parse number
  function parseNumber2() {
    var result = next;
    while (remainder.length > 0) {
      setNext();
      result = result + next;
    }
    return +result;
  }

  // parse next char of JSON string
  function setNext2() {
    next = remainder.slice(0, 1);
    remainder = remainder.slice(1);
    console.log('set next: ' + next);
    console.log('set remainder: ' + remainder);
  }

  // parse next value of JSON string
  function parseValue2() {
    var result;

    // parse next value
    while (remainder.length > 0) {
      setNext();
      console.log('next: ' + next);
      if (next === '{') {
        console.log('> OBJECT DETECTED <');
        result = {};
      } else if (next === '[') {
        console.log('> ARRAY DETECTED <');
        result = parseArray();

        console.log('pre remainder: ' + remainder);
        var testVal = parseJSON(remainder);
        console.log('testval: ' + testVal);
        console.log('post remainder: ' + remainder);

      } else if (next === '"') {
        console.log('> STRING DETECTED <');
        result = parseString();
      } else {
        console.log('> VALUE DETECTED <');
        if (next === 't') {
          console.log('> POSSIBLE TRUE DETECTED <');
          var checkStr = remainder.slice(0, 3);
          remainder = remainder.slice(3);
          if (checkStr === 'rue') {
            result = true;
          }
        } else if (next === 'f') {
          console.log('> POSSIBLE FALSE DETECTED <');
          var checkStr = remainder.slice(0, 4);
          remainder = remainder.slice(4);
          if (checkStr === 'alse') {
            result = false;
          }
        } else if (next === 'n') {
          console.log('> POSSIBLE NULL DETECTED <');
          var checkStr = remainder.slice(0, 3);
          remainder = remainder.slice(3);
          if (checkStr === 'ull') {
            result = null;
          }
        } else {
          console.log('> NUMBER DETECTED <');
/*
          result = result === undefined ? next : result + next;
          result = next;
          while (remainder.length > 0) {
            setNext();
            result = result + next;
          }
          result = +result;
*/
          result = parseNumber();
        }
      }
    }

    return result;
  }

  return parseValue();
}
