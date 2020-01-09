module.exports = {
  chunkers:      [
    require('./src/chunkers/jsonObj')
  ],
  deserializers: [
    require('./src/deserializers/json')
  ],
  applicators:   [],
  serializers:   [
    require('./src/serializers/json')
  ]
}