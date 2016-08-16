'use strict'

const scrapeIt = require("scrape-it")

class News {
  constructor (word) {
    this.word = word
    this.baseUrl = encodeURI(`http://news.baidu.com/ns?rn=10&tn=news&clk=sortbytime&word=${word}`)
  }

  cutString (string, start, end) {
    const startPos = string.indexOf(start)
    const endPos = end ? string.indexOf(end) : string.length
    if (startPos === -1 || endPos === -1 || startPos >= endPos) {
      return ''
    }
    return string.substring(startPos + start.length, endPos)
  }

  scrape () {
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
}

module.exports = News
