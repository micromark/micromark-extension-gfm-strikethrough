import * as syntax from 'micromark-extension-gfm-strikethrough'
import micromark from 'micromark'
import html = require('micromark-extension-gfm-strikethrough/html')

micromark('', {
  extensions: [syntax(), syntax({singleTilde: false})],
  htmlExtensions: [html]
})
