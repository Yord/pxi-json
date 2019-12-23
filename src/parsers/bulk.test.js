const {anything, array, assert, constant, func, integer, unicodeJson, unicodeJsonObject, property} = require('fast-check')
const {func: parser} = require('./bulk')

test('parses json elements as a whole, even if they are formatted over several lines', () => {
  const err         = []
  const argv        = {verbose: 0}
  const lines       = anything()
  const jsonsTokens = integer().chain(spaces => 
    array(unicodeJsonObject()).chain(jsons => 
      constant({
        jsons,
        tokens: jsons.map(json => JSON.stringify(json, null, spaces))
      })  
    )
  )

  assert(
    property(lines, jsonsTokens, (lines, {jsons, tokens}) =>
      expect(
        parser(argv)(tokens, lines)
      ).toStrictEqual(
        {err, jsons}
      )
    )
  )
})

test('parsing text that is not json throws one of a list of errors, not using lines since verbose is 0', () => {
  const argv                     = {verbose: 0}
  const lines                    = anything()
  const potentiallyInvalidTokens = array(unicodeJson().map(str => str.slice(1)))
  const msgs                     = [
    'Unexpected end of',
    'Unexpected token ',
    'Unexpected number',
    'Unexpected string'
  ]

  assert(
    property(lines, potentiallyInvalidTokens, (lines, tokens) =>
      parser(argv)(tokens, lines)
      .err
      .map(e => e.msg.slice(0, 17))
      .reduce(
        (bool, err) => bool && msgs.indexOf(err) > -1,
        true
      )
    )
  )
})

test('parsing text that is not json fails with exactly one error and the first line if verbose is 1', () => {
  const argv           = {verbose: 1}
  const jsons          = []
  const tokensLinesErr = integer(0, 20).chain(len =>
    array(integer(), len, len).chain(lines =>
      array(func(anything()).map(f => f.toString()), len, len).chain(tokens =>
        constant({
          tokens,
          lines,
          err: lines.length > 0 ? [{msg: 'Unexpected token < in JSON at position 1', line: lines[0]}] : []
        })
      )
    )
  )

  assert(
    property(tokensLinesErr, ({tokens, lines, err}) =>
      expect(
        parser(argv)(tokens, lines)
      ).toStrictEqual(
        {err, jsons}
      )
    )
  )
})

test('parsing text that is not json fails with exactly one error, the first line, and info if verbose is 2 or higher', () => {
  const argv           = integer(2, 50).chain(verbose => constant({verbose}))
  const jsons          = []
  const tokensLinesErr = integer(0, 20).chain(len =>
    array(integer(), len, len).chain(lines =>
      array(func(anything()).map(f => f.toString()), len, len).chain(tokens =>
        constant({
          tokens,
          lines,
          err: lines.length > 0 ? [{msg: 'Unexpected token < in JSON at position 1', line: lines[0], info: '[' + tokens.join(',') + ']'}] : []
        })
      )
    )
  )

  assert(
    property(argv, tokensLinesErr, (argv, {tokens, lines, err}) =>
      expect(
        parser(argv)(tokens, lines)
      ).toStrictEqual(
        {err, jsons}
      )
    )
  )
})