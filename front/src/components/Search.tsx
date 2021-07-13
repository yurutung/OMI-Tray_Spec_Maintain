import React, { useEffect, useState } from 'react'
import { Link, RouteComponentProps, useHistory } from "react-router-dom"
// dev
import { hot } from 'react-hot-loader'

const Search = ({match}: RouteComponentProps<{mode: string}>) => {
    const mode: string = match.params.mode
    const history = useHistory()

    const [formData, setFormData] = useState<{}>()

    const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value
        })
    }

    const getID = (e: React.FormEvent, formData: {id?: string}): void => {
        e.preventDefault()
        history.push(`/datas/${mode}/${formData.id}`)
    }
 
    return (
        <form className="h-100" onSubmit={e => getID(e, formData)}>
            <div className="row h-75 g-0">
                <div className="d-flex align-items-center justify-content-center">
                    <div className="row col-8">
                        <div className="col-3">
                            <label htmlFor="id" className="col-form-label row justify-content-end">{mode=='cust_spec' ? 'Cust. Code' : 'MSL ID'}</label>
                        </div>
                        <div className="col-9">
                            <input onChange={handleForm} type="text" id="id" className="form-control" required />
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-25 g-0 px-5">
                <Link to="/" className="btn btn-outline-secondary">Home</Link>
                <button type="submit" className="btn btn-primary" disabled={formData === undefined ? true : false}>Submit</button>
            </div>
            
        </form>
    )
}

export default hot(module)(Search)