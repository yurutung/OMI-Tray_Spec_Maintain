import { FastifyInstance, RouteShorthandOptions, FastifyReply } from 'fastify'
import { ITraySpec } from '../types/tray_spec'
import { TraySpecRepoImpl } from './../repo/tray_spec-repo'

const TraySpecRouter = (server: FastifyInstance, opts: RouteShorthandOptions, done: (error?: Error) => void) => {

    const traySpecRepo = TraySpecRepoImpl.of()

    // TODO: Add CRUD endpoints, i.e. get, post, update, delete
    // NOTE: the url should be RESTful
    
    // get
    server.get<{ Params: {cid: string} }>('/:cid', opts, async (request, reply) => {
        try {
            const cid = request.params.cid
            const traySpecs: Array<ITraySpec> = await traySpecRepo.getDatas(cid)
            return reply.status(200).send({traySpecs})
        } catch (error) {
            console.error(`\GET /todos Error: ${error}`)
            return reply.status(500).send(`[Server Error]: ${error}`)
        }
    })

    // // post -> add
    // server.post('/todos', opts, async (request, reply) => {
    //     try {
    //         const todoBody: ITodo = request.body as ITodo
    //         const todo: ITodo = await todoRepo.addTodo(todoBody)
    //         return reply.status(201).send({todo}) //add successfully
    //     } catch (error) {
    //         console.error(`\POST /todos Error: ${error}`)
    //         return reply.status(500).send(`[Server Error]: ${error}`)
    //     }
    // })

    // // put -> update
    // // <{ Params: IdParam }> -> typescript set Params type
    // server.put<{ Params: IdParam }>('/todos/:id', opts, async (request, reply) => {
    //     try {
    //         const id = request.params.id
    //         const todoBody = request.body as ITodo
    //         const todo: ITodo | null = await todoRepo.updateTodo(id, todoBody)
    //         if (todo) {
    //             return reply.status(200).send({ todo })
    //         } else {
    //             return reply.status(404).send({ msg: `Not Found Todo: ${id}` })
    //         }
    //     } catch (error) {
    //         console.error(`PUT /todos/${request.params.id} Error: ${error}`)
    //         return reply.status(500).send(`[Server Error]: ${error}`)
    //     }
    // })
    
    // // delete
    // server.delete<{ Params: IdParam }>('/todos/:id', opts, async (request, reply) => {
    //     try {
    //         const id = request.params.id
    //         const todo: ITodo | null = await todoRepo.deleteTodo(id)
    //         if (todo) {
    //             return reply.status(204).send() //204 delete successfully
    //         } else {
    //             return reply.status(404).send({ msg: `Not Found Todo: ${id}` })
    //         }
    //     } catch (error) {
    //         console.error(`DELETE /todos/${request.params.id} Error: ${error}`)
    //         return reply.status(500).send(`[Server Error]: ${error}`)
    //     }
    // })

    done()
}

export { TraySpecRouter }
