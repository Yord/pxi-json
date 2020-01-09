module.exports = {
  chunkers:      [
    require('./src/chunkers/jsonObj')
  ],
  deserializers: [
    require('./src/deserializers/json')
  ],
  applicators:   [],
  marshallers:   [
    require('./src/marshallers/json')
  ]
}