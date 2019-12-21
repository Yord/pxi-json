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