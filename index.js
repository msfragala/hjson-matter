var HJSON = require('hjson');
var escape = require('escape-string-regexp');

module.exports = function(input, options) {
  /* normalize content */
  var content = normalizeContent(input);
  /* normalize delimiters */
  var delimit = normalizeDelimit((options && options.delimiters));
  /* set default result */
  var result = { body: content, data: {}, original: content };
  /* locate delimiter indexes */
  var inceptor = getInceptor(content, delimit[0]);
  var terminus = getTerminus(content, delimit[1]);
  /* test for correct delimitation */
  if (inceptor.start === 0 && terminus.start > 0) {
    /* dissect content frontmatter */
    var data = content.slice(inceptor.end, terminus.start).trim();
    var body = content.slice(terminus.end).trimLeft();
    result.data = attemptParse(data);
    result.body = body;
  }
  return result;
}

function normalizeContent(content) {
  if (typeof content !== 'string') content = content.toString();
  if (content.charAt(0) === '\uFEFF') content = content.slice(1);
  return content;
}

function normalizeDelimit(delimiters) {
  if (!Array.isArray(delimiters)) delimiters = [(delimiters||'---')];
  if (delimiters.length !== 2) delimiters[1] = delimiters[0];
  return delimiters;
}

function getInceptor(content, delimiter) {
  var start = content.search(new RegExp('^' + escape(delimiter) + '\n\r?'));
  return {
    start: start,
    end: start + delimiter.length + 1
  }
}

function getTerminus(content, delimiter) {
  var start = content.search(new RegExp('\n\r?' + escape(delimiter) + '\n\r?'));
  return {
    start: start,
    end: start + delimiter.length + 1
  }
}

function attemptParse(data) {
  try {
    return HJSON.parse(data);
  } catch(err) {
    return {};
  }
}
