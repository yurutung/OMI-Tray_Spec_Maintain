import { ITraySpec } from './../types/tray_spec'
import { traySpec } from '../models/tray_spec'

interface TraySpecRepo {
    getDatas(cid: string): Promise<Array<ITraySpec>>
    addData(traySpecBody: ITraySpec): Promise<ITraySpec>
    updateData(traySpecBody: ITraySpec): Promise<[number, traySpec[]] | null>
    deleteData(traySpecBody: ITraySpec): Promise<number | null>
}

class TraySpecRepoImpl implements TraySpecRepo {
    private constructor() { }

    static of(): TraySpecRepoImpl {
        return new TraySpecRepoImpl()
    }

    async getDatas(cid: string): Promise<Array<ITraySpec>> {
        // TODO: Should get Todo from mongoDB
        return traySpec.findAll({
            where: {
                custId: cid
            }
        })
    }

    // TODO: Should add Todo into mongoDB
    async addData(traySpecBody: ITraySpec): Promise<ITraySpec> {
        return traySpec.create(traySpecBody)
    }

    async updateData(traySpecBody: ITraySpec): Promise<[number, traySpec[]] | null> {
        // TODO: Should update Todo to mongoDB
        // new: bool - true to return the modified document rather than the original. defaults to false
        return traySpec.update(traySpecBody, {
            where: {
                custId: traySpecBody.custId,
                prodspecId: traySpecBody.prodspecId
            }
        })
    }

    async deleteData(traySpecBody: ITraySpec): Promise<number | null> {
        // TODO: Should delete Todo from mongoDB
        return traySpec.destroy({
            where: {
                custId: traySpecBody.custId,
                prodspecId: traySpecBody.prodspecId
            }
        })
    }

}

export { TraySpecRepoImpl }
