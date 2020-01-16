module.exports = {
  name: 'json',
  desc: 'deserializes each chunk into JSON, but fails all chunks if an error is thrown:\n\n--no-bulk, -B [boolean]\nDeactivates bulk deserializing, which is much slower, but fails only those chunks that throw an error.\n',
  func: ({B, noBulk, verbose}) => {
    const _noBulk           = noBulk || B || false
    const deserializeChunks = chunksDeserializer({verbose})
  
    if (_noBulk) {
      return (chunks, lines) => {
        const _lines       = verbose > 0 ? lines : []
        const {jsons, err} = deserializeChunks(chunks, _lines)
  
        return {jsons, err}
      }
    } else {
      return (chunks, lines) => {
        const _lines       = verbose > 0 ? lines : []
        const {jsons, err} = deserializeChunks(concatChunks(chunks), _lines)
        const jsons2       = typeof jsons[0] !== 'undefined' ? jsons[0] : []

        return {jsons: jsons2, err}
      }
    }
  }
}

function concatChunks (chunks) {
  let str = '['

  const chunksLen = chunks.length

  if (chunksLen === 0) str += ']'
  else if (chunksLen === 1) str += chunks[0] + ']'
  else {
    str += chunks[0]
    for (let index = 1; index < chunksLen; index++) str += ',' + chunks[index]
    str += ']'
  }

  return [str]
}

function chunksDeserializer ({verbose}) {
  return (chunks, lines) => {
    const jsons = []
    const err   = []
  
    for (let index = 0; index < chunks.length; index++) {
      const chunk = chunks[index]
  
      try {
        const obj = JSON.parse(chunk)
        jsons.push(obj)
      } catch (e) {
        const hint = '(if the JSON is formatted over several lines, try using the jsonObj chunker)'
        const msg  =               {msg:  e.message + ' ' + hint}
        const line = verbose > 0 ? {line: lines[index]} : {}
        const info = verbose > 1 ? {info: chunk}        : {}
        err.push(Object.assign(msg, line, info))
      }
    }
  
    return {err, jsons}
  }
}