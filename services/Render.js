'use strict'
const fs = require('fs')

const formatDate = (_date) => {
  const date = new Date(_date)
  return _date ? `${date.getYear() + 1900}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}` : ''
}

const Render = async (data, word) => {
  try {
    const date = data.date
    const time = date.getTime()
    const url = `http://app.funyuchina.com/report/${time}.html`
    let rendered = {
      news: '',
      weibo: '',
      wechat: {
        article: '',
        account: ''
      }
    }

    data.news.forEach(news => {
      const newsTemplate = `
        <table>
          <tr>
            <td align="center" valign="top">
              <!-- CENTERING TABLE // -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" valign="top">
                    <!-- FLEXIBLE CONTAINER // -->
                    <table border="0" cellpadding="0" cellspacing="0" width="600" class="flexibleContainer">
                      <tr>
                        <td align="center" valign="top" width="600" class="flexibleContainerCell bottomShim">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="nestedContainer">
                            <tr>
                              <td align="center" valign="top" class="nestedContainerCell">
                                <!-- CONTENT TABLE // -->
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                  <tr>
                                    <td valign="top" class="textContent">
                                      <a href="${news.url}" target="_blank"><h3>${news.title}</h3></a>
                                      ${news.desc}
                                      <h5>${news.author}&nbsp&nbsp${news.time}</h5>
                                    </td>
                                  </tr>
                                </table>
                                <!-- // CONTENT TABLE --> </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    <!-- // FLEXIBLE CONTAINER --> </td>
                </tr>
              </table>
              <!-- // CENTERING TABLE --> </td>
          </tr>
        </table>
      `
      rendered.news += newsTemplate
    })

    data.weibo.forEach(weibo => {
      const weiboTemplate = `
        <table>
          <tr>
            <td align="center" valign="top">
              <!-- CENTERING TABLE // -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" valign="top">
                    <!-- FLEXIBLE CONTAINER // -->
                    <table border="0" cellpadding="0" cellspacing="0" width="600" class="flexibleContainer">
                      <tr>
                        <td align="center" valign="top" width="600" class="flexibleContainerCell bottomShim">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="nestedContainer">
                            <tr>
                              <td align="center" valign="top" class="nestedContainerCell">
                                <!-- CONTENT TABLE // -->
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                  <tr>
                                    <td valign="top" class="textContent">
                                      <h3>${weibo.author.name}${weibo.author.verified ? '： （大V认证 ' + weibo.author.verifiedReason + '）' : ''}</h3>
                                      ${weibo.desc}
                                      <h5>评论：${weibo.comments}&nbsp&nbsp&nbsp&nbsp点赞：${weibo.likes}&nbsp&nbsp&nbsp&nbsp转发：${weibo.reposts}</h5>
                                      <h5>${formatDate(weibo.time)}&nbsp&nbsp&nbsp&nbsp<a href="${weibo.url}" target="_blank">打开微博原文</a></h5>
                                    </td>
                                  </tr>
                                </table>
                                <!-- // CONTENT TABLE --> </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    <!-- // FLEXIBLE CONTAINER --> </td>
                </tr>
              </table>
              <!-- // CENTERING TABLE --> </td>
          </tr>
        </table>
      `
      rendered.weibo += weiboTemplate
    })

    data.wechat.article.forEach(wechat => {
      const wechatArticleTemplate = `
        <table>
          <tr>
            <td align="center" valign="top">
              <!-- CENTERING TABLE // -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" valign="top">
                    <!-- FLEXIBLE CONTAINER // -->
                    <table border="0" cellpadding="0" cellspacing="0" width="600" class="flexibleContainer">
                      <tr>
                        <td align="center" valign="top" width="600" class="flexibleContainerCell bottomShim">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="nestedContainer">
                            <tr>
                              <td align="center" valign="top" class="nestedContainerCell">
                                <!-- CONTENT TABLE // -->
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                  <tr>
                                    <td valign="top" class="textContent">
                                      <a href="${wechat.url}" target="_blank"><h3>${wechat.title}</h3></a>
                                      ${wechat.desc}
                                      <h5>${wechat.author}&nbsp&nbsp${formatDate(wechat.time)}</h5>
                                    </td>
                                  </tr>
                                </table>
                                <!-- // CONTENT TABLE --> </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    <!-- // FLEXIBLE CONTAINER --> </td>
                </tr>
              </table>
              <!-- // CENTERING TABLE --> </td>
          </tr>
        </table>
      `
      rendered.wechat.article += wechatArticleTemplate
    })

    data.wechat.account.forEach(wechat => {
      const wechatAccountTemplate = `
        <table>
          <tr>
            <td align="center" valign="top">
              <!-- CENTERING TABLE // -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" valign="top">
                    <!-- FLEXIBLE CONTAINER // -->
                    <table border="0" cellpadding="0" cellspacing="0" width="600" class="flexibleContainer">
                      <tr>
                        <td align="center" valign="top" width="600" class="flexibleContainerCell bottomShim">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" class="nestedContainer">
                            <tr>
                              <td align="center" valign="top" class="nestedContainerCell">
                                <!-- CONTENT TABLE // -->
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                  <tr>
                                    <td valign="top" class="textContent">
                                      <h3>${wechat.name}</h3>
                                      <h5>微信号：${wechat.account}</h5>
                                      公众号简介：${wechat.desc}
                                      <h5>${wechat.recentArticle ? '最近文章： ' : ''}${wechat.recentArticle}&nbsp&nbsp${formatDate(wechat.recentArticleTime)}</h5>
                                    </td>
                                  </tr>
                                </table>
                                <!-- // CONTENT TABLE --> </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    <!-- // FLEXIBLE CONTAINER --> </td>
                </tr>
              </table>
              <!-- // CENTERING TABLE --> </td>
          </tr>
        </table>
      `
      rendered.wechat.account += wechatAccountTemplate
    })

    const template = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>${word}舆情监测报告</title>
      <style type="text/css">
        #outlook a{padding:0;}
        .ReadMsgBody{width:100%;} .ExternalClass{width:100%;}
        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%;}
        body, table, td, p, a, li, blockquote{-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;}
        table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;}
        img{-ms-interpolation-mode:bicubic;}
        body{margin:0; padding:0;}
        img{border:0; height:auto; line-height:100%; outline:none; text-decoration:none;}
        table{border-collapse:collapse !important;}
        body, #bodyTable, #bodyCell{height:100% !important; margin:0; padding:0; width:100% !important;}
        #bodyCell{padding:20px;}
        #templateContainer{width:600px;}
        body, #bodyTable{
          /*@editable*/ background-color:#DEE0E2;
        }
        #bodyCell{
          /*@editable*/ border-top:4px solid #BBBBBB;
        }
        #templateContainer{
          /*@editable*/ border:1px solid #BBBBBB;
        }
        h1{
          /*@editable*/ color:#202020 !important;
          display:block;
          /*@editable*/ font-family:Microsoft Yahei;
          /*@editable*/ font-size:26px;
          /*@editable*/ font-style:normal;
          /*@editable*/ font-weight:bold;
          /*@editable*/ line-height:100%;
          /*@editable*/ letter-spacing:normal;
          margin-top:0;
          margin-right:0;
          margin-bottom:10px;
          margin-left:0;
          /*@editable*/ text-align:left;
        }
        h2{
          /*@editable*/ color:#404040 !important;
          display:block;
          /*@editable*/ font-family:Microsoft Yahei;
          /*@editable*/ font-size:20px;
          /*@editable*/ font-style:normal;
          /*@editable*/ font-weight:bold;
          /*@editable*/ line-height:100%;
          /*@editable*/ letter-spacing:normal;
          margin-top:0;
          margin-right:0;
          margin-bottom:10px;
          margin-left:0;
          /*@editable*/ text-align:left;
        }
        h3{
          /*@editable*/ color:#606060 !important;
          display:block;
          /*@editable*/ font-family:Microsoft Yahei;
          /*@editable*/ font-size:16px;
          /*@editable*/ font-style:italic;
          /*@editable*/ font-weight:normal;
          /*@editable*/ line-height:100%;
          /*@editable*/ letter-spacing:normal;
          margin-top:0;
          margin-right:0;
          margin-bottom:10px;
          margin-left:0;
          /*@editable*/ text-align:left;
        }
        h4{
          /*@editable*/ color:#808080 !important;
          display:block;
          /*@editable*/ font-family:Microsoft Yahei;
          /*@editable*/ font-size:14px;
          /*@editable*/ font-style:italic;
          /*@editable*/ font-weight:normal;
          /*@editable*/ line-height:100%;
          /*@editable*/ letter-spacing:normal;
          margin-top:0;
          margin-right:0;
          margin-bottom:10px;
          margin-left:0;
          /*@editable*/ text-align:left;
        }
        h5{
          /*@editable*/ color:#a0a0a0 !important;
          display:block;
          /*@editable*/ font-family:Microsoft Yahei;
          /*@editable*/ font-size:12px;
          /*@editable*/ font-weight:normal;
          /*@editable*/ line-height:100%;
          /*@editable*/ letter-spacing:normal;
          margin-top:5px;
          margin-right:0;
          margin-bottom:5px;
          margin-left:0;
          /*@editable*/ text-align:left;
        }
        #templatePreheader{
          /*@editable*/ background-color:#F4F4F4;
          /*@editable*/ border-bottom:1px solid #CCCCCC;
        }
        .preheaderContent{
          /*@editable*/ color:#808080;
          /*@editable*/ font-family:Microsoft Yahei;
          /*@editable*/ font-size:10px;
          /*@editable*/ line-height:125%;
          /*@editable*/ text-align:left;
        }
        .preheaderContent a:link, .preheaderContent a:visited, /* Yahoo! Mail Override */ .preheaderContent a .yshortcuts /* Yahoo! Mail Override */{
          /*@editable*/ color:#606060;
          /*@editable*/ font-weight:normal;
          /*@editable*/ text-decoration:underline;
        }
        #templateHeader{
          /*@editable*/ background-color:#FFFFFF;
          /*@editable*/ border-top:1px solid #FFFFFF;
          /*@editable*/ border-bottom:1px solid #CCCCCC;
        }
        .headerContent{
          /*@editable*/ color:#505050;
          /*@editable*/ font-family:Microsoft Yahei;
          /*@editable*/ font-size:20px;
          /*@editable*/ font-weight:bold;
          /*@editable*/ line-height:100%;
          /*@editable*/ padding-top:0;
          /*@editable*/ padding-right:0;
          /*@editable*/ padding-bottom:0;
          /*@editable*/ padding-left:0;
          /*@editable*/ text-align:center;
          /*@editable*/ vertical-align:middle;
        }
        .headerContent a:link, .headerContent a:visited, /* Yahoo! Mail Override */ .headerContent a .yshortcuts /* Yahoo! Mail Override */{
          /*@editable*/ color:#EB4102;
          /*@editable*/ font-weight:normal;
          /*@editable*/ text-decoration:underline;
        }
        #headerImage{
          height:auto;
          max-width:600px;
        }
        #templateBody{
          /*@editable*/ background-color:#FFFFFF;
          /*@editable*/ border-top:1px solid #FFFFFF;
          /*@editable*/ border-bottom:1px solid #CCCCCC;
        }
        .bodyContent{
          /*@editable*/ color:#505050;
          /*@editable*/ font-family:Microsoft Yahei;
          /*@editable*/ font-size:14px;
          /*@editable*/ line-height:150%;
          padding-top:20px;
          padding-right:20px;
          padding-bottom:20px;
          padding-left:20px;
          /*@editable*/ text-align:left;
        }
        .bodyContent a:link, .bodyContent a:visited, /* Yahoo! Mail Override */ .bodyContent a .yshortcuts /* Yahoo! Mail Override */{
          /*@editable*/ color:#EB4102;
          /*@editable*/ font-weight:normal;
          /*@editable*/ text-decoration:underline;
        }
        .bodyContent img{
          display:inline;
          height:auto;
          max-width:560px;
        }
        #templateFooter{
          /*@editable*/ background-color:#F4F4F4;
          /*@editable*/ border-top:1px solid #FFFFFF;
        }
        .footerContent{
          /*@editable*/ color:#808080;
          /*@editable*/ font-family:Microsoft Yahei;
          /*@editable*/ font-size:10px;
          /*@editable*/ line-height:150%;
          padding-top:20px;
          padding-right:20px;
          padding-bottom:20px;
          padding-left:20px;
          /*@editable*/ text-align:left;
        }
        .footerContent a:link, .footerContent a:visited, /* Yahoo! Mail Override */ .footerContent a .yshortcuts, .footerContent a span /* Yahoo! Mail Override */{
          /*@editable*/ color:#606060;
          /*@editable*/ font-weight:normal;
          /*@editable*/ text-decoration:underline;
        }
        @media only screen and (max-width: 480px){
          body, table, td, p, a, li, blockquote{-webkit-text-size-adjust:none !important;}
          body{width:100% !important; min-width:100% !important;}
          #bodyCell{padding:10px !important;}
          #templateContainer{
            max-width:600px !important;
            /*@editable*/ width:100% !important;
          }
          h1{
            /*@editable*/ font-size:24px !important;
            /*@editable*/ line-height:100% !important;
          }
          h2{
            /*@editable*/ font-size:20px !important;
            /*@editable*/ line-height:100% !important;
          }
          h3{
            /*@editable*/ font-size:18px !important;
            /*@editable*/ line-height:100% !important;
          }
          h4{
            /*@editable*/ font-size:16px !important;
            /*@editable*/ line-height:100% !important;
          }
          #templatePreheader{display:none !important;}
          #headerImage{
            height:auto !important;
            /*@editable*/ max-width:600px !important;
            /*@editable*/ width:100% !important;
          }
          .headerContent{
            /*@editable*/ font-size:20px !important;
            /*@editable*/ line-height:125% !important;
          }
          .bodyContent{
            /*@editable*/ font-size:18px !important;
            /*@editable*/ line-height:125% !important;
          }
          .footerContent{
            /*@editable*/ font-size:14px !important;
            /*@editable*/ line-height:115% !important;
          }
          .footerContent a{display:block !important;}
        }
        .flexibleContainerCell{padding-top:5px; padding-Right:20px; padding-Left:20px;}
        .flexibleImage{height:auto;}
        .bottomShim{padding-bottom:5px;}
        .imageContent, .imageContentLast{padding-bottom:20px;}
        .nestedContainerCell{padding-top:20px; padding-Right:20px; padding-Left:20px;}
        .textContent, .textContentLast{color:#404040; font-size:16px; line-height:125%; text-align:Left; padding-bottom:20px;}
        .textContent a, .textContentLast a{color:#2C9AB7; text-decoration:underline;}
        .textContent h3{font-style: normal}
        .nestedContainer{background-color:#F1F3F5; border:1px solid #CCCCCC;}
        .emailButton{background-color:#2C9AB7; border-collapse:separate; border-radius:4px;}
        .buttonContent{color:#FFFFFF; font-size:18px; font-weight:bold; line-height:100%; padding:15px; text-align:center;}
        .buttonContent a{color:#FFFFFF; display:block; text-decoration:none;}
        </style>
      </head>
      <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0">
        <center>
        <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable">
          <tr>
            <td align="center" valign="top" id="bodyCell">
              <!-- BEGIN TEMPLATE // -->
              <table border="0" cellpadding="0" cellspacing="0" id="templateContainer">
                <tr>
                  <td align="center" valign="top">
                    <!-- BEGIN PREHEADER // -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templatePreheader">
                      <tr>
                        <td valign="top" class="preheaderContent" style="padding-top:10px; padding-right:20px; padding-bottom:10px; padding-left:20px;" mc:edit="preheader_content00">
                          ${formatDate(date)} 舆情监测报告
                        </td>
                        <!-- *|IFNOT:ARCHIVE_PAGE|* -->
                        <td valign="top" width="180" class="preheaderContent" style="padding-top:10px; padding-right:20px; padding-bottom:10px; padding-left:0;" mc:edit="preheader_content01">
                          邮件无法正常显示？<br /><a href="${url}" target="_blank">在浏览器中打开。</a>.
                        </td>
                        <!-- *|END:IF|* -->
                      </tr>
                    </table>
                    <!-- // END PREHEADER -->
                  </td>
                </tr>
                <tr>
                  <td align="center" valign="top">
                    <!-- BEGIN HEADER // -->
                    <!--
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateHeader">
                      <tr>
                        <td valign="top" class="headerContent">
                          <img src="./assets/logo.jpg" style="max-width:600px;" id="headerImage" mc:label="header_image" mc:edit="header_image" mc:allowdesigner mc:allowtext />
                        </td>
                      </tr>
                    </table>
                    -->
                    <!-- // END HEADER -->
                  </td>
                </tr>
                <tr>
                  <td align="center" valign="top">
                    <!-- BEGIN BODY // -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateBody">
                      <tr>
                        <td valign="top" class="bodyContent" mc:edit="body_content">
                          <h1>舆情监测报告</h1>
                          <h3>监测时间${formatDate(date)}</h3>
                          监测关键词：${word}。
                          <br />
                          监测平台：百度新闻、新浪微博、微信公众号
                          <br />
                          <br />
                          <h2>百度新闻</h2>
                          ${rendered.news}
                          <br />
                          <br />
                          <h2>新浪微博</h2>
                          ${rendered.weibo}
                          <br />
                          <br />
                          <h2>微信公众号文章</h2>
                          ${rendered.wechat.article}
                          <br />
                          <br />
                          <h2>微信公众号</h2>
                          ${rendered.wechat.account}
                        </td>
                      </tr>
                    </table>
                    <!-- // END BODY -->
                  </td>
                </tr>
                <tr>
                  <td align="center" valign="top">
                    <!-- BEGIN FOOTER // -->
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateFooter">
                      <tr>
                        <td valign="top" class="footerContent" style="padding-top:0;" mc:edit="footer_content01">
                          <em>Copyright &copy; *|CURRENT_YEAR|* *|LIST:COMPANY|*, All rights reserved.</em>
                        </td>
                      </tr>
                      <!--
                      <tr>
                        <td valign="top" class="footerContent" mc:edit="footer_content00">
                          <a href="*|TWITTER:PROFILEURL|*">Follow on Twitter</a>&nbsp;&nbsp;&nbsp;<a href="*|FACEBOOK:PROFILEURL|*">Friend on Facebook</a>&nbsp;&nbsp;&nbsp;<a href="*|FORWARD|*">Forward to Friend</a>&nbsp;
                        </td>
                      </tr>
                      <tr>
                        <td valign="top" class="footerContent" style="padding-top:0;" mc:edit="footer_content01">
                          <em>Copyright &copy; *|CURRENT_YEAR|* *|LIST:COMPANY|*, All rights reserved.</em>
                          <br />
                          *|IFNOT:ARCHIVE_PAGE|* *|LIST:DESCRIPTION|*
                          <br />
                          <br />
                          <strong>Our mailing address is:</strong>
                          <br />
                          *|HTML:LIST_ADDRESS_HTML|* *|END:IF|*
                        </td>
                      </tr>
                      <tr>
                        <td valign="top" class="footerContent" style="padding-top:0; padding-bottom:40px;" mc:edit="footer_content02">
                          <a href="*|UNSUB|*">unsubscribe from this list</a>&nbsp;&nbsp;&nbsp;<a href="*|UPDATE_PROFILE|*">update subscription preferences</a>&nbsp;
                        </td>
                      </tr>
                      -->
                    </table>
                    <!-- // END FOOTER -->
                  </td>
                </tr>
              </table>
              <!-- // END TEMPLATE -->
            </td>
          </tr>
        </table>
        </center>
      </body>
    </html>
    `
    await fs.writeFile(`/virtualhost/app/report/${time}.html`, template)
    return template
  } catch (e) {
    console.log(e)
    throw new Error(e)
  }
}

module.exports = Render
