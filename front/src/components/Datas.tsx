import React, { useEffect, useState } from 'react'
import { Link, RouteComponentProps, useHistory } from "react-router-dom"
// dev
import { hot } from 'react-hot-loader'

const Datas = ({match}: RouteComponentProps<{mode: string, id: string}>) => {
    console.log(match.params)
 
    return (
        <div>
            <Link to="/" className="btn btn-outline-secondary">Home</Link>
        </div>
    )
}

export default hot(module)(Datas)