module.exports = {
  chunkers:      [
    require('./src/chunkers/jsonObj')
  ],
  deserializers: [
    require('./src/deserializers/json')
  ],
  appliers:      [],
  serializers:   [
    require('./src/serializers/json')
  ]
}