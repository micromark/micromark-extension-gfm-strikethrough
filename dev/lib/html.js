/**
 * @typedef {import('micromark-util-types').HtmlExtension} HtmlExtension
 */

/**
 * HTML extension for micromark (passed in `htmlExtensions`).
 *
 * @type {HtmlExtension}
 */
export const gfmStrikethroughHtml = {
  enter: {
    strikethrough() {
      this.tag('<del>')
    }
  },
  exit: {
    strikethrough() {
      this.tag('</del>')
    }
  }
}
