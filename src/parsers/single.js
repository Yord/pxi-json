module.exports = {
  name: 'jsonSingle',
  desc: 'parses each token into JSON individually.',
  func: ({verbose}) => (tokens, lines) => {
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