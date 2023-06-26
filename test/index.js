import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import test from 'node:test'
import {micromark} from 'micromark'
import {createGfmFixtures} from 'create-gfm-fixtures'
import {
  gfmStrikethrough,
  gfmStrikethroughHtml
} from 'micromark-extension-gfm-strikethrough'

test('micromark-extension-gfm-strikethrough', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(
      Object.keys(await import('micromark-extension-gfm-strikethrough')).sort(),
      ['gfmStrikethrough', 'gfmStrikethroughHtml']
    )
  })

  await t.test('should support strikethrough w/ one tilde', async function () {
    assert.deepEqual(
      micromark('a ~b~', {
        extensions: [gfmStrikethrough()],
        htmlExtensions: [gfmStrikethroughHtml()]
      }),
      '<p>a <del>b</del></p>'
    )
  })

  await t.test('should support strikethrough w/ two tildes', async function () {
    assert.deepEqual(
      micromark('a ~~b~~', {
        extensions: [gfmStrikethrough()],
        htmlExtensions: [gfmStrikethroughHtml()]
      }),
      '<p>a <del>b</del></p>'
    )
  })

  await t.test(
    'should not support strikethrough w/ three tildes',
    async function () {
      assert.deepEqual(
        micromark('a ~~~b~~~', {
          extensions: [gfmStrikethrough()],
          htmlExtensions: [gfmStrikethroughHtml()]
        }),
        '<p>a ~~~b~~~</p>'
      )
    }
  )

  await t.test(
    'should support strikethrough w/ after an escaped tilde',
    async function () {
      assert.deepEqual(
        micromark('a \\~~~b~~ c', {
          extensions: [gfmStrikethrough()],
          htmlExtensions: [gfmStrikethroughHtml()]
        }),
        '<p>a ~<del>b</del> c</p>'
      )
    }
  )

  await t.test('should support nested strikethrough', async function () {
    assert.deepEqual(
      micromark('a ~~b ~~c~~ d~~ e', {
        extensions: [gfmStrikethrough()],
        htmlExtensions: [gfmStrikethroughHtml()]
      }),
      '<p>a <del>b <del>c</del> d</del> e</p>'
    )
  })

  await t.test(
    'should open if preceded by whitespace and followed by punctuation',
    async function () {
      assert.deepEqual(
        micromark('a ~-1~ b', {
          extensions: [gfmStrikethrough()],
          htmlExtensions: [gfmStrikethroughHtml()]
        }),
        '<p>a <del>-1</del> b</p>'
      )
    }
  )

  await t.test(
    'should close if preceded by punctuation and followed by whitespace',
    async function () {
      assert.deepEqual(
        micromark('a ~b.~ c', {
          extensions: [gfmStrikethrough()],
          htmlExtensions: [gfmStrikethroughHtml()]
        }),
        '<p>a <del>b.</del> c</p>'
      )
    }
  )

  await t.test(
    'should close if preceded and followed by punctuation (del)',
    async function () {
      assert.deepEqual(
        micromark('~b.~.', {
          extensions: [gfmStrikethrough({singleTilde: true})],
          htmlExtensions: [gfmStrikethroughHtml()]
        }),
        '<p><del>b.</del>.</p>'
      )
    }
  )

  await t.test(
    'should not support strikethrough w/ one tilde if `singleTilde: false`',
    async function () {
      assert.deepEqual(
        micromark('a ~b~ ~~c~~ d', {
          extensions: [gfmStrikethrough({singleTilde: false})],
          htmlExtensions: [gfmStrikethroughHtml()]
        }),
        '<p>a ~b~ <del>c</del> d</p>'
      )
    }
  )

  await t.test(
    'should support strikethrough w/ one tilde if `singleTilde: true`',
    async function () {
      assert.deepEqual(
        micromark('a ~b~ ~~c~~ d', {
          extensions: [gfmStrikethrough({singleTilde: true})],
          htmlExtensions: [gfmStrikethroughHtml()]
        }),
        '<p>a <del>b</del> <del>c</del> d</p>'
      )
    }
  )
})

test('fixtures', async function (t) {
  const base = new URL('fixtures/', import.meta.url)

  await createGfmFixtures(base, {rehypeStringify: {closeSelfClosing: true}})

  const files = await fs.readdir(base)
  const extname = '.md'

  for (const d of files) {
    if (!d.endsWith(extname)) {
      continue
    }

    const name = d.slice(0, -extname.length)

    await t.test(name, async function () {
      const input = await fs.readFile(new URL(d, base))
      const expected = String(await fs.readFile(new URL(name + '.html', base)))
      let actual = micromark(input, {
        extensions: [gfmStrikethrough()],
        htmlExtensions: [gfmStrikethroughHtml()]
      })

      if (actual && !/\n$/.test(actual)) {
        actual += '\n'
      }

      assert.equal(actual, expected)
    })
  }
})
