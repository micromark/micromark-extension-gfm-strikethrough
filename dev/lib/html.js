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
