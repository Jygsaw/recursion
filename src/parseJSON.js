// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  console.log('===== PARSING =====');
  console.log('json: ' + json);
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
    this.next = function() {
      var result = this.string.slice(0, 1);
      this.string = this.string.slice(1);
      return result;
    };
    // remove and return next element by any value in given array
    this.nextElem = function(delimArray) {
      var elem = '';
      var next = this.next();
      while(next !== '' && delimArray.indexOf(next) === -1)  {
        elem = elem + next;
        next = this.next();
      }
      return elem;
    };
    // remove leading whitespace
    this.strip = function() {
      while (this.first() === ' ') this.next();
      while (this.last() === ' ') this.string = this.string.slice(0, -1);
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
    console.log(">>> PARSING ARRAY <<<");
    var result = [];
    partial.next();
    var contents = new Partial(partial.nextElem([']']));
    var elem = contents.nextElem([',']);
    while (elem !== '') {
      result.push(parseValue(new Partial(elem)));
      elem = contents.nextElem([',']);
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
console.log("result: " + JSON.stringify(result));
    return result;
  }

  // parse string
  function parseString(partial) {
    console.log(">>> PARSING STRING <<<");
    partial.next();
    var elem = partial.nextElem(['"']);
    return elem;
  }

  // parse true
  function parseTrue(partial) {
    console.log(">>> PARSING TRUE <<<");
    var result = undefined;
    var elem = partial.nextElem([]);
    if (elem === 'true') {
      result = true;
    }
    return result;
  }

  // parse false
  function parseFalse(partial) {
    console.log(">>> PARSING FALSE <<<");
    var result = undefined;
    var elem = partial.nextElem([]);
    if (elem === 'false') {
      result = false;
    }
    return result;
  }

  // parse true
  function parseNull(partial) {
    console.log(">>> PARSING NULL <<<");
    var result = undefined;
    var elem = partial.nextElem([]);
    if (elem === 'null') {
      result = null;
    }
    return result;
  }

  // parse number
  function parseNumber(partial) {
    console.log(">>> PARSING NUMBER <<<");
    var elem = partial.nextElem([]);
    return +elem;
  }

  return parseValue(remainder);
}
