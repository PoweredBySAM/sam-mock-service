#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2))
var xtend = require('xtend')
var createServer = require('../').createServer

var config = require('rc')('sam-mock-service', {
  port: 3001,
  users: []
})

var opts = xtend(config, argv)

createServer(opts).listen(opts.port, function (er) {
  if (er) throw er
  console.log('SAM Labs mock service started at :' + opts.port)
})
