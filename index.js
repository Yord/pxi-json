module.exports = {
  lexers: [
    require('./src/lexers/stream')
  ],
  parsers: [
    require('./src/parsers/json')
  ],
  applicators: [],
  marshallers: [
    require('./src/marshallers/stringify')
  ]
}