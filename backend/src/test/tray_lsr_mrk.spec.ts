import { FastifyInstance } from 'fastify'
import { startFastify } from '../server'
import { Server, IncomingMessage, ServerResponse } from 'http'
import * as E from 'fp-ts/Either'
import { establishConnection } from '../plugins/mariadb'
import { ITrayLsrMrk } from '../types/tray_lsr_mrk'

describe('Tray Laser Mark test', () => {
    let server: FastifyInstance<Server, IncomingMessage, ServerResponse>
    const r = (Math.random() + 1).toString(36).substring(9)
    const newTrayLsr = {
        CUST_CD: `UT_TEST_${r}`,
        PRODSPEC_ID: `UT_TEST_${r}`,
        MARK_LOGO: `UT_TEST_${r}`
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

    // getCoWoSPart pass
    it('should successfully get CoWoS part', async () => {
        const response = await server.inject({ method: 'GET', url: '/api/tray_lsr_mrk/getCoWoSPart' })
        expect(response.statusCode).toBe(200)
        console.log(`get CoWoS part ${response.body}`)
    })

    // post pass
    it('should successfully post a Tray Laser Mark data, and can be found', async () => {
        const response = await server.inject({ method: 'POST', url: '/api/tray_lsr_mrk', payload: newTrayLsr })
        expect(response.statusCode).toBe(201)
        console.log(`post tray msl ${response.body}`)
        // get add item
        const res = await server.inject({ method: 'GET', url: `/api/tray_lsr_mrk/${newTrayLsr.CUST_CD}/${newTrayLsr.PRODSPEC_ID}` })
        expect(res.statusCode).toBe(200)
        const res_data: { trayLsrMrk: ITrayLsrMrk } = JSON.parse(res.body)
        console.log(`get add tray laser mark ${res.body}`)
        expect(res_data.trayLsrMrk.CUST_CD).toBe(newTrayLsr.CUST_CD)
        expect(res_data.trayLsrMrk.PRODSPEC_ID).toBe(newTrayLsr.PRODSPEC_ID)
    })
    // post fail
    it('should failed post a Tray Msl data', async () => {
        const response = await server.inject({ method: 'POST', url: '/api/tray_lsr_mrk', payload: {} })
        expect(response.statusCode).toBe(500)
        console.log(`post tray laser mark ${response.body}`)
    })

    // get pass
    it('should successfully get a list of Tray Spec laser mark', async () => {
        const res = await server.inject({ method: 'GET', url: `/api/tray_lsr_mrk/${newTrayLsr.CUST_CD}/${newTrayLsr.PRODSPEC_ID}` })
        expect(res.statusCode).toBe(200)
        const res_data: { trayLsrMrk: ITrayLsrMrk } = JSON.parse(res.body)
        console.log(`get tray laser mark ${res.body}`)
        expect(res_data.trayLsrMrk.CUST_CD).toBe(newTrayLsr.CUST_CD)
        expect(res_data.trayLsrMrk.PRODSPEC_ID).toBe(newTrayLsr.PRODSPEC_ID)
        expect(res_data.trayLsrMrk.MARK_LOGO).toBe(newTrayLsr.MARK_LOGO)
    })
    
    // put pass
    it('should successfully update a Tray Spec laser mark Data by cust code and prod id', async () => {
        const updateTrayLsr = Object.assign({ MARK_TEXT2: 'upup' }, newTrayLsr)
        const response = await server.inject({ method: 'PUT', url: '/api/tray_lsr_mrk', payload: updateTrayLsr })
        expect(response.statusCode).toBe(200)
        console.log(`put tray spec ${response.body}`)
        // get update item
        const res = await server.inject({ method: 'GET', url: `/api/tray_lsr_mrk/${updateTrayLsr.CUST_CD}/${updateTrayLsr.PRODSPEC_ID}` })
        expect(res.statusCode).toBe(200)
        const res_data: { trayLsrMrk: ITrayLsrMrk } = JSON.parse(res.body)
        console.log(`get tray spec laser mark ${res.body}`)
        expect(res_data.trayLsrMrk.CUST_CD).toBe(updateTrayLsr.CUST_CD)
        expect(res_data.trayLsrMrk.PRODSPEC_ID).toBe(updateTrayLsr.PRODSPEC_ID)
        expect(res_data.trayLsrMrk.MARK_TEXT2).toBe(updateTrayLsr.MARK_TEXT2)
    })
    // put fail 404
    it('should failed put a Tray Spec laser mark data', async () => {
        const updateTrayLsr = { CUST_CD: '', PRODSPEC_ID: '' }
        const response = await server.inject({ method: 'PUT', url: '/api/tray_lsr_mrk', payload: updateTrayLsr })
        expect(response.statusCode).toBe(404)
        console.log(`put tray spec laser mark ${response.body}`)
    })
    // put fail 500
    it('should failed put a Tray Spec laser mark data', async () => {
        const response = await server.inject({ method: 'PUT', url: '/api/tray_lsr_mrk', payload: {} })
        expect(response.statusCode).toBe(500)
        console.log(`put tray spec laser mark ${response.body}`)
    })

    // upsert pass
    it('should successfully update tray laser mark by cust code and prod id', async () => {
        const updateTrayLsr = Object.assign({ MARK_LOGO: 'update', MARK_TEXT1: 'update' }, newTrayLsr)
        const response = await server.inject({ method: 'POST', url: '/api/tray_lsr_mrk/upsert', payload: updateTrayLsr })
        expect(response.statusCode).toBe(200)
        console.log(`post upsert tray laser mark ${response.body}`)
        // get update item
        const res = await server.inject({ method: 'GET', url: `/api/tray_lsr_mrk/${updateTrayLsr.CUST_CD}/${updateTrayLsr.PRODSPEC_ID}` })
        expect(res.statusCode).toBe(200)
        const res_data: { trayLsrMrk: ITrayLsrMrk } = JSON.parse(res.body)
        console.log(`get update tray spec ${res.body}`)
        expect(res_data.trayLsrMrk.CUST_CD).toBe(updateTrayLsr.CUST_CD)
        expect(res_data.trayLsrMrk.PRODSPEC_ID).toBe(updateTrayLsr.PRODSPEC_ID)
        expect(res_data.trayLsrMrk.MARK_LOGO).toBe(updateTrayLsr.MARK_LOGO)
        expect(res_data.trayLsrMrk.MARK_TEXT1).toBe(updateTrayLsr.MARK_TEXT1)
    })
    // upsert fail
    it('should fail update tray laser mark ', async () => {
        const response = await server.inject({ method: 'POST', url: '/api/tray_lsr_mrk/upsert', payload: {} })
        expect(response.statusCode).toBe(500)
        console.log(`post upsert tray laser mark ${response.body}`)
    })
    
    // delete pass
    it('should successfully delete tray spec laser mark by cust code and prod id', async () => {
        const up_data = { CUST_CD: `up_${r}`, PRODSPEC_ID: `up_${r}` } as ITrayLsrMrk
        const response = await server.inject({ method: 'POST', url: '/api/tray_lsr_mrk/upsert', payload: up_data })
        expect(response.statusCode).toBe(200)
        // del
        const res = await server.inject({ method: 'DELETE', url: '/api/tray_lsr_mrk', payload: up_data })
        expect(res.statusCode).toBe(204)
        console.log(`delete tray spec ${response.body}`)
    })
    // delete fail 404
    it('should failed delete a Tray Spec laser mark data, and throw not found data error', async () => {
        const response = await server.inject({ method: 'DELETE', url: '/api/tray_lsr_mrk', payload: { CUST_CD: '', PRODSPEC_ID: '' } })
        expect(response.statusCode).toBe(404)
        console.log(`delete tray spec ${response.body}`)
    })
    // delete fail 500
    it('should failed delete a Tray Spec laser mark data, and throw server error', async () => {
        const response = await server.inject({ method: 'DELETE', url: '/api/tray_lsr_mrk', payload: {} })
        expect(response.statusCode).toBe(500)
        console.log(`delete tray spec ${response.body}`)
    })

    // find and delete pass
    it('should successfully delete tray laser mark by cust code and prod id', async () => {
        const response = await server.inject({ method: 'DELETE', url: '/api/tray_lsr_mrk/find_delete', payload: newTrayLsr })
        expect(response.statusCode).toBe(204)
        console.log(`del tray laser mark ${response.body}`)
    })
    // find and delete pass
    it('should failed delete tray laser mark by cust code and prod id', async () => {
        const response = await server.inject({ method: 'DELETE', url: '/api/tray_lsr_mrk/find_delete', payload: {} })
        expect(response.statusCode).toBe(500)
        console.log(`del tray laser mark ${response.body}`)
    })
})