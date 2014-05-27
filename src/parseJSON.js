// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  console.log('===== PARSING =====');
  console.log('json: "' + json + '"');
  var remainder = new Partial(json);

  // mutable JSON string
  function Partial(string) {
    this.string = string;
    // print string to console
    this.log = function() {
      console.log("partial: " + this.string);
    }
    // return first char
    this.first = function() {
      return this.string.slice(0, 1);
    };
    // return last char
    this.last = function() {
      return this.string.slice(-1);
    }
    // remove and return first char
    this.shift = function() {
      var result = this.string.slice(0, 1);
      this.string = this.string.slice(1);
      return result;
    };
    // remove and return next element delimited by any value in given array
    this.shiftElem = function(delimArray) {
      var elem = '';
      while(this.first() !== '' && delimArray.indexOf(this.first()) === -1)  {
        elem = elem + this.shift();
      }
      return elem;
    };
    // remove leading whitespace
    this.strip = function() {
      while (this.first() === ' ') this.shift();
    }
  }

  // identify type and parse next value of JSON string
  function parseValue(partial) {
    var result;
    partial.strip();
    if (partial.first() === '[') {
      console.log("===== ARRAY DETECTED =====");
//      result = parseArray(partial);
    } else if (partial.first() === '{') {
      console.log("===== OBJECT DETECTED =====");
//      result = parseObject(partial);
    } else if (partial.first() === '"') {
      console.log("===== STRING DETECTED =====");
      result = parseString(partial);
    } else if (partial.first() === 't') {
      console.log("===== TRUE DETECTED =====");
      result = parseTrue(partial);
    } else if (partial.first() === 'f') {
      console.log("===== FALSE DETECTED =====");
      result = parseFalse(partial);
    } else if (partial.first() === 'n') {
      console.log("===== NULL DETECTED =====");
      result = parseNull(partial);
    } else {
      console.log("===== NUMBER DETECTED =====");
      result = parseNumber(partial);
    }
    return result;
  }

  // parse array
  function parseArray(partial) {
    console.log(">>> PARSING ARRAY <<<");
    var result = [];
partial.log();
    partial.next();
    while (partial.first() !== ']') {
      if (partial.first() === ',') {
        partial.next();
        partial.strip();
      }
      result.push(parseValue(partial));
      partial.log();
    }
    return result;
  }

  // parse object
  function parseObject(partial) {
    console.log(">>> PARSING OBJECT <<<");
    var result = {};
    partial.next();
    var contents = new Partial(partial.nextElem(['}']));
    var elem = contents.nextElem([',']);
    while (elem !== '') {
      var keyval = elem.split(':');
      var key = new Partial(keyval[0]);
      var val = new Partial(keyval[1]);
      key.strip();
      val.strip();
      result[parseString(key)] = parseValue(val);
      elem = contents.nextElem([',']);
    }
    return result;
  }

  // parse string
  function parseString(partial) {
    console.log(">>> PARSING STRING <<<");
    partial.shift()
    var elem = partial.shiftElem(['"']);
    return elem;
  }

  // parse true
  function parseTrue(partial) {
    console.log(">>> PARSING TRUE <<<");
    var elem = partial.shiftElem([' ', ',', ']', '}']);
    if (elem === 'true') {
      return true;
    }
    return undefined;
  }

  // parse false
  function parseFalse(partial) {
    console.log(">>> PARSING FALSE <<<");
    var elem = partial.shiftElem([' ', ',', ']', '}']);
    if (elem === 'false') {
      return false;
    }
    return undefined;
  }

  // parse true
  function parseNull(partial) {
    console.log(">>> PARSING NULL <<<");
    var elem = partial.shiftElem([' ', ',', ']', '}']);
    if (elem === 'null') {
      return null;
    }
    return undefined;
  }

  // parse number
  function parseNumber(partial) {
    console.log(">>> PARSING NUMBER <<<");
    var elem = partial.shiftElem([' ', ',', ']', '}']);
    return +elem;
  }

  return parseValue(remainder);
}
