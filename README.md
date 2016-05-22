# hjson-matter
Extract HJSON front matter from a string.

[HJSON](https://hjson.org/) is a human-friendly superset of JSON that has some sweet syntactic sugars and multiline strings, which is great! Don't worry, it's not going to overthrow JSON and, yes, we shouldn't encourage developers to slack off in writing proper code with proper commas. *However, there are some use cases where HJSON just makes sense.* For instance, I think it's a nicer (easier) markup for front matter than YAML when using templating libraries.

## Install
```shell
npm install hjson-matter
```

## Usage
```javascript
var hm = require('hjson-matter');
var fs = require('fs');

var file = fs.readFileSync('./some-file.html');
var content;

// pass in file contents as a String
content = hm(file.toString());

// pass in file contents as a Buffer
content = hm(file);

// specify a delimiter
content = hm(file, {delimiters: '***'});

// specify two different delimiters
content = hm(file, {delimiters: ['***', '@@@']});
```
