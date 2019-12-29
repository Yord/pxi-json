module.exports = {
  lexers:      [
    require('./src/lexers/jsonObj')
  ],
  parsers:     [
    require('./src/parsers/json')
  ],
  applicators: [],
  marshallers: [
    require('./src/marshallers/json')
  ]
}