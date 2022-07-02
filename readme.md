# micromark-extension-gfm-strikethrough

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[micromark][] extension support GFM [strikethrough][].

## Contents

*   [What is this?](#what-is-this)
*   [When to use this](#when-to-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`gfmStrikethrough(options?)`](#gfmstrikethroughoptions)
    *   [`gfmStrikethroughHtml`](#gfmstrikethroughhtml)
*   [Authoring](#authoring)
*   [HTML](#html)
*   [CSS](#css)
*   [Syntax](#syntax)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package contains extensions that add support for strikethrough as enabled
by GFM to [`micromark`][micromark].
Strikethrough on `github.com`, which this extension matches, can use one
(`~one~`) or two (`~~two~~`) tildes.
The GFM spec strictly prohibits one tilde to be used.
That behavior can be used by passing `singleTilde: false`.

## When to use this

These tools are all low-level.
In many cases, you want to use [`remark-gfm`][plugin] with remark instead.

Even when you want to use `micromark`, you likely want to use
[`micromark-extension-gfm`][micromark-extension-gfm] to support all GFM
features.
That extension includes this extension.

When working with `mdast-util-from-markdown`, you must combine this package with
[`mdast-util-gfm-strikethrough`][util].

## Install

This package is [ESM only][esm].
In Node.js (version 12.20+, 14.14+, 16.0+, or 18.0+), install with [npm][]:

```sh
npm install micromark-extension-gfm-strikethrough
```

In Deno with [`esm.sh`][esmsh]:

```js
import {gfmStrikethrough, gfmStrikethroughHtml} from 'https://esm.sh/micromark-extension-gfm-strikethrough@1'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {gfmStrikethrough, gfmStrikethroughHtml} from 'https://esm.sh/micromark-extension-gfm-strikethrough@1?bundle'
</script>
```

## Use

```js
import {micromark} from 'micromark'
import {
  gfmStrikethrough,
  gfmStrikethroughHtml
} from 'micromark-extension-gfm-strikethrough'

const output = micromark('Some ~strikethrough~.', {
  extensions: [gfmStrikethrough()],
  htmlExtensions: [gfmStrikethroughHtml]
})

console.log(output)
```

Yields:

```html
<p>Some <del>strikethrough</del></p>.
```

## API

This package exports the identifiers `gfmStrikethrough` and
`gfmStrikethroughHtml`.
There is no default export.

The export map supports the endorsed [`development` condition][condition].
Run `node --conditions development module.js` to get instrumented dev code.
Without this condition, production code is loaded.

### `gfmStrikethrough(options?)`

Function that can be called to get a syntax extension for micromark (passed in
`extensions`).

##### `options`

Configuration (optional).

###### `options.singleTilde`

Whether to support strikethrough with a single tilde (`boolean`, default:
`true`).
Single tildes work on github.com but are technically prohibited by GFM.

### `gfmStrikethroughHtml`

HTML extension for micromark (passed in `htmlExtensions`).

## Authoring

When authoring markdown with strikethrough, it’s recommended to stick to two
tildes for each run.
That makes sure it works in most places.

## HTML

GFM task list items relate to the `<del>` element in HTML.
See [*§ 4.7.2 The `del` element*][html-del] in the HTML spec for more info.

## CSS

GitHub itself does not apply interesting CSS to `del` elements.
It currently (July 2022) does change `code` in `del`.

```css
del code {
  text-decoration: inherit;
}
```

For the complete actual CSS see
[`sindresorhus/github-markdown-css`][github-markdown-css].

## Syntax

Strikethrough parses like other attention (emphasis, strong), which means that
it gets *really* complex and a BNF grammar cannot do it justice.

## Types

This package is fully typed with [TypeScript][].
It exports the additional type `Options`.

## Compatibility

This package is at least compatible with all maintained versions of Node.js.
As of now, that is Node.js 12.20+, 14.14+, 16.0+, and 18.0+.
It also works in Deno and modern browsers.

## Security

This package is safe.

## Related

*   [`syntax-tree/mdast-util-gfm-strikethrough`][util]
    — support GFM strikethrough in mdast
*   [`syntax-tree/mdast-util-gfm`][mdast-util-gfm]
    — support GFM in mdast
*   [`remarkjs/remark-gfm`][plugin]
    — support GFM in remark

## Contribute

See [`contributing.md` in `micromark/.github`][contributing] for ways to get
started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/micromark/micromark-extension-gfm-strikethrough/workflows/main/badge.svg

[build]: https://github.com/micromark/micromark-extension-gfm-strikethrough/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/micromark/micromark-extension-gfm-strikethrough.svg

[coverage]: https://codecov.io/github/micromark/micromark-extension-gfm-strikethrough

[downloads-badge]: https://img.shields.io/npm/dm/micromark-extension-gfm-strikethrough.svg

[downloads]: https://www.npmjs.com/package/micromark-extension-gfm-strikethrough

[size-badge]: https://img.shields.io/bundlephobia/minzip/micromark-extension-gfm-strikethrough.svg

[size]: https://bundlephobia.com/result?p=micromark-extension-gfm-strikethrough

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/micromark/micromark/discussions

[npm]: https://docs.npmjs.com/cli/install

[esmsh]: https://esm.sh

[license]: license

[author]: https://wooorm.com

[contributing]: https://github.com/micromark/.github/blob/main/contributing.md

[support]: https://github.com/micromark/.github/blob/main/support.md

[coc]: https://github.com/micromark/.github/blob/main/code-of-conduct.md

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[typescript]: https://www.typescriptlang.org

[condition]: https://nodejs.org/api/packages.html#packages_resolving_user_conditions

[micromark]: https://github.com/micromark/micromark

[micromark-extension-gfm]: https://github.com/micromark/micromark-extension-gfm

[util]: https://github.com/syntax-tree/mdast-util-gfm-strikethrough

[mdast-util-gfm]: https://github.com/syntax-tree/mdast-util-gfm

[plugin]: https://github.com/remarkjs/remark-gfm

[strikethrough]: https://github.github.com/gfm/#strikethrough-extension-

[github-markdown-css]: https://github.com/sindresorhus/github-markdown-css

[html-del]: https://html.spec.whatwg.org/multipage/edits.html#the-del-element
