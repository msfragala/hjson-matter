var HJSON = require('hjson');

module.exports = function(content, delimiter) {

  content = removeBOM(content);
  delimiter = delimiter || '---';

  var lines = getLines(content);
  var inceptor = getInceptor(content, delimiter);
  var terminus = getTerminus(content, delimiter, inceptor);
  var frontMatter = getFrontMatter(content, inceptor, terminus);
  var fileContent = getFileContent(content, inceptor, terminus);

  return {
    body: fileContent,
    data: HJSON.parse(frontMatter),
    original: content
  }

}

function getLines(string) {
  return string.split(/\r?\n/);
}

function isDelimiter(line, delimiter) {
  return delimiter.test(line);
}

function removeBOM(string) {
  return (string.charAt(0) === '\uFEFF')
    ? string.slice(1)
    : string;
}

function getInceptor(content, delimiter) {
  var start = content.indexOf(delimiter);
  return {
    start: start,
    end: start + delimiter.length
  }
}

function getTerminus(content, delimiter, inceptor) {
  var start = content.indexOf(delimiter, inceptor.end);
  return {
    start: start,
    end: start + delimiter.length
  }
}

function getFrontMatter(content, inceptor, terminus) {
  return content.substring(inceptor.end, terminus.start).trim();
}

function getFileContent(content, inceptor, terminus) {
  return content.substring(terminus.end, content.length).trim();
}
