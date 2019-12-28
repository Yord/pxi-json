module.exports = {
  name: 'json',
  desc: 'parses each token into JSON, but fails all tokens if an error is thrown:\n\n--no-bulk, -B [boolean]\nDeactivates bulk parsing, which is much slower, but fails only those tokens that throw an error.\n',
  func: ({B, noBulk, verbose}) => {
    const _noBulk     = noBulk || B || false
    const parseTokens = tokensParser({verbose})
  
    if (_noBulk) {
      return (tokens, lines) => {
        const _lines       = verbose > 0 ? lines : []
        const {jsons, err} = parseTokens(tokens, _lines)
  
        return {jsons, err}
      }
    } else {
      return (tokens, lines) => {
        const _lines       = verbose > 0 ? lines : []
        const {jsons, err} = parseTokens(concatTokens(tokens), _lines)
        const jsons2       = typeof jsons[0] !== 'undefined' ? jsons[0] : []

        return {jsons: jsons2, err}
      }
    }
  }
}

function concatTokens (tokens) {
  let str = '['

  const tokensLen = tokens.length

  if (tokensLen === 0) str += ']'
  else if (tokensLen === 1) str += tokens[0] + ']'
  else {
    str += tokens[0]
    for (let index = 1; index < tokensLen; index++) str += ',' + tokens[index]
    str += ']'
  }

  return [str]
}

function tokensParser ({verbose}) {
  return (tokens, lines) => {
    const jsons = []
    const err   = []
  
    for (let index = 0; index < tokens.length; index++) {
      const token = tokens[index]
  
      try {
        const obj = JSON.parse(token)
        jsons.push(obj)
      } catch (e) {
        const msg  =               {msg:  e.message}
        const line = verbose > 0 ? {line: lines[index]} : {}
        const info = verbose > 1 ? {info: token}        : {}
        err.push(Object.assign(msg, line, info))
      }
    }
  
    return {err, jsons}
  }
}