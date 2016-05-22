import test from 'ava';
import _ from 'lodash';
import hm from '../';
import {readFileSync} from 'fs';

test('Nonissue', t => {
  let file = readFileSync('./nonissue.html').toString();
  let content = hm(file);
  t.true(_.isEqual(content.data, {
    sections: [
      {
        title: "Section 1",
        text: "Yes! This is some text.\nAnd, \"here is a saying,\" said someone."
      }
    ]
  }));
  t.true(content.body !== file);
  t.true(content.original === file);
});

test('Absent Front Matter', t => {
  let file = readFileSync('./absent_front_matter.html').toString();
  let content = hm(file);
  t.true(_.isEmpty(content.data));
  t.true(content.body === file);
  t.true(content.original === file);
});

test('Empty Front Matter', t => {
  let file = readFileSync('./empty_front_matter.html').toString();
  let content = hm(file);
  t.true(_.isEmpty(content.data));
  t.true(content.body !== file);
  t.true(content.original === file);
});

test('Erroneous Front Matter', t => {
  let file = readFileSync('./erroneous_front_matter.html').toString();
  let content = hm(file);
  t.true(_.isEmpty(content.data));
  t.true(content.body !== file);
  t.true(content.original === file);
});

test('Array Specified Delimiters', t => {
  let file = readFileSync('./array_specified_delimiters.html').toString();
  let content = hm(file, {delimiters: ['@@@','***']});
  t.true(_.isEqual(content.data, {title:'Document'}));
});

test('String Specified Delimiters', t => {
  let file = readFileSync('./string_specified_delimiters.html').toString();
  let content = hm(file, {delimiters: '***'});
  t.true(_.isEqual(content.data, {title:'Document'}));
});
