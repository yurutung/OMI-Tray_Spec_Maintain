import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import FastifyStatic from 'fastify-static'
import { Server, IncomingMessage, ServerResponse } from 'http'
import path from 'path'
import { establishConnection } from './plugins/mariadb'
import { TraySpecRouter } from './routes/tray_spec'

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
    logger: { prettyPrint: true }
})

const startFastify: (port: number) => FastifyInstance<Server, IncomingMessage, ServerResponse> = (port) => {
    server.listen(port, (err, _) => {
        if (err) {
            console.error(err)
            process.exit(0)
        }
        establishConnection()
    })

    // frontend connect to backend
    // server.register(FastifyStatic, {
    //     root: path.join(__dirname, '../../frontend/build'),
    //     prefix: '/'
    // })

    server.get('/ping', async (request: FastifyRequest, reply: FastifyReply) => {
        return reply.status(200).send({ msg: 'pong' })
    })

    // TodoRouter(routes/todo.ts) add prefix /api
    server.register(TraySpecRouter, { prefix: '/api/tray_spec' })

    return server
}

export { startFastify }
