import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import FastifyStatic from 'fastify-static'
import { Server, IncomingMessage, ServerResponse } from 'http'
import path from 'path'
// database connection
import { DBConnection } from './plugins/mariadb'
// router
import { TraySpecRouter } from './routes/tray_spec'
import { TrayMslRouter } from './routes/tray_msl'
import { TrayLsrMrkRouter } from './routes/tray_lsr_mrk'

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
    logger: { prettyPrint: true }
})

const startFastify: (port: number) => FastifyInstance<Server, IncomingMessage, ServerResponse> = (port) => {
    server.listen(port, (err, _) => {
        if (err) {
            console.error(err)
            process.exit(0)
        }
        // if not unit test, connect to DB
        if (!process.env.JEST_WORKER_ID) {
            DBConnection.establishConnection()
        }
    })

    // frontend connect to backend
    server.register(FastifyStatic, {
        root: path.join(__dirname, '../../frontend/build'),
        prefix: '/'
    })

    server.get('/ping', async (request: FastifyRequest, reply: FastifyReply) => {
        return reply.status(200).send({ msg: 'pong' })
    })

    // add prefix /api
    server.register(TraySpecRouter, { prefix: '/api/tray_spec' })
    server.register(TrayMslRouter, { prefix: '/api/tray_msl' })
    server.register(TrayLsrMrkRouter, { prefix: '/api/tray_lsr_mrk' })

    return server
}

export { startFastify }
