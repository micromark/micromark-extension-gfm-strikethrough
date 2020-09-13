var fs = require('fs')
var path = require('path')
var test = require('tape')
var micromark = require('micromark')
var syntax = require('..')
var html = require('../html')

var input = fs.readFileSync(path.join(__dirname, 'input.md'))
var output = fs.readFileSync(path.join(__dirname, 'output.html'), 'utf8')

test('markdown -> html (micromark)', function (t) {
  t.deepEqual(
    micromark('a ~b~', {
      extensions: [syntax],
      htmlExtensions: [html]
    }),
    '<p>a <del>b</del></p>',
    'should support strikethrough w/ one tilde'
  )

  t.deepEqual(
    micromark('a ~~b~~', {
      extensions: [syntax],
      htmlExtensions: [html]
    }),
    '<p>a <del>b</del></p>',
    'should support strikethrough w/ two tildes'
  )

  t.deepEqual(
    micromark('a ~~~b~~~', {
      extensions: [syntax],
      htmlExtensions: [html]
    }),
    '<p>a ~~~b~~~</p>',
    'should not support strikethrough w/ three tildes'
  )

  t.deepEqual(
    micromark(input, {extensions: [syntax], htmlExtensions: [html]}),
    output,
    'should support strikethrough matching how GH does it'
  )

  t.deepEqual(
    micromark('a \\~~~b~~ c', {
      extensions: [syntax],
      htmlExtensions: [html]
    }),
    '<p>a ~<del>b</del> c</p>',
    'should support strikethrough w/ after an escaped tilde'
  )

  t.deepEqual(
    micromark('a ~~b ~~c~~ d~~ e', {
      extensions: [syntax],
      htmlExtensions: [html]
    }),
    '<p>a <del>b <del>c</del> d</del> e</p>',
    'should support nested strikethrough'
  )

  t.deepEqual(
    micromark('a ~-1~ b', {
      extensions: [syntax],
      htmlExtensions: [html]
    }),
    '<p>a <del>-1</del> b</p>',
    'should open if preceded by whitespace and followed by punctuation'
  )

  t.deepEqual(
    micromark('a ~b.~ c', {
      extensions: [syntax],
      htmlExtensions: [html]
    }),
    '<p>a <del>b.</del> c</p>',
    'should close if preceded by punctuation and followed by whitespace'
  )

  t.end()
})
