const {anything, array, assert, constant, integer, unicodeJsonObject, property} = require('fast-check')
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