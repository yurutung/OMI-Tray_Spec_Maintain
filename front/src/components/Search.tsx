import React, { useEffect, useState } from 'react'
import { Link, RouteComponentProps} from "react-router-dom"
import { Button, Container, Row, Col } from 'react-bootstrap'
// dev
import { hot } from 'react-hot-loader'

const Search = ({match}: RouteComponentProps<{mode: string}>) => {
    const mode: string = match.params.mode
    console.log(mode)
 
    return (
        <Container className="h-100">
            
            <div>
                test {mode=='cust_spec' ? '111' : '222'} !!!
            </div>

            <Link to="/" className="btn btn-outline-info">Home</Link>
        </Container>
    )
}

export default hot(module)(Search)