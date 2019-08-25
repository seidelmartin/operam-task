const superagent = require('superagent')

/**
 * @param {string} [filter]
 */
export const getTree = async (filter) => {
  const resp = await superagent('get', 'http://localhost:3000/tree')
    .query({ filter })

  return resp.body
}
