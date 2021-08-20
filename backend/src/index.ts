import { startFastify } from './server'
import * as dotEnv from 'dotenv'

dotEnv.config()
const port = Number(process.env.FASTIFY_PORT) || 8888
// Start your server
const server = startFastify(port)

export { server }
