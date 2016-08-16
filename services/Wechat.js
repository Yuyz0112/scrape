'use strict'

const scrapeIt = require("scrape-it")

class Wechat {
  constructor (word) {
    this.word = word
    this.articleUrl = encodeURI(`http://weixin.sogou.com/weixin?type=2&query=${word}`)
    this.accountUrl = encodeURI(`http://weixin.sogou.com/weixin?type=1&query=${word}`)
  }

  cutString (string, start, end) {
    const startPos = string.indexOf(start)
    const endPos = end ? string.indexOf(end) : string.length
    if (startPos === -1 || endPos === -1 || startPos >= endPos) {
      return ''
    }
    return string.substring(startPos + start.length, endPos)
  }

  scrapeArticle () {
    return scrapeIt(this.articleUrl, {
      article: {
        listItem: '.wx-rb.wx-rb3',
        data: {
          title: 'h4',
          author: {
            selector: '.s-p .wx-name',
            convert: str => this.cutString(str, '("', '",')
          },
          time: {
            selector: '.s-p',
            attr: 't',
            convert: time => new Date(parseInt(time + '000'))
          },
          desc: 'p',
          url: {
            selector: 'h4 a',
            attr: 'href'
          }
        }
      }
    })
  }

  scrapeAccount () {
    return scrapeIt(this.accountUrl, {
      account: {
        listItem: '.wx-rb .txt-box',
        data: {
          name: 'h3',
          account: {
            selector: 'h4',
            convert: str => this.cutString(str, '微信号：')
          },
          desc: {
            selector: '.s-p3 .sp-txt',
            eq: 0
          },
          recentArticle: {
            selector: '.s-p3 .sp-txt',
            eq: 1,
            convert: str => this.cutString(str, '', 'vrTime')
          },
          recentArticleTime: {
            selector: '.s-p3 .sp-txt',
            eq: 1,
            convert: str => {
              if (!str) return ''
              str = this.cutString(str, "('", "')") + '000'
              return new Date(parseInt(str))
            }
          }
        }
      }
    })
  }

  async scrape () {
    const article = await this.scrapeArticle()
    const account = await this.scrapeAccount()
    return {
      wechat: {
        article: article.article,
        account: account.account
      }
    }
  }
}

module.exports = Wechat
