const fastify = require('fastify')({
  logger: true
})

fastify.register(require('@fastify/cors'), (instance) => {
    return (req, callback) => {
        const corsOptions = {
            // This is NOT recommended for production as it enables reflection exploits
            origin: true
        };

        // do not include CORS headers for requests from localhost
        if (/^localhost$/m.test(req.headers.origin)) {
            corsOptions.origin = false
        }

        // callback expects two parameters: error and options
        callback(null, corsOptions)
    }
})

// Declare a route
fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
})
const users = []

fastify.post('/user/create', function (request, reply){
    console.log(request.body)
    reply.send({message:'ok'})
})
// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})