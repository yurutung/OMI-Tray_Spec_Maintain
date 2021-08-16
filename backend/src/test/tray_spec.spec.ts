import { FastifyInstance } from 'fastify'
import { startFastify } from '../server'
import { Server, IncomingMessage, ServerResponse } from 'http'
import * as E from 'fp-ts/Either'
import { establishConnection } from '../plugins/mariadb'
import { ITraySpec } from '../types/tray_spec'

describe('Tray Spec test', () => {
    let server: FastifyInstance<Server, IncomingMessage, ServerResponse>
    const r = (Math.random() + 1).toString(36).substring(7)
    const newTraySpec = {
        CUST_CD: `UT_TEST_${r}`,
        PRODSPEC_ID: `UT_TEST_${r}`
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
    it('should successfully get a list of Tray Spec', async () => {
        const response = await server.inject({ method: 'GET', url: '/api/tray_spec/*' })
        expect(response.statusCode).toBe(200)
        console.log(`get tray spec ${response.body}`)
    })
    // get fail
    it('should failed get a list of Tray Spec', async () => {
        const response = await server.inject({ method: 'GET', url: '/api/tray_spec' })
        expect(response.statusCode).toBe(404)
        console.log(`get tray spec ${response.body}`)
    })

    // post pass
    it('should successfully post a Tray Spec data, and can be found', async () => {
        const response = await server.inject({ method: 'POST', url: '/api/tray_spec', payload: newTraySpec })
        expect(response.statusCode).toBe(201)
        console.log(`post tray spec ${response.body}`)
        // get add item
        const res = await server.inject({ method: 'GET', url: `/api/tray_spec/${newTraySpec.CUST_CD}` })
        expect(res.statusCode).toBe(200)
        const res_data: { traySpecs: Array<ITraySpec> } = JSON.parse(res.body)
        console.log(`get add tray spec ${res.body}`)
        expect(res_data.traySpecs.length).toBe(1)
        expect(res_data.traySpecs[0].CUST_CD).toBe(newTraySpec.CUST_CD)
        expect(res_data.traySpecs[0].PRODSPEC_ID).toBe(newTraySpec.PRODSPEC_ID)
    })
    // post fail
    it('should failed post a Tray Spec data', async () => {
        const response = await server.inject({ method: 'POST', url: '/api/tray_spec', payload: {} })
        expect(response.statusCode).toBe(500)
        console.log(`post tray spec ${response.body}`)
    })

    // put pass
    it('should successfully update a Tray Spec Data by cust code and prod id', async () => {
        const updateTraySpec = Object.assign({ CUST_PART_ID: 'test', PIN_A1_LOC: 'test' }, newTraySpec)
        const response = await server.inject({ method: 'PUT', url: '/api/tray_spec', payload: updateTraySpec })
        expect(response.statusCode).toBe(200)
        console.log(`put tray spec ${response.body}`)
        // get update item
        const res = await server.inject({ method: 'GET', url: `/api/tray_spec/${updateTraySpec.CUST_CD}` })
        expect(res.statusCode).toBe(200)
        const res_data: { traySpecs: Array<ITraySpec> } = JSON.parse(res.body)
        console.log(`get update tray spec ${res.body}`)
        expect(res_data.traySpecs.length).toBe(1)
        expect(res_data.traySpecs[0].CUST_CD).toBe(updateTraySpec.CUST_CD)
        expect(res_data.traySpecs[0].PRODSPEC_ID).toBe(updateTraySpec.PRODSPEC_ID)
        expect(res_data.traySpecs[0].CUST_PART_ID).toBe(updateTraySpec.CUST_PART_ID)
        expect(res_data.traySpecs[0].PIN_A1_LOC).toBe(updateTraySpec.PIN_A1_LOC)
    })
    // put fail 404
    it('should failed put a Tray Spec data', async () => {
        const updateTraySpec = { CUST_CD: '', PRODSPEC_ID: '' }
        const response = await server.inject({ method: 'PUT', url: '/api/tray_spec', payload: updateTraySpec })
        expect(response.statusCode).toBe(404)
        console.log(`put tray spec ${response.body}`)
    })
    // put fail 500
    it('should failed put a Tray Spec data', async () => {
        const response = await server.inject({ method: 'PUT', url: '/api/tray_spec', payload: {} })
        expect(response.statusCode).toBe(500)
        console.log(`put tray spec ${response.body}`)
    })
    
    // delete pass
    it('should successfully delete tray spec by cust code and prod id', async () => {
        const response = await server.inject({ method: 'DELETE', url: '/api/tray_spec', payload: newTraySpec })
        expect(response.statusCode).toBe(204)
        console.log(`delete tray spec ${response.body}`)
    })
    // delete fail 404
    it('should failed delete a Tray Spec data, and throw not found data error', async () => {
        const response = await server.inject({ method: 'DELETE', url: '/api/tray_spec', payload: { CUST_CD: '', PRODSPEC_ID: '' } })
        expect(response.statusCode).toBe(404)
        console.log(`delete tray spec ${response.body}`)
    })
    // delete fail 500
    it('should failed delete a Tray Spec data, and throw server error', async () => {
        const response = await server.inject({ method: 'DELETE', url: '/api/tray_spec', payload: {} })
        expect(response.statusCode).toBe(500)
        console.log(`delete tray spec ${response.body}`)
    })

    // upload pass
    it('should successfully upload tray spec', async () => {
        const upload = Array<ITraySpec>()
        const up_data = { CUST_CD: `up_${r}`, PRODSPEC_ID: `up_${r}` } as ITraySpec
        upload.push(Object.assign({}, up_data) as ITraySpec)
        upload.push(Object.assign({ CUST_PART_ID: 'up', PIN_A1_LOC: 'up' }, up_data) as ITraySpec)
        const response = await server.inject({ method: 'POST', url: '/api/tray_spec/upload_data', payload: upload })
        expect(response.statusCode).toBe(201)
        // should del upload success
        const res = await server.inject({ method: 'DELETE', url: '/api/tray_spec', payload: up_data })
        expect(res.statusCode).toBe(204)
    })
    // upload fail
    it('should fail upload tray spec', async () => {
        const upload = Array<ITraySpec>()
        upload.push({} as ITraySpec)
        const response = await server.inject({ method: 'POST', url: '/api/tray_spec/upload_data', payload: upload })
        expect(response.statusCode).toBe(500)
    })

})