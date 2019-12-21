const {anything, array, assert, constant, integer, unicodeJsonObject, property} = require('fast-check')
const {func: parser} = require('./single')

test('parses each json element individually, even if it is formatted over several lines', () => {
  const err         = []
  const argv        = anything().chain(verbose => constant({verbose}))
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
    property(argv, lines, jsonsTokens, (argv, lines, {jsons, tokens}) =>
      expect(
        parser(argv)(tokens, lines)
      ).toStrictEqual(
        {err, jsons}
      )
    )
  )
})