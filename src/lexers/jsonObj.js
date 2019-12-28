module.exports = {
  name: 'jsonObj',
  desc: 'lexes streams of JSON objects (not arrays!) and drops all characters in between.',
  func: ({verbose}) => (data, linesOffset) => {
    const tokens  = []
    const lines   = []
    const err     = []
  
    let text      = data
    let len       = text.length
  
    let at        = -1
    let lastLine  = linesOffset
    
    let isEscaped = false
    let inString  = false
    let inObj     = false
  
    let objFound  = false
    let brackets  = 0
  
    let isDone    = false
    let from      = 0
    let ch
    
    do {
      at++
      ch = text.charAt(at)
  
      if (verbose > 0 && ch === '\n') lastLine++
  
      if (!inObj) {
        if (ch === '{') {
          from = at
          brackets = 1
          inObj = true
          if (verbose > 0) lines.push(lastLine)
        }
      } else {
        if (inString) {
          if (isEscaped) isEscaped = false
          else {
            if (ch === '"') inString = false
            else if (ch === '\\') isEscaped = true
          }
        } else {
          if (ch === '"') inString = true
          else if (ch === '{') brackets++
          else if (ch === '}') {
            brackets--
            if (brackets === 0) {
              inObj    = false
              objFound = true
            }
          }
        }
      }
      
      if (at === len) isDone = true
  
      if (objFound) {
        objFound    = false
        const token = text.slice(from, at + 1)
        
        tokens.push(token)
  
        text = text.slice(at + 1, len)
        len  = text.length
        at   = -1
      }
    } while (!isDone)
  
    const lastLineWithoutRest = lines.length === 0 ? linesOffset : lines[lines.length - 1]
    return {err, tokens, lines, lastLine: lastLineWithoutRest, rest: text}
  }
}