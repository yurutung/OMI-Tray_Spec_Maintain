import { useEffect, useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { getSites } from '../API'

const HeaderBar = ({ handleToggleSidebar, handleSite }: any) => {
    const [siteOptions, setSiteOptions] = useState<Array<string>>([])
    useEffect(() => {
        if (!siteOptions.length)
            getSites()
                .then(e => {
                    setSiteOptions(e)
                    handleSite(e[0])
                })
                .catch(err => console.log(err))
    }, [siteOptions])

    return (
        <>
            <div className="title-bar">AP System</div>
            <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
                <FaBars />
            </div>
            <select className="form-select" onChange={e => handleSite(e.target.value)}>
                {siteOptions.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
        </>
    )
}

export default HeaderBar