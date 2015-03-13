# sam-mock-service
A mock SAM labs service for development/testing

## Example

```js
var createServer = require('sam-mock-service').createServer

var opts = {
  port: 3001,
  // Users that can login to the system
  users: [
    {
      _id: '1'
      username: 'joebloggs',
      email: 'joe@example.org',
      password: 'letmein'
    }
  ]
}

createServer(opts).listen(opts.port, function (er) {
  if (er) throw er
  console.log('SAM Labs mock service started at :' + opts.port)
})
```

### CLI

If you `npm link` in the cloned project you can run the mock service from the CLI.

```sh
cd /path/to/sam-mock-service
npm link
sam-mock-service --port 3001
```

The service uses [rc](https://www.npmjs.com/package/rc) so you can configure it by placing an `.sam-mock-servicerc` file somewhere sensible. This is just a JSON file which should can contain config as per the example above.

