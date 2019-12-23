module.exports = {
  name: 'jsonBulk',
  desc: 'parses all tokens into JSON in one go, which is faster, but fails the whole bulk instead of just a single token if an error is thrown.',
  func: (argv) => (tokens, lines) => {
    const parseToken = tokenParser(argv)
    
    const firstLine = argv.verbose > 0 ? lines[0] : -1
    const token = concatTokens(tokens)
    return parseToken(token, firstLine)
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

  return str
}

function tokenParser ({verbose}) {
  return (token, firstLine) => {
    let jsons = []
    const err = []

    try {
      jsons = JSON.parse(token)
    } catch (e) {
      const msg  =               {msg:  e.message}
      const line = verbose > 0 ? {line: firstLine} : {}
      const info = verbose > 1 ? {info: token}     : {}
      err.push(Object.assign(msg, line, info))
    }

    return {err, jsons}
  }
}