import axios, { AxiosResponse } from 'axios'

const getTraySpecDatas = async (cid: string): Promise<AxiosResponse<Array<ITraySpec>>> => {
    // TODO: Should call GET endpoint
    try {
        const traySpecs = await axios.get(`/api/tray_spec/${cid}`)
        return traySpecs
    } catch (error) {
        console.error(`GET ${process.env.API_URL}/api/tray_spec/${cid} ERROR: ${error}`)
        throw new Error(error)
    }
}

// // TODO: Should call POST endpoint
// const addData = async (todoBody: ITodo): Promise<AxiosResponse<ITodo>> => {
//     try {
//         const newTodo = {
//             ...todoBody,
//             status: false
//         }
//         const todo = await axios.post('/api/todos', newTodo)
//         return todo
//     } catch (error) {
//         console.error(`POST /api/todos ERROR: ${error}`)
//         throw new Error(error)
//     }
// }


// const updateData = async (todoBody: ITodo): Promise<AxiosResponse<ITodo>> => {
//     // TODO: Should call PUT endpoint
//     try {
//         const newTodo = {
//             ...todoBody,
//             status: true
//         }
//         const todo = await axios.put(`/api/todos/${todoBody._id}`, newTodo)
//         return todo
//     } catch (error) {
//         console.error(`PUT /api/todos/${todoBody._id} ERROR: ${error}`)
//         throw new Error(error)
//     }
// }

// const deleteData = async (id: string): Promise<AxiosResponse> => {
//     // TODO: Should call DELETE endpoint
//     try {
//         const res = await axios.delete(`/api/todos/${id}`)
//         return res
//     } catch (error) {
//         console.error(`DELETE /api/todos/${id} ERROR: ${error}`)
//         throw new Error(error)
//     }
// }

// export { getDatas, addData, updateData, deleteData }
export { getTraySpecDatas }
