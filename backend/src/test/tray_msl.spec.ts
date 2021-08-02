import { FastifyInstance } from 'fastify'
import { startFastify } from '../server'
import { Server, IncomingMessage, ServerResponse } from 'http'
import * as E from 'fp-ts/Either'
import { establishConnection } from '../plugins/mariadb'
import { ITrayMsl } from '../types/tray_msl'

describe('Tray Msl test', () => {
    let server: FastifyInstance<Server, IncomingMessage, ServerResponse>
    const r = (Math.random() + 1).toString(36).substring(9)
    const newTrayMsl = {
        MSL: `T${r}`
    }

    beforeAll(async () => {
        await establishConnection()
        server = startFastify(8888)
    })

    afterAll(async () => {
        E.match(
            (e) => console.log(e),
            (_) => console.log('Closing Fastify server is done!')
        )(
            E.tryCatch(
                () => {
                    server.close((): void => { })
                },
                (reason) => new Error(`Failed to close a Fastify server, reason: ${reason}`)
            )
        )
    })

    // test server
    it('test server', async () => {
        const response = await server.inject({ method: 'GET', url: '/ping' })
        expect(response.statusCode).toBe(200)
        console.log(`test server ${response.body}`)
    })

    // get pass
    it('should successfully get a list of Tray Msl', async () => {
        const response = await server.inject({ method: 'GET', url: '/api/tray_msl/*' })
        expect(response.statusCode).toBe(200)
        console.log(`get tray msl ${response.body}`)
    })

    // post pass
    it('should successfully post a Tray Msl data, and can be found', async () => {
        const response = await server.inject({ method: 'POST', url: '/api/tray_msl', payload: newTrayMsl })
        expect(response.statusCode).toBe(201)
        console.log(`post tray msl ${response.body}`)
        // get add item
        const res = await server.inject({ method: 'GET', url: `/api/tray_msl/${newTrayMsl.MSL}` })
        expect(res.statusCode).toBe(200)
        const res_data: { trayMsls: Array<ITrayMsl> } = JSON.parse(res.body)
        console.log(`get add tray msl ${res.body}`)
        expect(res_data.trayMsls.length).toBe(1)
        expect(res_data.trayMsls[0].MSL).toBe(newTrayMsl.MSL)
    })
    // post fail
    it('should failed post a Tray Msl data', async () => {
        const response = await server.inject({ method: 'POST', url: '/api/tray_msl', payload: {} })
        expect(response.statusCode).toBe(500)
        console.log(`post tray msl ${response.body}`)
    })

    // put pass
    it('should successfully update a Tray Msl Data by cust code and prod id', async () => {
        const updateTraySpec = Object.assign({ FLOOR_LIFE: 'test' }, newTrayMsl)
        const response = await server.inject({ method: 'PUT', url: '/api/tray_msl', payload: updateTraySpec })
        expect(response.statusCode).toBe(200)
        console.log(`put tray msl ${response.body}`)
        // get update item
        const res = await server.inject({ method: 'GET', url: `/api/tray_msl/${updateTraySpec.MSL}` })
        expect(res.statusCode).toBe(200)
        const res_data: { trayMsls: Array<ITrayMsl> } = JSON.parse(res.body)
        console.log(`get update tray msl ${res.body}`)
        expect(res_data.trayMsls.length).toBe(1)
        expect(res_data.trayMsls[0].MSL).toBe(updateTraySpec.MSL)
        expect(res_data.trayMsls[0].FLOOR_LIFE).toBe(updateTraySpec.FLOOR_LIFE)
    })
    // put fail
    it('should failed put a Tray Msl data', async () => {
        const response = await server.inject({ method: 'PUT', url: '/api/tray_msl', payload: {} })
        expect(response.statusCode).toBe(404)
        console.log(`put tray msl ${response.body}`)
    })

    // delete pass
    it('should successfully delete tray msl by cust code and prod id', async () => {
        const response = await server.inject({ method: 'DELETE', url: '/api/tray_msl', payload: newTrayMsl })
        expect(response.statusCode).toBe(204)
        console.log(`del tray msl ${response.body}`)
    })

    // delete fail 404
    it('should failed delete a Tray Msl data, and throw not found data error', async () => {
        const response = await server.inject({ method: 'DELETE', url: '/api/tray_msl', payload: { MSL: '' } })
        expect(response.statusCode).toBe(404)
        console.log(`delete tray msl ${response.body}`)
    })
    // delete fail 500
    it('should failed delete a Tray Msl data, and throw server error', async () => {
        const response = await server.inject({ method: 'DELETE', url: '/api/tray_msl', payload: {} })
        expect(response.statusCode).toBe(500)
        console.log(`delete tray msl ${response.body}`)
    })
})