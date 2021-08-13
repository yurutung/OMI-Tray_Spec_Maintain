import { FastifyInstance, RouteShorthandOptions, FastifyReply } from 'fastify'
import { ITrayLsrMrk } from '../types/tray_lsr_mrk'
import { TrayLsrMrkRepoImpl } from '../repo/tray_lsr_mrk-repo'

const TrayLsrMrkRouter = (server: FastifyInstance, opts: RouteShorthandOptions, done: (error?: Error) => void) => {

    const trayLsrMrkRepo = TrayLsrMrkRepoImpl.of()

    /**
     * get data by cust code and prod id
     */
    server.get<{ Params: { cid: string, pid: string } }>('/:cid/:pid', opts, async (request, reply) => {
        const cid = request.params.cid
        const pid = request.params.pid
        try {
            const trayLsrMrk: ITrayLsrMrk | null = await trayLsrMrkRepo.getDatas(cid, pid)
            return reply.status(200).send({ trayLsrMrk })
        } catch (error) {
            console.error(`\GET /tray_lsr_mrk/${cid}/${pid} Error: ${error}`)
            return reply.status(500).send(`[Server Error]: ${error}`)
        }
    })

    /**
     * add data to database
     */
    server.post('/', opts, async (request, reply) => {
        try {
            const trayLsrMrkBody: ITrayLsrMrk = request.body as ITrayLsrMrk
            const trayLsrMrk: ITrayLsrMrk = await trayLsrMrkRepo.addData(trayLsrMrkBody)
            return reply.status(201).send({ trayLsrMrk: trayLsrMrk }) //add successfully
        } catch (error) {
            console.error(`\POST /tray_lsr_mrk Error: ${error}`)
            return reply.status(500).send(`[Server Error]: ${error}`)
        }
    })

    /**
     * update data
     */
    server.put('/', opts, async (request, reply) => {
        try {
            const trayLsrMrkBody = request.body as ITrayLsrMrk
            const trayLsrMrk: [number, ITrayLsrMrk[]] | null = await trayLsrMrkRepo.updateData(trayLsrMrkBody)
            return reply.status(200).send({ trayLsrMrk })
        } catch (error) {
            console.error(`PUT /tray_lsr_mrk Error: ${error}`)
            return reply.status(500).send(`[Server Error]: ${error}`)
        }
    })

    /**
     * delete data
     */
    server.delete('/', opts, async (request, reply) => {
        try {
            const trayLsrMrkBody = request.body as ITrayLsrMrk
            const trayLsrMrk: number | null = await trayLsrMrkRepo.deleteData(trayLsrMrkBody)
            if (trayLsrMrk) {
                return reply.status(204).send({ trayLsrMrk }) //204 delete successfully
            } else {
                return reply.status(404).send({ msg: `Not Found Tray Laser Mark: ${trayLsrMrkBody.CUST_CD} & ${trayLsrMrkBody.PRODSPEC_ID}` })
            }
        } catch (error) {
            console.error(`DELETE /tray_lsr_mrk Error: ${error}`)
            return reply.status(500).send(`[Server Error]: ${error}`)
        }
    })

    /**
     * upsert data
     */
    server.post('/upsert', opts, async (request, reply) => {
        try {
            const trayLsrMrk: ITrayLsrMrk = request.body as ITrayLsrMrk
            const res = await trayLsrMrkRepo.addOrUpdateDate(trayLsrMrk)
            if (res) {
                return reply.status(204).send({ res }) //204 delete successfully
            } else {
                return reply.status(404).send({ msg: `Not Found Tray Laser Mark: ${trayLsrMrk.CUST_CD} & ${trayLsrMrk.PRODSPEC_ID}` })
            }
        } catch (error) {
            console.error(`DELETE /tray_lsr_mrk Error: ${error}`)
            return reply.status(500).send(`[Server Error]: ${error}`)
        }
    })

    /**
     * get CoWoS part array
     */
    server.get('/getCoWoSPart', opts, async (request, reply) => {
        try {
            return reply.status(200).send({ CoWoSParts: ['CoWoS1', 'CoWoS2', 'CoWoS3'] })
        } catch (error) {
            console.error(`\GET /tray_lsr_mrk/getCoWoSPart Error: ${error}`)
            return reply.status(500).send(`[Server Error]: ${error}`)
        }
    })

    done()
}

export { TrayLsrMrkRouter }
