import axios, { AxiosResponse } from 'axios'

/**
 * get CoWoS Part array
 * get /api/tray_lsr_mrk/getCoWoSPart
 * @returns CoWoS Part array
 */
const getCoWoSPart = async () => {
    try {
        const CoWoSParts = await axios.get(`/api/tray_lsr_mrk/getCoWoSPart`)
        return CoWoSParts
    } catch (error) {
        console.error(`GET /api/tray_lsr_mrk/getCoWoSPart ERROR: ${error}`)
        throw error
    }
}

/**
 * get tray laser mark data api
 * get /api/tray_lsr_mrk/:cid/:pid
 * @param cid CUST_CD
 * @param pid PRODSPEC_ID
 * @returns laser mark
 */
const getTrayLsrMrkById = async (cid: string, pid: string): Promise<AxiosResponse<ITrayLsrMrk>> => {
    try {
        const trayLsrMrk = await axios.get(`/api/tray_lsr_mrk/${cid}/${pid}`)
        return trayLsrMrk
    } catch (error) {
        console.error(`GET /api/tray_lsr_mrk/${cid}/${pid} ERROR: ${error}`)
        throw error
    }
}

/**
 * inser or update laser mark
 * post /api/tray_lsr_mrk/upsert
 * @param trayLsrMrkBody 
 * @returns laser mark
 */
const upsertTrayLsrMrk = async (trayLsrMrkBody: ITrayLsrMrk): Promise<AxiosResponse<ITrayLsrMrk>> => {
    try {
        const trayLsrMrk = await axios.post(`/api/tray_lsr_mrk/upsert`, trayLsrMrkBody)
        return trayLsrMrk
    } catch (error) {
        console.error(`POST /api/tray_lsr_mrk/upsert ERROR: ${error}`)
        throw error
    }
}

/**
 * delete tray spec data
 * delete /api/tray_lsr_mrk
 * @param trayLsrMrkBody delete data
 * @returns 
 */
const deleteTrayLsrMrk = async (trayLsrMrkBody: ITrayLsrMrk): Promise<AxiosResponse> => {
    try {
        const res = await axios.delete(`/api/tray_lsr_mrk/find_delete`, { data: trayLsrMrkBody })
        return res
    } catch (error) {
        console.error(`DELETE /api/tray_lsr_mrk ERROR: ${error}`)
        throw error
    }
}

export { getCoWoSPart, getTrayLsrMrkById, upsertTrayLsrMrk, deleteTrayLsrMrk }