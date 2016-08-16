'use strict'

const request = require('request-promise-native')

class Weibo {
  constructor (word) {
    this.word = word
    this.baseUrl = encodeURI('http://m.weibo.cn/page/pageJson'),
    this.result = {
      weibo: []
    }
  }

  request () {
    return request({
      uri: this.baseUrl,
      qs: {
        queryVal: this.word,
        title: this.word,
        page: 1,
        containerid: `100103type=1%26q=${this.word}`
      },
      method: 'get',
      json: true
    })
  }

  parse (data) {
    let cards
    data.cards.forEach(group => {
      if (group.itemid === 'mblog') cards = group.card_group
    })
    cards.forEach(card => {
      if (card.mblog) {
        let item = {}
        item.url = card.scheme
        item.desc = card.mblog.text
        item.author = {
          name: card.mblog.user.screen_name,
          verified: card.mblog.user.verified,
          verifiedReason: card.mblog.user.verified_reason
        }
        item.comments = card.mblog.comments_count || 0
        item.likes = card.mblog.likes_count || 0
        item.reposts = card.mblog.reposts_count || 0
        item.time = new Date(parseInt(card.mblog.created_timestamp + '000'))
        this.result.weibo.push(item)
      }
    })
  }

  async scrape () {
    const data = await this.request()
    if (data.maxPage === 0) throw new Error('抓取结果为空。')
    else this.parse(data)
    return this.result
  }
}

module.exports = Weibo
