// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  console.log("===== PARSING =====");
  console.log("json: " + json);
  var remainder = json;

  // parse next char of JSON string
  function setNext2() {
    next = remainder.substring(0, 1);
    remainder = remainder.substring(1);
    console.log("set next: " + next);
    console.log("set remainder: " + remainder);
  }

  // identify type and parse next value of JSON string
  function parseValue() {
    var result;
    var next = remainder(0, 1);
    console.log("next: " + next);

    if (next === '[') {
      console.log("> ARRAY DETECTED <");
      result = parseArray();
    } else if (next === '{') {
      console.log("> OBJECT DETECTED <");
      result = parseObject();
    } else if (next === '"') {
      console.log("> STRING DETECTED <");
      result = parseString();
    } else if (next === 't') {
      console.log("> TRUE DETECTED <");
      result = parseTrue();
    }

    return result;
  }

  // parse next value of JSON string
  function parseValue2() {
    var result;

    // parse next value
    while (remainder.length > 0) {
      setNext();
      console.log("next: " + next);
      if (next === "{") {
        console.log("> OBJECT DETECTED <");
        result = {};
      } else if (next === "[") {
        console.log("> ARRAY DETECTED <");
        result = parseArray();

        console.log("pre remainder: " + remainder);
        var testVal = parseJSON(remainder);
        console.log("testval: " + testVal);
        console.log("post remainder: " + remainder);

      } else if (next === '"') {
        console.log("> STRING DETECTED <");
        result = parseString();
      } else {
        console.log("> VALUE DETECTED <");
        if (next === "t") {
          console.log("> POSSIBLE TRUE DETECTED <");
          var checkStr = remainder.substring(0, 3);
          remainder = remainder.substring(3);
          if (checkStr === "rue") {
            result = true;
          }
        } else if (next === "f") {
          console.log("> POSSIBLE FALSE DETECTED <");
          var checkStr = remainder.substring(0, 4);
          remainder = remainder.substring(4);
          if (checkStr === "alse") {
            result = false;
          }
        } else if (next === "n") {
          console.log("> POSSIBLE NULL DETECTED <");
          var checkStr = remainder.substring(0, 3);
          remainder = remainder.substring(3);
          if (checkStr === "ull") {
            result = null;
          }
        } else {
          console.log("> NUMBER DETECTED <");
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
    var result = "";
    setNext();
    while (remainder.length > 0 && next !== '"') {
      result = result + next;
      setNext();
    }
    console.log("string return: " + result);
    return result;
  }

  // parse true, false, or null
  function parseBoolNull() {
    var result;

    return result;
  }

  // parse true
  function parseTrue() {
    remainder = remainder.substring(4);
    return true;
  }

  // parse false
  function parseFalse() {
    remainder = remainder.substring(5);
    return false;
  }

  // parse null
  function parseNull() {
    remainder = remainder.substring(4);
    return null;
  }

  // parse number
  function parseNumber() {
    var result = next;
    while (remainder.length > 0) {
      setNext();
      result = result + next;
    }
    return +result;
  }

  return parseValue();
}
