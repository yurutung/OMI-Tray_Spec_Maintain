import { BrowserRouter as Router, Route, Switch, Link} from "react-router-dom"
import { Button, Container, Row, Col } from 'react-bootstrap'
import Search from './Search' 
// dev
import { hot } from 'react-hot-loader'

const Home = () => {

    return (
        <Container className="h-100">
            <Row className="h-75">
                <Col className="d-flex align-items-center justify-content-center">
                    <Row>
                        <Link to="/search/cust_spec" className="btn btn-outline-info">Customer Spec.</Link>
                        <Link to="/search/msl" className="mt-1 btn btn-outline-info">MSL</Link>
                    </Row>
                </Col>
            </Row>
            <Row className="h-25">
                <Col className="col-4">
                    <Button variant="outline-info">Back</Button>
                </Col>
            </Row>
        </Container>   
    )
}

export default hot(module)(Home)