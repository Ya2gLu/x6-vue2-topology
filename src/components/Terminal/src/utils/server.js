/*
 * @Author       : ya2glu@163.com
 * @Date         : 2023-06-06 17:32:24
 * @LastEditTime : 2023-06-06 17:41:29
 * @LastEditors  : ya2glu
 * @Description  : 模拟服务器终端
 * @FilePath     : /x6-vue2-topology/src/components/Terminal/src/utils/server.js
 */
var express = require('express')
var expressWs = require('express-ws')
var os = require('os')
var pty = require('node-pty')

const USE_BINARY = os.platform() !== 'win32'

function startServer() {
  var app = express()
  expressWs(app)

  var terminals = {},
    unsentOutput = {},
    temporaryDisposable = {}
  
  app.use('')
}

module.exports = startServer
