'use strict'

const nodemailer = require('nodemailer')

const send = (temp, email) => {
  const transport = nodemailer.createTransport({
    host: 'smtp.qq.com',
    secure: true,
    port: 465,
    auth: {
      user: 'funyuchina@qq.com',
      pass: 'utjdskcmlheudcab'
    }
  })

  return transport.sendMail({
    from: 'funyuchina@qq.com',
    to: email,
    subject: '舆情监测报告',
    generateTextFromHTML: true,
    html: temp
  })
}

module.exports = send
