'use strict'

const scrapeIt = require("scrape-it")

class News {
  constructor (word, timeGap) {
    this.word = word
    this.baseUrl = encodeURI(`http://news.baidu.com/ns?rn=10&tn=news&clk=sortbytime&word=${word}`)
    this.timeGap = timeGap
    this.result = {}
  }

  cutString (string, start, end) {
    const startPos = string.indexOf(start)
    const endPos = end ? string.indexOf(end) : string.length
    if (startPos === -1 || endPos === -1 || startPos >= endPos) {
      return ''
    }
    return string.substring(startPos + start.length, endPos)
  }

  parseTime (time) {
    const year = parseInt(this.cutString(time, '', '年'))
    const month = parseInt(this.cutString(time, '年', '月')) - 1
    const day = parseInt(this.cutString(time, '月', '日'))
    const hour = parseInt(this.cutString(time, ' ', ':'))
    const minute = parseInt(this.cutString(time, ':'))
    let date = new Date()
    date.setFullYear(year)
    date.setMonth(month)
    date.setDate(day)
    date.setHours(hour)
    date.setMinutes(minute)
    return date.getTime()
  }

  parse () {
    return scrapeIt(this.baseUrl, {
      news: {
        listItem: '.result',
        data: {
          title: '.c-title',
          author: {
            selector: '.c-author',
            convert: str => this.cutString(str, '', '\xa0\xa0')
          },
          time: {
            selector: '.c-author',
            convert: str => this.cutString(str, '\xa0\xa0')
          },
          desc: {
            selector: '.c-summary',
            how: 'html',
            convert: html => this.cutString(html, '</p>', '<span').replace(/<em>/g, '')
          },
          url: {
            selector: '.c-title a',
            attr: 'href'
          }
        }
      }
    })
  }

  checkTime () {
    return this.result.news.filter(news => {
      const now = new Date()
      if (news.time.indexOf('前') !== -1) return true
      else if (now.getTime() - (1000 * this.timeGap) < this.parseTime(news.time)) return true
      return false
    })
  }

  async scrape () {
    this.result = await this.parse()
    this.result.news = this.checkTime()
    return this.result
  }
}

module.exports = News
