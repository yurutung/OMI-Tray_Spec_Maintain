import { FaBars } from 'react-icons/fa'
// imgs
// import tsmc from '../assets/imgs/color-logo_word_red20.png'

const HeaderBar = ({ handleToggleSidebar, handleSite }: any) => {

    return (
        <>
            <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
                <FaBars />
            </div>
            <select className="form-select" onChange={e => handleSite(e.target.value)}>
                <option value='BP01'>BP01</option>
                <option value='BP2B'>BP2B</option>
            </select>
        </>
    )
}

export default HeaderBar