var Hapi = require('hapi');
var Path = require('path');

var server = new Hapi.Server();

server.connection({ port: 3000 });

server.register([
  {
    register: require('good'),
    options: {
        reporters: [{
        reporter: require('good-console'),
            events: { log: '*', response: '*', error: '*' }
        }]
    }
  }
  ],
  function (err) {

      if (err) throw err;

      server.route({
        path: '/{path*}', method: 'GET', handler: {
          directory: {
            path: Path.join(process.cwd(), 'dist'), listing: true, index: true
          }
        }
      });

      server.start(function (err) {
        if (err) throw err;
        console.log('Server started at: ' + server.info.uri);
      });
  });
