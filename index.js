module.exports = {
  chunkers:    [
    require('./src/chunkers/jsonObj')
  ],
  parsers:     [
    require('./src/parsers/json')
  ],
  applicators: [],
  marshallers: [
    require('./src/marshallers/json')
  ]
}