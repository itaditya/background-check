module.exports = (API_KEY, { dependencies: { request } }) => {
  const BASE_URL = 'https://commentanalyzer.googleapis.com/v1alpha1'
  const API_URL = `${BASE_URL}/comments:analyze?key=${API_KEY}`

  const analyseSentiment = async (text) => {
    const textLength = text.length
    if (textLength < 1 || textLength > 3000) return -1 // perspective api text limit 3000
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
    }
  }

  return analyseSentiment
}
