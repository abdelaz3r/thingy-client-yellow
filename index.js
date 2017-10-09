const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({
    host: '0.0.0.0',
    port: 8080
});


server.route({
    method: 'GET',
    path:'/hello',
    handler: function (request, reply) {
        return reply('hello world');
    }
});


server.start((err) => {
    if (err) throw err;
    console.log('Server running at: ', server.info.uri);
});
