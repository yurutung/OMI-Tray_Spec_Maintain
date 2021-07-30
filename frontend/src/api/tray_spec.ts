import axios, { AxiosResponse } from 'axios'

/**
 * get tray spec data api
 * get /api/tray_spec/:id
 * @param id cust code
 * @returns tray spec object array
 */
const getTraySpecs = async (id: string): Promise<AxiosResponse<Array<ITraySpec>>> => {
    try {
        const traySpecs = await axios.get(`/api/tray_spec/${id}`)
        return traySpecs
    } catch (error) {
        console.error(`GET /api/tray_spec ERROR: ${error}`)
        throw new Error(error)
    }
}

/**
 * add tray spec data
 * post /api/tray_spec
 * @param traySpecBody
 * @returns 
 */
const addTraySpec = async (traySpecBody: ITraySpec): Promise<AxiosResponse<ITraySpec>> => {
    try {
        const traySpec = await axios.post('/api/tray_spec', traySpecBody)
        return traySpec
    } catch (error) {
        console.error(`POST /api/tray_spec ERROR: ${error}`)
        throw new Error(error)
    }
}

/**
 * update tray spec data
 * put /api/tray_spec
 * @param traySpecBody update data
 * @returns 
 */
const updateTraySpec = async (traySpecBody: ITraySpec): Promise<AxiosResponse<ITraySpec>> => {
    try {
        const traySpec = await axios.put(`/api/tray_spec`, traySpecBody)
        return traySpec
    } catch (error) {
        console.error(`PUT /api/tray_spec ERROR: ${error}`)
        throw new Error(error)
    }
}

/**
 * delete tray spec data
 * delete /api/tray_spec
 * @param traySpecBody delete data
 * @returns 
 */
const deleteTraySpec = async (traySpecBody: ITraySpec): Promise<AxiosResponse> => {
    try {
        const res = await axios.delete(`/api/tray_spec`, {data: traySpecBody})
        return res
    } catch (error) {
        console.error(`DELETE /api/tray_spec ERROR: ${error}`)
        throw new Error(error)
    }
}

/**
 * upload multiple tray spec data
 * @param traySpecs tray spec object array
 * @returns 
 */
const uploadTraySpec = async (traySpecs: ITraySpec[]): Promise<AxiosResponse> => {
    try {
        const res = await axios.post(`/api/tray_spec/upload_data`, traySpecs)
        return res
    } catch (error) {
        console.error(`UPLOAD /api/tray_spec/upload_data ERROR: ${error}`)
        throw new Error(error)
    }
}

export { getTraySpecs, addTraySpec, updateTraySpec, deleteTraySpec, uploadTraySpec }