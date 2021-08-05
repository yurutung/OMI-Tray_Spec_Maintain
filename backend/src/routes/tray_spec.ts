import { FastifyInstance, RouteShorthandOptions, FastifyReply } from 'fastify'
import { traySpec } from '../models'
import { ITraySpec } from '../types/tray_spec'
import { TraySpecRepoImpl } from './../repo/tray_spec-repo'

const TraySpecRouter = (server: FastifyInstance, opts: RouteShorthandOptions, done: (error?: Error) => void) => {

    const traySpecRepo = TraySpecRepoImpl.of()

    /**
     * get data by cust code
     */
    server.get<{ Params: { cid: string } }>('/:cid', opts, async (request, reply) => {
        const cid = request.params.cid
        try {
            const traySpecs: Array<ITraySpec> = await traySpecRepo.getDatas(cid)
            return reply.status(200).send({ traySpecs })
        } catch (error) {
            console.error(`\GET /tray_spec/${cid} Error: ${error}`)
            return reply.status(500).send(`[Server Error]: ${error}`)
        }
    })

    /**
     * add data to database
     */
    server.post('/', opts, async (request, reply) => {
        try {
            const traySpecBody: ITraySpec = request.body as ITraySpec
            const traySpec: ITraySpec = await traySpecRepo.addData(traySpecBody)
            return reply.status(201).send({ traySpec: traySpec }) //add successfully
        } catch (error) {
            console.error(`\POST /tray_spec Error: ${error}`)
            return reply.status(500).send(`[Server Error]: ${error}`)
        }
    })

    /**
     * update data
     */
    server.put('/', opts, async (request, reply) => {
        try {
            const traySpecBody = request.body as ITraySpec
            const traySpec: [number, ITraySpec[]] | null = await traySpecRepo.updateData(traySpecBody)
            return reply.status(200).send({ traySpec })
        } catch (error) {
            console.error(`PUT /tray_spec Error: ${error}`)
            return reply.status(500).send(`[Server Error]: ${error}`)
        }
    })

    /**
     * delete data
     */
    server.delete('/', opts, async (request, reply) => {
        try {
            const traySpecBody = request.body as ITraySpec
            const traySpec: number | null = await traySpecRepo.deleteData(traySpecBody)
            if (traySpec) {
                return reply.status(204).send({ traySpec }) //204 delete successfully
            } else {
                return reply.status(404).send({ msg: `Not Found Tray Spec: ${traySpecBody.CUST_CD} & ${traySpecBody.PRODSPEC_ID}` })
            }
        } catch (error) {
            console.error(`DELETE /tray_spec Error: ${error}`)
            return reply.status(500).send(`[Server Error]: ${error}`)
        }
    })

    /**
     * upload data
     */
    server.post('/upload_data', opts, async (request, reply) => {
        const traySpecs: ITraySpec[] = request.body as ITraySpec[]
        console.log(traySpecs)
        let errMsg = []
        for (const ts of traySpecs) {
            try {
                const res = await traySpecRepo.addOrUpdateDate(ts)
            } catch (error) {
                errMsg.push({ data: ts, err: error })
            }
        }
        if (!errMsg.length) {
            return reply.status(201).send({ msg: `Upload successfully ${traySpecs.length} items.` })
        } else {
            return reply.status(500).send({ msg: `Upload fail ${errMsg.length} items.`, errData: errMsg })
        }
    })

    done()
}

export { TraySpecRouter }
