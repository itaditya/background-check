const nock = require('nock')
const request = require('superagent')
require('dotenv').config()

const analyseSentiment = require('../lib/utils/analyseSentiment')

const { PERSPECTIVE_API_KEY } = process.env
const sentimentAnalyserInstance = analyseSentiment(PERSPECTIVE_API_KEY, {
  dependencies: { request }
})

const TOXIC_MIN_VALUE = 0.6
const ERROR_FLAG = -1

describe('that analyseSentiment is working', () => {
  test.skip('that simple toxic text is detected', async() => {
    const text = "@itaditya I don't like the way you do things, your library is a joke"
    const toxicScore = await sentimentAnalyserInstance(text)
    expect(toxicScore).toBeGreaterThanOrEqual(TOXIC_MIN_VALUE)
  })
  describe('that request errors are handled properly', () => {
    test('that promise rejection is handled properly', async() => {
      const text = "@itaditya I don't know if you are right on this"
      const faultyRequest = {
        post: function () { return this },
        set: function () { return this },
        send: () => {
          return Promise.reject(new Error('error'))
        }
      }
      const fakeSentimentAnalyserInstance = analyseSentiment(PERSPECTIVE_API_KEY, {
        dependencies: { request: faultyRequest }
      })
      const toxicScore = await fakeSentimentAnalyserInstance(text)
      expect(toxicScore).toBe(ERROR_FLAG)
    })
    test('that throw is handled properly', async() => {
      const text = "@itaditya I don't know if you are right on this"
      const faultyRequest = {
        post: function () { return this },
        set: function () { return this },
        send: () => {
          throw (new Error('error'))
        }
      }
      const fakeSentimentAnalyserInstance = analyseSentiment(PERSPECTIVE_API_KEY, {
        dependencies: { request: faultyRequest }
      })
      const toxicScore = await fakeSentimentAnalyserInstance(text)
      expect(toxicScore).toBe(ERROR_FLAG)
    })
  })
  describe('that errors not related to request are caught using nock', () => {
    const expectedToxicScore = 0.7
    beforeEach(() => {
      nock('https://commentanalyzer.googleapis.com/v1alpha1')
        .post('/comments:analyze')
        .query({
          key: PERSPECTIVE_API_KEY
        })
        .reply(200, {
          attributeScores: {
            TOXICITY: {
              summaryScore: {
                value: expectedToxicScore
              }
            }
          }
        })
    })
    afterEach(() => {
      nock.restore()
    })
    test(`returns toxicScore ${expectedToxicScore}`, async() => {
      const text = "@itaditya I don't like the way you do things, your library is a joke"
      const toxicScore = await sentimentAnalyserInstance(text)
      expect(toxicScore).toBe(expectedToxicScore)
    })
    test(`that undefined argument returns ${ERROR_FLAG}`, async() => {
      const toxicScore = await sentimentAnalyserInstance()
      expect(toxicScore).toBe(ERROR_FLAG)
    })
    test(`that empty text returns ${ERROR_FLAG}`, async() => {
      const text = ''
      const toxicScore = await sentimentAnalyserInstance(text)
      expect(toxicScore).toBe(ERROR_FLAG)
    })
    test(`that text of size more than 3000B returns ${ERROR_FLAG}`, async() => {
      let text = 'are you mad'.repeat(1000)
      const toxicScore = await sentimentAnalyserInstance(text)
      expect(toxicScore).toBe(ERROR_FLAG)
    })
    test('that non toxic text is not considered toxic', async() => {
      const text = "@itaditya I don't know if you are right on this"
      const toxicScore = await sentimentAnalyserInstance(text)
      expect(toxicScore).toBeLessThanOrEqual(TOXIC_MIN_VALUE)
    })
  })
})
