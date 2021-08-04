import axios, { AxiosResponse } from 'axios'

/**
 * get tray laser mark data api
 * get /api/tray_lsr_mrk/:cid/:pid
 * @param cid CUST_CD
 * @param pid PRODSPEC_ID
 * @returns 
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


const upsertTrayLsrMrk  = async (trayLsrMrkBody: ITrayLsrMrk): Promise<AxiosResponse<ITrayLsrMrk>> => {
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
 * @param traySpecBody delete data
 * @returns 
 */
const deleteTraySpec = async (traySpecBody: ITraySpec): Promise<AxiosResponse> => {
    try {
        const res = await axios.delete(`/api/tray_lsr_mrk`, {data: traySpecBody})
        return res
    } catch (error) {
        console.error(`DELETE /api/tray_lsr_mrk ERROR: ${error}`)
        throw error
    }
}


// export { getTrayLsrMrkById, addTrayLsrMrk, updateTraySpec, deleteTraySpec, uploadTraySpec }
export { getTrayLsrMrkById, upsertTrayLsrMrk }