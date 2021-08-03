import { FastifyInstance, RouteShorthandOptions, FastifyReply } from 'fastify'
import { trayLsrMrk } from '../models'
import { ITrayLsrMrk } from '../types/tray_lsr_mrk'
import { TrayLsrMrkRepoImpl } from '../repo/tray_lsr_mrk-repo'

const TrayLsrMrkRouter = (server: FastifyInstance, opts: RouteShorthandOptions, done: (error?: Error) => void) => {

    const trayLsrMrkRepo = TrayLsrMrkRepoImpl.of()

    /**
     * get data by cust code
     */
    server.get<{ Params: { cid: string } }>('/:cid', opts, async (request, reply) => {
        const cid = request.params.cid
        try {
            const trayLsrMrks: Array<ITrayLsrMrk> = await trayLsrMrkRepo.getDatas(cid)
            return reply.status(200).send({ trayLsrMrks })
        } catch (error) {
            console.error(`\GET /tray_lsr_mrk/${cid} Error: ${error}`)
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
            if (trayLsrMrk && trayLsrMrk[0]) {
                return reply.status(200).send({ trayLsrMrk })
            } else {
                return reply.status(404).send({ msg: `Not Found Tray Spec: ${trayLsrMrkBody.CUST_CD} & ${trayLsrMrkBody.PRODSPEC_ID}` })
            }
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
                return reply.status(404).send({ msg: `Not Found Tray Spec: ${trayLsrMrkBody.CUST_CD} & ${trayLsrMrkBody.PRODSPEC_ID}` })
            }
        } catch (error) {
            console.error(`DELETE /tray_lsr_mrk Error: ${error}`)
            return reply.status(500).send(`[Server Error]: ${error}`)
        }
    })

    /**
     * upload data
     */
    server.post('/upload_data', opts, async (request, reply) => {
        const trayLsrMrks: ITrayLsrMrk[] = request.body as ITrayLsrMrk[]
        console.log(trayLsrMrks)
        let errMsg = []
        for (const ts of trayLsrMrks) {
            try {
                const res = await trayLsrMrkRepo.addOrUpdateDate(ts)
            } catch (error) {
                errMsg.push({data: ts, err: error})
            }
        }
        if (!errMsg.length) {
            return reply.status(201).send({ msg: `Upload successfully ${trayLsrMrks.length} items.` })
        } else {
            return reply.status(500).send({ msg: `Upload fail ${errMsg.length} items.`, errData: errMsg})
        }
    })

    done()
}

export { TrayLsrMrkRouter }
