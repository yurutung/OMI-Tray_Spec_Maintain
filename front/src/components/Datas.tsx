import React, { useEffect, useState } from 'react'
import { Link, RouteComponentProps, useHistory } from "react-router-dom"

import { getTraySpecDatas } from '../API/tray_spec'

// dev
import { hot } from 'react-hot-loader'

const Datas = ({match}: RouteComponentProps<{mode: string, id: string}>) => {
    console.log(match.params)

    const mode = match.params.mode
    const id = match.params.id

    const fetchTodos = (): void => {
        getTraySpecDatas(id)
          .then(({ data: { datas } }: ITraySpec[] | any) => console.log(datas))
          .catch((err: Error) => console.error(err))
    }

    fetchTodos()

    return (
        <div>
            <Link to="/" className="btn btn-outline-secondary">Home</Link>
        </div>
    )
}

export default hot(module)(Datas)