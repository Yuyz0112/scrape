'use strict'

const News = require('./services/News')
const Weibo = require('./services/Weibo')
const Wechat = require('./services/Wechat')
const Render = require('./services/Render')
const sendMail = require('./services/Email.js')

const scrape = async (word) => {
  try {
    let result = {}
    const news = new News(word)
    Object.assign(result, await news.scrape())
    const weibo = new Weibo(word)
    Object.assign(result, await weibo.scrape())
    const wechat = new Wechat(word)
    Object.assign(result, await wechat.scrape())
    result.date = new Date()
    const temp = await Render(result, word)
    const receipt = await sendMail(temp, '2286110207@qq.com')
    console.log(receipt)
  } catch (e) {
    console.log(`error: ${e}`)
  }
}

scrape('楚天高速')

// const str = 'SUV=005372336FC0A3F357B35F4885048974;IPLOC=CN1100;SUID=F3A3C06F6B20900A0000000057B35F7B;SUID=F3A3C06F2A0B940A0000000057B35F7B;SUIR=1471373192;SNUID=530261CEA1A49A95655222A8A1097D05'
// const _str = 'ABTEST=8|1471373172|v1;JSESSIONID=aaatqW5Dpy_7ZfychWGwv;PHPSESSID=3voqtmfvbb346keldipctrf571;SUID=F3A3C06F2A0B940A0000000057B35F7B'
// const arr = str.split(';')
// const _arr = _str.split(';')
// const j = request.jar()
// arr.forEach(cookie => j.setCookie(request.cookie(cookie), 'http://sogou.com/'))
// _arr.forEach(cookie => j.setCookie(request.cookie(cookie), 'http://weixin.sogou.com/'))

// request({
//   uri: encodeURI(`http://weixin.sogou.com/weixin?type=2&query=楚天高速`),
//   jar: j,
//   header: {
//     'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'
//   }
// })
// .then(val => console.log(val))
