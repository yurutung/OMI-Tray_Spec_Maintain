import { trayMsl } from '../models';
import { ITrayMsl } from '../types/tray_msl'
import { Op } from 'sequelize'

interface TrayMslRepo {
    getDatas(mid: string): Promise<Array<ITrayMsl>>
    addData(trayMslBody: ITrayMsl): Promise<ITrayMsl>
    updateData(trayMslBody: ITrayMsl): Promise<[number, trayMsl[]] | null>
    deleteData(trayMslBody: ITrayMsl): Promise<number | null>
}

class TrayMslRepoImpl implements TrayMslRepo {
    private constructor() { }

    static of(): TrayMslRepoImpl {
        return new TrayMslRepoImpl()
    }

    /**
     * get tray msl data by msl id
     * support wilcard search
     * @param mid 
     * @returns tray msl data array
     */
    async getDatas(mid: string): Promise<Array<ITrayMsl>> {
        return trayMsl.findAll({
            raw: true,
            where: {
                MSL: {
                    [Op.like]: mid.replace(/\*/g, '%')
                }
            }
        })
    }

    /**
     * add a tray msl data to database
     * @param trayMslBody 
     * @returns 
     */
    async addData(trayMslBody: ITrayMsl): Promise<ITrayMsl> {
        return trayMsl.create(trayMslBody)
    }

    /**
     * update tray msl data by msl id
     * @param trayMslBody 
     * @returns 
     */
    async updateData(trayMslBody: ITrayMsl): Promise<[number, trayMsl[]] | null> {
        return trayMsl.update(trayMslBody, {
            where: {
                MSL: trayMslBody.MSL
            }
        })
    }

    /**
     * delete tray msl data by msl id
     * @param trayMslBody 
     * @returns 
     */
    async deleteData(trayMslBody: ITrayMsl): Promise<number | null> {
        return trayMsl.destroy({
            where: {
                MSL: trayMslBody.MSL
            }
        })
    }

}

export { TrayMslRepoImpl }
