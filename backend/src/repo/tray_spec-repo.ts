import { ITraySpec } from './../types/tray_spec'
import { traySpec } from '../models/tray_spec'
import { Op } from 'sequelize'

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

    /**
     * get tray spec data by cust code
     * support wilcard search
     * @param cid 
     * @returns 
     */
    async getDatas(cid: string): Promise<Array<ITraySpec>> {
        return traySpec.findAll({
            raw: true,
            where: {
                CUST_CD: {
                    [Op.like]: cid.replace(/\*/g, '%')
                }
            }
        })
    }

    /**
     * add a tray spec data to database
     * @param traySpecBody 
     * @returns 
     */
    async addData(traySpecBody: ITraySpec): Promise<ITraySpec> {
        return traySpec.create(traySpecBody)
    }

    /**
     * update tray spec data by cust code and prospec id
     * @param traySpecBody 
     * @returns 
     */
    async updateData(traySpecBody: ITraySpec): Promise<[number, traySpec[]] | null> {
        return traySpec.update(traySpecBody, {
            where: {
                CUST_CD: traySpecBody.CUST_CD,
                PRODSPEC_ID: traySpecBody.PRODSPEC_ID
            }
        })
    }

    /**
     * delete tray spec data by cust code and prospec id
     * @param traySpecBody 
     * @returns 
     */
    async deleteData(traySpecBody: ITraySpec): Promise<number | null> {
        return traySpec.destroy({
            where: {
                CUST_CD: traySpecBody.CUST_CD,
                PRODSPEC_ID: traySpecBody.PRODSPEC_ID
            }
        })
    }
}

export { TraySpecRepoImpl }
