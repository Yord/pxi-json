const {anything, array, assert, constant, func, integer, oneof, property, unicodeJsonObject} = require('fast-check')
const {func: marshaller} = require('./stringify')

test('returns stringified jsons with formatting separated by newlines', () => {
  const err    = []
  const values = array(unicodeJsonObject())
  const argv   = anything().chain(verbose =>
    integer(0, 20).chain(spaces =>
      oneof(constant('spaces'), constant('S')).chain(_spaces =>
        oneof(constant('keep'), constant('K')).chain(_keep =>
          constant({verbose, [_spaces]: spaces, [_keep]: null})
        )
      )
    )
  )

  assert(
    property(argv, values, (argv, values) => {
      const str = values.map(value => JSON.stringify(value, argv.keep || argv.K, argv.spaces || argv.S) + '\n').join('')

      expect(
        marshaller(argv)(values)
      ).toStrictEqual(
        {err, str}
      )
    })
  )
})

test('return the empty string if stringify does not work for an object instead of an error', () => {
  const err    = []
  const str    = ''
  const values = array(func(integer()))
  const argv   = anything().chain(verbose =>
    integer(0, 20).chain(spaces =>
      oneof(constant('spaces'), constant('S')).chain(_spaces =>
        oneof(constant('keep'), constant('K')).chain(_keep =>
          constant({verbose, [_spaces]: spaces, [_keep]: null})
        )
      )
    )
  )

  assert(
    property(argv, values, (argv, values) =>
      expect(
        marshaller(argv)(values)
      ).toStrictEqual(
        {err, str}
      )
    )
  )
})

test('should fail on an object with circular reference, disregarding verbose', () => {
  const str       = ''
  const valuesErr = array(unicodeJsonObject()).chain(jsons => {
    const values = jsons.map(json => {
      const circular  = {json}
      circular.circle = circular
      return circular
    })
    return constant({
      values,
      err: values.map(() => "TypeError: Converting circular structure to JSON")
    })
  })
  const argv      = anything().chain(verbose =>
    integer(0, 20).chain(spaces =>
      oneof(constant('spaces'), constant('S')).chain(_spaces =>
        oneof(constant('keep'), constant('K')).chain(_keep =>
          constant({verbose, [_spaces]: spaces, [_keep]: null})
        )
      )
    )
  )

  assert(
    property(argv, valuesErr, (argv, {values, err}) => {
      const result = marshaller(argv)(values)
      result.err = result.err.map(e => e.slice(0, 48))
      // must slice error since node v13 has more details than node v8.3.0
      expect(
        result
      ).toStrictEqual(
        {err, str}
      )
    })
  )
})