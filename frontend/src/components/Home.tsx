import { Link } from "react-router-dom"
import ReactShortcut from 'react-shortcut'
import { clickById, setTitleBar } from '../functions'

const Home = () => {
    // set title
    setTitleBar('Tray Spec. Maintaince')
    return (
        <>
            <div className="row main-body">
                <div className="col-12 d-flex align-items-center justify-content-center">
                    <div className="row">
                        {/* TODO: define tray_spec, tray_msl */}
                        <Link to={`/search/tray_spec`} id='tray_spec' className="btn btn-outline-info">F1 Customer Spec.</Link>
                        <Link to={`/search/tray_msl`} id='tray_msl' className="mt-1 btn btn-outline-info">F2 MSL</Link>
                    </div>
                </div>
            </div>
            <div className="footer-bar">
                <button className="btn-list col-12 col-md-2">離開</button>
            </div>
            {/* shortcut setting */}
            <ReactShortcut
                keys={'f1'}
                onKeysPressed={() => { clickById('tray_spec') }}
            />
            <ReactShortcut
                keys={'f2'}
                onKeysPressed={() => { clickById('tray_msl') }}
            />
        </>
    )
}

export default Home