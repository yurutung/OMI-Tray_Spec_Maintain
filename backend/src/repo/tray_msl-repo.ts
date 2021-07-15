// import { ITrayMsl } from '../types/tray_msl'
// import { trayMsl } from '../models/tray_msl'

// interface TraySpecRepo {
//     getTodos(id: string): Promise<Array<ITrayMsl>>
//     addTodo(traySpecBody: ITrayMsl): Promise<ITrayMsl>
//     updateTodo(traySpecBody: ITrayMsl): Promise<[number, ITrayMsl[]] | null>
//     deleteTodo(traySpecBody: ITrayMsl): Promise<number | null>
// }

// class TraySpecRepoImpl implements TraySpecRepo {
//     private constructor() { }

//     static of(): TraySpecRepoImpl {
//         return new TraySpecRepoImpl()
//     }

//     async getTodos(id: string): Promise<Array<ITraySpec>> {
//         // TODO: Should get Todo from mongoDB
//         return traySpec.findAll({
//             where: {
//                 custId: id
//             }
//         })
//     }

//     // TODO: Should add Todo into mongoDB
//     async addTodo(traySpecBody: ITraySpec): Promise<ITraySpec> {
//         return traySpec.create(traySpecBody)
//     }

//     async updateTodo(traySpecBody: ITraySpec): Promise<[number, traySpec[]] | null> {
//         // TODO: Should update Todo to mongoDB
//         // new: bool - true to return the modified document rather than the original. defaults to false
//         return traySpec.update(traySpecBody, {
//             where: {
//                 custId: traySpecBody.custId,
//                 prodspecId: traySpecBody.prodspecId
//             }
//         })
//     }

//     async deleteTodo(traySpecBody: ITraySpec): Promise<number | null> {
//         // TODO: Should delete Todo from mongoDB
//         return traySpec.destroy({
//             where: {
//                 custId: traySpecBody.custId,
//                 prodspecId: traySpecBody.prodspecId
//             }
//         })
//     }

// }

// export { TraySpecRepoImpl }
