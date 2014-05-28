// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
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
        if (this.first() === '\\') {
          this.shift();
          elem = elem + this.shift();
        } else {
          elem = elem + this.shift();
        }
      }
      return elem;
    };
    // remove leading whitespace and separator tokens
    this.strip = function() {
      while ((this.first() <= ' ' || this.first() === ',' || this.first() === ':') && this.first() !== '') this.shift();
    }
  }

  // identify type and parse next value of JSON string
  function parseValue(partial) {
    var result;
    partial.strip();
    if (partial.first() === '[') {
      result = parseArray(partial);
    } else if (partial.first() === '{') {
      result = parseObject(partial);
    } else if (partial.first() === '"') {
      result = parseString(partial);
    } else if (partial.first() === 't') {
      result = parseTrue(partial);
    } else if (partial.first() === 'f') {
      result = parseFalse(partial);
    } else if (partial.first() === 'n') {
      result = parseNull(partial);
    } else {
      result = parseNumber(partial);
    }
    return result;
  }

  // parse array
  function parseArray(partial) {
    var result = [];
    partial.shift();
    while (partial.first() !== ']' && partial.first() !== '') {
      result.push(parseValue(partial));
      partial.strip();
    }
    if (partial.first() === ']') {
      partial.shift();
      return result;
    } else {
      // return undefined for malformed array
      return undefined;
    }
  }

  // parse object
  function parseObject(partial) {
    var result = {};
    partial.shift();
    while (partial.first() !== '}' && partial.first() !== '') {
      result[parseValue(partial)] = parseValue(partial);
      partial.strip();
    }
    if (partial.first() === '}') {
      partial.shift();
      return result;
    } else {
      // return undefined for malformed object
      return undefined;
    }
  }

  // parse string
  function parseString(partial) {
    partial.shift()
    var elem = partial.shiftElem(['"']);
    if (partial.first() === '"') {
      partial.shift();
      return elem;
    } else {
      // return undefined for malformed string
      return undefined;
    }
  }

  // parse true
  function parseTrue(partial) {
    var elem = partial.shiftElem([' ', ',', ']', '}']);
    return elem === 'true' ? true : undefined;
  }

  // parse false
  function parseFalse(partial) {
    var elem = partial.shiftElem([' ', ',', ']', '}']);
    return elem === 'false' ? false : undefined;
  }

  // parse true
  function parseNull(partial) {
    var elem = partial.shiftElem([' ', ',', ']', '}']);
    return elem === 'null' ? null : undefined;
  }

  // parse number
  function parseNumber(partial) {
    var elem = partial.shiftElem([' ', ',', ']', '}']);
    return +elem;
  }

  return parseValue(remainder);
}
