module.exports = create

var classifyCharacter = require('micromark/dist/util/classify-character')
var chunkedSplice = require('micromark/dist/util/chunked-splice')
var resolveAll = require('micromark/dist/util/resolve-all')
var shallow = require('micromark/dist/util/shallow')

var characterGroupPunctuation = 2

function create(options) {
  var settings = options || {}
  var single = settings.singleTilde
  var tokenizer = {
    tokenize: tokenizeStrikethrough,
    resolveAll: resolveAllStrikethrough
  }

  if (single === null || single === undefined) {
    single = true
  }

  return {text: {126: tokenizer}, insideSpan: {null: tokenizer}}

  // Take events and resolve strikethrough.
  function resolveAllStrikethrough(events, context) {
    var index = -1
    var strikethrough
    var opening
    var closing
    var text
    var indexOpen
    var nextEvents

    // Walk through all events.
    while (++index < events.length) {
      closing = events[index][1]

      // Find a token that can close.
      if (closing.type === 'strikethroughSequenceTemporary' && closing._close) {
        indexOpen = index

        // Now walk back to find an opener.
        while (indexOpen--) {
          opening = events[indexOpen][1]

          // Find a token that can open the closer.
          if (
            opening.type === 'strikethroughSequenceTemporary' &&
            opening._open &&
            closing.end.offset - closing.start.offset ===
              opening.end.offset - opening.start.offset &&
            !(closing._open || opening._close)
          ) {
            closing.type = 'strikethroughSequence'
            opening.type = 'strikethroughSequence'

            strikethrough = {
              type: 'strikethrough',
              start: shallow(opening.start),
              end: shallow(closing.end)
            }

            text = {
              type: 'strikethroughText',
              start: shallow(opening.end),
              end: shallow(closing.start)
            }

            // Opening.
            nextEvents = [
              ['enter', strikethrough, context],
              ['enter', opening, context],
              ['exit', opening, context],
              ['enter', text, context]
            ]

            // Between.
            chunkedSplice(
              nextEvents,
              nextEvents.length,
              0,
              resolveAll(
                context.parser.constructs.insideSpan.null,
                events.slice(indexOpen + 1, index),
                context
              )
            )

            // Closing.
            chunkedSplice(nextEvents, nextEvents.length, 0, [
              ['exit', text, context],
              ['enter', closing, context],
              ['exit', closing, context],
              ['exit', strikethrough, context]
            ])

            chunkedSplice(
              events,
              indexOpen - 1,
              index - indexOpen + 3,
              nextEvents
            )

            index = indexOpen + nextEvents.length - 2
            break
          }
        }
      }
    }

    return removeRemainingSequences(events)
  }

  function removeRemainingSequences(events) {
    var index = -1
    var length = events.length

    while (++index < length) {
      if (events[index][1].type === 'strikethroughSequenceTemporary') {
        events[index][1].type = 'data'
      }
    }

    return events
  }

  function tokenizeStrikethrough(effects, ok, nok) {
    var previous = this.previous
    var events = this.events
    var size = 0

    return start

    function start(code) {
      if (
        code !== 126 ||
        (previous === 126 &&
          events[events.length - 1][1].type !== 'characterEscape')
      ) {
        return nok(code)
      }

      effects.enter('strikethroughSequenceTemporary')
      return more(code)
    }

    function more(code) {
      var token
      var before
      var after

      if (code === 126) {
        // If this is the third marker, exit.
        if (size > 1) {
          return nok(code)
        }

        effects.consume(code)
        size++
        return more
      }

      if (size < 2 && !single) {
        return nok(code)
      }

      before = classifyCharacter(previous)
      after = classifyCharacter(code)
      token = effects.exit('strikethroughSequenceTemporary')
      token._open = !after || (before && after === characterGroupPunctuation)
      token._close = !before || (after && before === characterGroupPunctuation)

      return ok(code)
    }
  }
}
