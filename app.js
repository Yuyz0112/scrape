'use strict'

const News = require('./services/News')
const Weibo = require('./services/Weibo')
const Wechat = require('./services/Wechat')
const Render = require('./services/Render')
const sendMail = require('./services/Email.js')

const emails = [
  '569812520@qq.com',
  'joviwang@ssmpr.com',
  'fy.liu@ssmpr.com',
  'liumingna@ssmpr.com',
  'lisdong@ssmpr.com'
]

const timeGap = 2 * 24 * 60 * 60 // 2 days

const scrape = async (word, t) => {
  try {
    let result = {}
    const news = new News(word, t)
    Object.assign(result, await news.scrape())
    const weibo = new Weibo(word, t)
    Object.assign(result, await weibo.scrape())
    const wechat = new Wechat(word, t)
    Object.assign(result, await wechat.scrape())
    result.date = new Date()
    const temp = await Render(result, word)
    emails.forEach(async (email) => {
      const receipt = await sendMail(temp, email)
      console.log(receipt)
    })
  } catch (e) {
    console.log(`error: ${e}`)
  }
}

scrape('楚天高速', timeGap)
