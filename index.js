var HJSON = require('hjson');

module.exports = function(content, delimiter) {

  content = removeBOM(content);
  delimiter = delimiter || '---';

  var lines = getLines(content);
  var inceptor, terminus, frontMatter, fileContent;

  if (lines[0] && isDelimiter(lines[0])) {
    inceptor = getInceptor(content, delimiter);
    terminus = getTerminus(content, delimiter, inceptor);
    frontMatter = getFrontMatter(content, inceptor, terminus);
    fileContent = getFileContent(content, inceptor, terminus);
    return {
      body: fileContent,
      data: HJSON.parse(frontMatter),
      original: content
    }
  } else {
    return content;
  }

}

function getLines(string) {
  return string.split(/\r?\n/);
}

function isDelimiter(line, delimiter) {
  return new Regex('^' + delimiter + '$').test(line);
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
