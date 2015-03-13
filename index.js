var http = require('http')
var crypto = require('crypto')
var concat = require('concat-stream')

var handlers = {
  '/api/login': loginHandler
}

exports.createServer = function (opts) {
  opts = opts || {}
  opts.users = opts.users || []

  return http.createServer(function (req, res) {
    if (!handlers[req.url]) {
      res.statusCode = 404
      res.end()
    }

    res.setHeader('Content-Type', 'application/json')

    req.pipe(concat(function (data) {

      try {
        req.body = JSON.parse(data)
      } catch (er) {
        res.statusCode = 400
        return res.end()
      }

      handlers[req.url](opts, req, res)
    }))
  })
}

function loginHandler (opts, req, res) {
  var user = findUser(req.body.username, req.body.password, opts.users)

  if (!user) {
    res.statusCode = 401
    res.end()
  }

  var hash = crypto.createHash('sha256').update(crypto.randomBytes(256)).digest('base64')

  res.write(JSON.stringify({
    user: user,
    authHeader: 'Basic ' + hash
  }))
  res.end()
}

function findUser (username, password, users) {
  for (var i = 0; i < users.length; i++) {
    if (users[i].username == username && users[i].password == password) {
      return users[i]
    }
  }
}