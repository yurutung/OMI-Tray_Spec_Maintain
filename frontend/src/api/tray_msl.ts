import axios, { AxiosResponse } from 'axios'

/**
 * get tray msl data api
 * get /api/tray_msl/:id
 * @param id msl
 * @returns tray msl object array
 */
const getTrayMsls = async (id: string): Promise<AxiosResponse<Array<ITrayMsl>>> => {
    try {
        const trayMsls = await axios.get(`/api/tray_msl/${id}`)
        return trayMsls
    } catch (error) {
        console.error(`GET /api/tray_msl ERROR: ${error}`)
        throw new Error(error)
    }
}

/**
 * add tray msl data
 * post /api/tray_msl
 * @param trayMslBody 
 * @returns 
 */
const addTrayMsl = async (trayMslBody: ITrayMsl): Promise<AxiosResponse<ITrayMsl>> => {
    try {
        const trayMsl = await axios.post('/api/tray_msl', trayMslBody)
        return trayMsl
    } catch (error) {
        console.error(`POST /api/tray_msl ERROR: ${error}`)
        throw new Error(error)
    }
}

/**
 * update tray msl data
 * put /api/tray_msl
 * @param trayMslBody update data
 * @returns 
 */
const updateTrayMsl = async (trayMslBody: ITrayMsl): Promise<AxiosResponse<ITrayMsl>> => {
    try {
        const TrayMsl = await axios.put(`/api/tray_msl`, trayMslBody)
        return TrayMsl
    } catch (error) {
        console.error(`PUT /api/tray_msl ERROR: ${error}`)
        throw new Error(error)
    }
}

/**
 * delete tray msl data
 * delete /api/tray_msl
 * @param trayMslBody 
 * @returns 
 */
const deleteTrayMsl = async (trayMslBody: ITrayMsl): Promise<AxiosResponse> => {
    try {
        const res = await axios.delete(`/api/tray_msl`, {data: trayMslBody})
        return res
    } catch (error) {
        console.error(`DELETE /api/tray_msl ERROR: ${error}`)
        throw new Error(error)
    }
}

/**
 * upload multiple tray msl data
 * @param trayMsls tray msl object array
 * @returns 
 */
const uploadTrayMsl = async (trayMsls: ITrayMsl[]): Promise<AxiosResponse> => {
    try {
        const res = await axios.post(`/api/tray_msl/upload_data`, trayMsls)
        return res
    } catch (error) {
        console.error(`UPLOAD /api/tray_msl/upload_data ERROR: ${error}`)
        throw new Error(error)
    }
}

export { getTrayMsls, addTrayMsl, updateTrayMsl, deleteTrayMsl, uploadTrayMsl }