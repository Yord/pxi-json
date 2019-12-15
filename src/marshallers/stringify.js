module.exports = {
  name: 'jsonStringify',
  desc: 'uses JSON.stringify and has the following additional options:\n\n-S, --spaces\nThe number of spaces used to format JSON. If it is set to 0 (default), the JSON is printed in a single line.    [number]\n\n-s, --select\nDetermines which JSON fields are kept. If it is left out (default), all fields remain. If it is a string formatted as a JSON array, all fields in the array are kept. See the documentation of JSON.stringify for details.        [string]\n\n',
  func: ({verbose, spaces, S, select, s}) => {
    const _spaces   = spaces || S || 0
    const selectStr = select || s || null
    const _select   = JSON.parse(selectStr) || null

    return jsons => {
      let str   = ''
      const err = []

      for (let index = 0; index < jsons.length; index++) {
        try {
          const obj = jsons[index]
          str += JSON.stringify(obj, _select, _spaces) + '\n'
        } catch (e) {
          const info = verbose > 1 ? ' while marshalling:\n' + JSON.stringify(obj, null, 2) : ''
          err.push(e + info)
        }
      }

      return {err, str}
    }
  }
}