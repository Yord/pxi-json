const {anything, array, assert, constant, func, integer, unicodeJson, unicodeJsonObject, property} = require('fast-check')
const {func: deserializer} = require('./json')

test('deserializes json elements as a whole, even if they are formatted over several lines', () => {
  const err         = []
  const argv        = {verbose: 0}
  const lines       = anything()
  const jsonsChunks = integer().chain(spaces => 
    array(unicodeJsonObject()).chain(jsons => 
      constant({
        jsons,
        chunks: jsons.map(json => JSON.stringify(json, null, spaces))
      })  
    )
  )

  assert(
    property(lines, jsonsChunks, (lines, {jsons, chunks}) =>
      expect(
        deserializer(argv)(chunks, lines)
      ).toStrictEqual(
        {err, jsons}
      )
    )
  )
})

test('deserializing text that is not json throws one of a list of errors, not using lines since verbose is 0', () => {
  const argv                     = {verbose: 0}
  const lines                    = anything()
  const potentiallyInvalidChunks = array(unicodeJson().map(str => str.slice(1)))
  const msgs                     = [
    'Unexpected end of',
    'Unexpected chunk ',
    'Unexpected number',
    'Unexpected string'
  ]

  assert(
    property(lines, potentiallyInvalidChunks, (lines, chunks) =>
      deserializer(argv)(chunks, lines)
      .err
      .map(e => e.msg.slice(0, 17))
      .reduce(
        (bool, err) => bool && msgs.indexOf(err) > -1,
        true
      )
    )
  )
})

test('deserializing text that is not json fails with exactly one error and the first line if verbose is 1', () => {
  const argv           = {verbose: 1}
  const jsons          = []
  const chunksLinesErr = integer(0, 20).chain(len =>
    array(integer(), len, len).chain(lines =>
      array(func(anything()).map(f => f.toString()), len, len).chain(chunks =>
        constant({
          chunks,
          lines,
          err: lines.length > 0 ? [{msg: 'Unexpected chunk < in JSON at position 1', line: lines[0]}] : []
        })
      )
    )
  )

  assert(
    property(chunksLinesErr, ({chunks, lines, err}) =>
      expect(
        deserializer(argv)(chunks, lines)
      ).toStrictEqual(
        {err, jsons}
      )
    )
  )
})

test('deserializing text that is not json fails with exactly one error, the first line, and info if verbose is 2 or higher', () => {
  const argv           = integer(2, 50).chain(verbose => constant({verbose}))
  const jsons          = []
  const chunksLinesErr = integer(0, 20).chain(len =>
    array(integer(), len, len).chain(lines =>
      array(func(anything()).map(f => f.toString()), len, len).chain(chunks =>
        constant({
          chunks,
          lines,
          err: lines.length > 0 ? [{msg: 'Unexpected chunk < in JSON at position 1', line: lines[0], info: '[' + chunks.join(',') + ']'}] : []
        })
      )
    )
  )

  assert(
    property(argv, chunksLinesErr, (argv, {chunks, lines, err}) =>
      expect(
        deserializer(argv)(chunks, lines)
      ).toStrictEqual(
        {err, jsons}
      )
    )
  )
})

test('deserializes each json element individually, even if it is formatted over several lines', () => {
  const err         = []
  const argv        = anything().chain(verbose => constant({verbose, noBulk: true}))
  const lines       = anything()
  const jsonsChunks = integer().chain(spaces => 
    array(unicodeJsonObject()).chain(jsons => 
      constant({
        jsons,
        chunks: jsons.map(json => JSON.stringify(json, null, spaces))
      })  
    )
  )

  assert(
    property(argv, lines, jsonsChunks, (argv, lines, {jsons, chunks}) =>
      expect(
        deserializer(argv)(chunks, lines)
      ).toStrictEqual(
        {err, jsons}
      )
    )
  )
})

test('deserializing text that is not json throws one of a list of errors, not using lines since verbose is 0', () => {
  const argv                     = {verbose: 0, noBulk: true}
  const lines                    = anything()
  const potentiallyInvalidChunks = array(unicodeJson().map(str => str.slice(1)))
  const msgs                     = [
    'Unexpected end of',
    'Unexpected chunk ',
    'Unexpected number',
    'Unexpected string'
  ]

  assert(
    property(lines, potentiallyInvalidChunks, (lines, chunks) =>
      deserializer(argv)(chunks, lines)
      .err
      .map(e => e.msg.slice(0, 17))
      .reduce(
        (bool, err) => bool && msgs.indexOf(err) > -1,
        true
      )
    )
  )
})

test('deserializing text that is not json fails with errors and lines if verbose is 1', () => {
  const argv           = {verbose: 1, noBulk: true}
  const jsons          = []
  const chunksLinesErr = integer(0, 20).chain(len =>
    array(integer(), len, len).chain(lines =>
      array(func(anything()).map(f => f.toString()), len, len).chain(chunks =>
        constant({
          chunks,
          lines,
          err: lines.map(line => ({msg: 'Unexpected chunk < in JSON at position 0', line}))
        })
      )
    )
  )

  assert(
    property(chunksLinesErr, ({chunks, lines, err}) =>
      expect(
        deserializer(argv)(chunks, lines)
      ).toStrictEqual(
        {err, jsons}
      )
    )
  )
})

test('deserializing text that is not json fails with errors, lines, and info if verbose is 2 or higher', () => {
  const argv           = integer(2, 50).chain(verbose => constant({verbose, noBulk: true}))
  const jsons          = []
  const chunksLinesErr = integer(0, 20).chain(len =>
    array(integer(), len, len).chain(lines =>
      array(func(anything()).map(f => f.toString()), len, len).chain(chunks =>
        constant({
          chunks,
          lines,
          err: lines.map(
            (line, index) => ({msg: 'Unexpected chunk < in JSON at position 0', line, info: chunks[index]})
          )
        })
      )
    )
  )

  assert(
    property(argv, chunksLinesErr, (argv, {chunks, lines, err}) =>
      expect(
        deserializer(argv)(chunks, lines)
      ).toStrictEqual(
        {err, jsons}
      )
    )
  )
})