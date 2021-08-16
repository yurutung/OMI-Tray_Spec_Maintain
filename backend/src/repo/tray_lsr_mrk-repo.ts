import { ITrayLsrMrk } from '../types/tray_lsr_mrk'
import { trayLsrMrk } from '../models/tray_lsr_mrk'

interface TrayLsrMrkRepo {
    getDatas(cid: string, pid: string): Promise<trayLsrMrk | null>
    addData(trayLsrMrkBody: ITrayLsrMrk): Promise<ITrayLsrMrk>
    updateData(trayLsrMrkBody: ITrayLsrMrk): Promise<ITrayLsrMrk | null>
    deleteData(trayLsrMrkBody: ITrayLsrMrk): Promise<number | null>
}

class TrayLsrMrkRepoImpl implements TrayLsrMrkRepo {
    private constructor() { }

    static of(): TrayLsrMrkRepoImpl {
        return new TrayLsrMrkRepoImpl()
    }

    /**
     * get tray laser mark data by cust code and prod id
     * @param cid cust code
     * @param pid prodspec id
     * @returns 
     */
    async getDatas(cid: string, pid: string): Promise<trayLsrMrk | null> {
        return trayLsrMrk.findOne({
            raw: true,
            where: {
                CUST_CD: cid,
                PRODSPEC_ID: pid
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
    async updateData(trayLsrMrkBody: ITrayLsrMrk): Promise<ITrayLsrMrk | null> {
        const e = await trayLsrMrk.findOne({
            where: {
                CUST_CD: trayLsrMrkBody.CUST_CD,
                PRODSPEC_ID: trayLsrMrkBody.PRODSPEC_ID
            }
        })
        if (e) {
            return e.update(trayLsrMrkBody, {
                where: {
                    CUST_CD: trayLsrMrkBody.CUST_CD,
                    PRODSPEC_ID: trayLsrMrkBody.PRODSPEC_ID
                }
            })
        }
        return null
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
     * 
     * @param trayLsrMrkBody 
     */
    async findAndDeleteData(trayLsrMrkBody: ITrayLsrMrk): Promise<void> {
        const e = await trayLsrMrk.findOne({
            where: {
                CUST_CD: trayLsrMrkBody.CUST_CD,
                PRODSPEC_ID: trayLsrMrkBody.PRODSPEC_ID
            }
        })
        if (e) {
            return e.destroy()
        }
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
