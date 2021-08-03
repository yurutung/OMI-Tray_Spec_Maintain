import { ITrayLsrMrk } from '../types/tray_lsr_mrk'
import { trayLsrMrk } from '../models/tray_lsr_mrk'
import { Op } from 'sequelize'

interface TrayLsrMrkRepo {
    getDatas(cid: string): Promise<Array<ITrayLsrMrk>>
    addData(trayLsrMrkBody: ITrayLsrMrk): Promise<ITrayLsrMrk>
    updateData(trayLsrMrkBody: ITrayLsrMrk): Promise<[number, trayLsrMrk[]] | null>
    deleteData(trayLsrMrkBody: ITrayLsrMrk): Promise<number | null>
}

class TrayLsrMrkRepoImpl implements TrayLsrMrkRepo {
    private constructor() { }

    static of(): TrayLsrMrkRepoImpl {
        return new TrayLsrMrkRepoImpl()
    }

    /**
     * get tray laser mark data by cust code
     * support wilcard search
     * @param cid 
     * @returns 
     */
    async getDatas(cid: string): Promise<Array<ITrayLsrMrk>> {
        return trayLsrMrk.findAll({
            raw: true,
            where: {
                CUST_CD: {
                    [Op.like]: cid.replace(/\*/g, '%')
                }
            }
        })
    }

    /**
     * add a tray laser mark data to database
     * @param trayLsrMrkBody 
     * @returns 
     */
    async addData(trayLsrMrkBody: ITrayLsrMrk): Promise<ITrayLsrMrk> {
        return trayLsrMrk.create(trayLsrMrkBody)
    }

    /**
     * update tray laser mark data by cust code and prospec id
     * @param trayLsrMrkBody 
     * @returns 
     */
    async updateData(trayLsrMrkBody: ITrayLsrMrk): Promise<[number, trayLsrMrk[]] | null> {
        return trayLsrMrk.update(trayLsrMrkBody, {
            where: {
                CUST_CD: trayLsrMrkBody.CUST_CD,
                PRODSPEC_ID: trayLsrMrkBody.PRODSPEC_ID
            }
        })
    }

    /**
     * delete tray laser mark data by cust code and prospec id
     * @param trayLsrMrkBody 
     * @returns 
     */
    async deleteData(trayLsrMrkBody: ITrayLsrMrk): Promise<number | null> {
        return trayLsrMrk.destroy({
            where: {
                CUST_CD: trayLsrMrkBody.CUST_CD,
                PRODSPEC_ID: trayLsrMrkBody.PRODSPEC_ID
            }
        })
    }

    /**
     * insert or update by id
     * @param trayLsrMrkBody 
     * @returns 
     */
    async addOrUpdateDate(trayLsrMrkBody: ITrayLsrMrk): Promise<[trayLsrMrk, boolean | null]> {
        return trayLsrMrk.upsert(trayLsrMrkBody, { returning: true })
    }
}

export { TrayLsrMrkRepoImpl }
