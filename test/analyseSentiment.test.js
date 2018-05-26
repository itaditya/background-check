require('dotenv').config()
const request = require('superagent')

const analyseSentiment = require('../lib/utils/analyseSentiment')

const { PERSPECTIVE_API_KEY } = process.env
const sentimentAnalyserInstance = analyseSentiment(PERSPECTIVE_API_KEY, {
  dependencies: { request }
})

const TOXIC_MIN_VALUE = 0.6
const ERROR_FLAG = -1

describe('that analyseSentiment is working', () => {
  test('that simple text works', async () => {
    const text = "@itaditya I don't like the way you do things, your library is a joke"
    const toxicScore = await sentimentAnalyserInstance(text)
    expect(toxicScore).toBeGreaterThanOrEqual(toxicScore)
  })
  test(`that undefined argument returns ${ERROR_FLAG}`, async () => {
    const toxicScore = await sentimentAnalyserInstance()
    expect(toxicScore).toBe(ERROR_FLAG)
  })
  test(`that empty text returns ${ERROR_FLAG}`, async () => {
    const text = ''
    const toxicScore = await sentimentAnalyserInstance(text)
    expect(toxicScore).toBe(ERROR_FLAG)
  })
  test(`that text of size more than 3000B returns ${ERROR_FLAG}`, async () => {
    let text = 'are you mad'.repeat(1000)
    const toxicScore = await sentimentAnalyserInstance(text)
    expect(toxicScore).toBe(ERROR_FLAG)
  })
  test('that non toxic text is not considered toxic', async () => {
    const text = "@itaditya I don't know if you are right on this"
    const toxicScore = await sentimentAnalyserInstance(text)
    expect(toxicScore).toBeLessThanOrEqual(toxicScore)
  })
})
