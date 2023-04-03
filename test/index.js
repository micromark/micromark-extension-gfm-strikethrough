import assert from 'node:assert/strict'
import {URL} from 'node:url'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import {micromark} from 'micromark'
import {createGfmFixtures} from 'create-gfm-fixtures'
import {
  gfmStrikethrough as syntax,
  gfmStrikethroughHtml as html
} from '../dev/index.js'

test('markdown -> html (micromark)', () => {
  const defaults = syntax()

  assert.deepEqual(
    micromark('a ~b~', {
      extensions: [defaults],
      htmlExtensions: [html]
    }),
    '<p>a <del>b</del></p>',
    'should support strikethrough w/ one tilde'
  )

  assert.deepEqual(
    micromark('a ~~b~~', {
      extensions: [defaults],
      htmlExtensions: [html]
    }),
    '<p>a <del>b</del></p>',
    'should support strikethrough w/ two tildes'
  )

  assert.deepEqual(
    micromark('a ~~~b~~~', {
      extensions: [defaults],
      htmlExtensions: [html]
    }),
    '<p>a ~~~b~~~</p>',
    'should not support strikethrough w/ three tildes'
  )

  assert.deepEqual(
    micromark('a \\~~~b~~ c', {
      extensions: [defaults],
      htmlExtensions: [html]
    }),
    '<p>a ~<del>b</del> c</p>',
    'should support strikethrough w/ after an escaped tilde'
  )

  assert.deepEqual(
    micromark('a ~~b ~~c~~ d~~ e', {
      extensions: [defaults],
      htmlExtensions: [html]
    }),
    '<p>a <del>b <del>c</del> d</del> e</p>',
    'should support nested strikethrough'
  )

  assert.deepEqual(
    micromark('a ~-1~ b', {
      extensions: [defaults],
      htmlExtensions: [html]
    }),
    '<p>a <del>-1</del> b</p>',
    'should open if preceded by whitespace and followed by punctuation'
  )

  assert.deepEqual(
    micromark('a ~b.~ c', {
      extensions: [defaults],
      htmlExtensions: [html]
    }),
    '<p>a <del>b.</del> c</p>',
    'should close if preceded by punctuation and followed by whitespace'
  )

  assert.deepEqual(
    micromark('~b.~.', {
      extensions: [syntax({singleTilde: true})],
      htmlExtensions: [html]
    }),
    '<p><del>b.</del>.</p>',
    'should close if preceded and followed by punctuation (del)'
  )

  assert.deepEqual(
    micromark('a ~b~ ~~c~~ d', {
      extensions: [syntax({singleTilde: false})],
      htmlExtensions: [html]
    }),
    '<p>a ~b~ <del>c</del> d</p>',
    'should not support strikethrough w/ one tilde if `singleTilde: false`'
  )

  assert.deepEqual(
    micromark('a ~b~ ~~c~~ d', {
      extensions: [syntax({singleTilde: true})],
      htmlExtensions: [html]
    }),
    '<p>a <del>b</del> <del>c</del> d</p>',
    'should support strikethrough w/ one tilde if `singleTilde: true`'
  )
})

test('fixtures', async () => {
  const base = new URL('fixtures/', import.meta.url)

  await createGfmFixtures(base, {rehypeStringify: {closeSelfClosing: true}})

  const files = fs.readdirSync(base).filter((d) => /\.md$/.test(d))
  let index = -1

  while (++index < files.length) {
    const name = path.basename(files[index], '.md')
    const input = fs.readFileSync(new URL(name + '.md', base))
    const expected = String(fs.readFileSync(new URL(name + '.html', base)))
    let actual = micromark(input, {
      extensions: [syntax()],
      htmlExtensions: [html]
    })

    if (actual && !/\n$/.test(actual)) {
      actual += '\n'
    }

    assert.deepEqual(actual, expected, name)
  }
})
