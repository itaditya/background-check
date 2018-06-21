/**
 * analyseSentiment module
 * @param {string} perspectiveApiKey - the api access key for Perspective API
 * @param {object} params
 * @param {object} params.dependencies - accepts the dependecies following **dependency inversion principle**.
 * @param {function} params.dependencies.request - lib to make http requests.
 * @returns {analyseSentiment}
 * @example
 * const analyseSentiment = analyseSentimentModule({ dependencies: { request } })
 */

const analyseSentimentModule = (perspectiveApiKey, { dependencies: { request } }) => {
  const BASE_URL = 'https://commentanalyzer.googleapis.com/v1alpha1'
  const API_URL = `${BASE_URL}/comments:analyze?key=${perspectiveApiKey}`

  /**
   * analyseSentiment method
   * @param {string} text - the text to be analysed.
   * @returns {promise<number>}
   * @example
   * await analyseSentiment('analyse this text')
   */
  const analyseSentiment = async (text) => {
    if (!text) return -1
    const textLength = text.length
    if (textLength < 1 || textLength > 3000) return -1 // perspective api text limit 3000B
    try {
      const response = await request.post(API_URL)
      .set('Content-Type', 'application/json')
      .send({
        comment: { text },
        languages: ['en'],
        requestedAttributes: { TOXICITY: {} }
      })

      const score = response.body.attributeScores.TOXICITY.summaryScore.value
      return score
    } catch (err) {
      console.log('err', err)
      return -1
    }
  }

  return analyseSentiment
}

module.exports = analyseSentimentModule
