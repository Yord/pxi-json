module.exports = {
  lexers: [
    require('./src/lexers/stream')
  ],
  parsers: [
    require('./src/parsers/single'),
    require('./src/parsers/bulk')
  ],
  applicators: [],
  marshallers: [
    require('./src/marshallers/stringify')
  ]
}