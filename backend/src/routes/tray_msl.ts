import { FastifyInstance, RouteShorthandOptions, FastifyReply } from 'fastify'
import { ITrayMsl } from '../types/tray_msl'
import { TrayMslRepoImpl } from '../repo/tray_msl-repo'

const TrayMslRouter = (server: FastifyInstance, opts: RouteShorthandOptions, done: (error?: Error) => void) => {

    const trayMslRepo = TrayMslRepoImpl.of()

    /**
     * get data by msl id
     */
    server.get<{ Params: { mid: string } }>('/:mid', opts, async (request, reply) => {
        const mid = request.params.mid
        try {
            const trayMsls: Array<ITrayMsl> = await trayMslRepo.getDatas(mid)
            return reply.status(200).send({ trayMsls: trayMsls })
        } catch (error) {
            console.error(`\GET /tray_msl/${mid} Error: ${error}`)
            return reply.status(500).send(`[Server Error]: ${error}`)
        }
    })

    /**
     * add data to database
     */
    server.post('/', opts, async (request, reply) => {
        try {
            const trayMslBody: ITrayMsl = request.body as ITrayMsl
            const trayMsl: ITrayMsl = await trayMslRepo.addData(trayMslBody)
            return reply.status(201).send({ trayMsl: trayMsl }) //add successfully
        } catch (error) {
            console.error(`\POST /tray_msl Error: ${error}`)
            return reply.status(500).send(`[Server Error]: ${error}`)
        }
    })

    /**
     * update data
     */
    server.put('/', opts, async (request, reply) => {
        try {
            const trayMslBody = request.body as ITrayMsl
            const trayMsl: [number, ITrayMsl[]] | null = await trayMslRepo.updateData(trayMslBody)
            // return reply.status(200).send({ trayMsl })
            if (trayMsl && trayMsl[0]) {
                return reply.status(200).send({ trayMsl })
            } else {
                return reply.status(404).send({ msg: `Not Found Tray Msl: ${trayMslBody.MSL}` })
            }
        } catch (error) {
            console.error(`PUT /tray_msl Error: ${error}`)
            return reply.status(500).send(`[Server Error]: ${error}`)
        }
    })

    /**
     * delete data
     */
    server.delete('/', opts, async (request, reply) => {
        try {
            const trayMslBody = request.body as ITrayMsl
            const trayMsl: number | null = await trayMslRepo.deleteData(trayMslBody)
            if (trayMsl) {
                return reply.status(204).send() //204 delete successfully
            } else {
                return reply.status(404).send({ msg: `Not Found or Nothing Change Tray Msl: ${trayMslBody.MSL}` })
            }
        } catch (error) {
            console.error(`DELETE /tray_msl Error: ${error}`)
            return reply.status(500).send(`[Server Error]: ${error}`)
        }
    })

    /**
     * upload data
     */
    server.post('/upload_data', opts, async (request, reply) => {
        const trayMsls: ITrayMsl[] = request.body as ITrayMsl[]
        let errMsg = []
        for (const tm of trayMsls) {
            try {
                const res = await trayMslRepo.addOrUpdateDate(tm)
            } catch (error) {
                errMsg.push({ data: tm, err: error })
            }
        }
        if (!errMsg.length) {
            return reply.status(201).send({ msg: `Upload successfully ${trayMsls.length} items.` })
        } else {
            return reply.status(500).send({ msg: `Upload fail ${errMsg.length} items.`, errData: errMsg })
        }
    })

    done()
}

export { TrayMslRouter }
