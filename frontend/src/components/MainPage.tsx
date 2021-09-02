import { forwardRef, useImperativeHandle, useEffect, useState } from "react";
import { FaSearch } from 'react-icons/fa'

const MainPage = forwardRef(({ }: any, ref) => {
    const [iframeUrl, setIframeUrl] = useState('')
    const [allItem, setAllItem] = useState<Array<IMenu>>([])
    const [showSearch, setShowSearch] = useState(true)
    const [searchData, setSearchData] = useState<Array<IMenu>>([])
    useImperativeHandle(
        ref,
        () => ({
            refHandleIframeUrl(url: string) {
                handleIframeUrl(url)
            },
            refHandleSearchItem(menu: []) {
                handleSearchItem(menu)
            }
        })
    )
    const handleIframeUrl = (url: string) => {
        if (url) {
            setIframeUrl(url)
            setShowSearch(false)
        } else {
            setShowSearch(true)
        }

    }
    const handleSearchItem = (menu: []) => {
        const temp: IMenu[] = []
        for (let i = 0; i < menu.length; i++)
            getLeaf(menu[i], temp)
        setAllItem(temp)
    }
    const getLeaf = (m: IMenu, temp: IMenu[]) => {
        if (m.leaf) {
            temp.push(m)
        } else {
            const childrenObj = m.children || []
            for (let i = 0; i < childrenObj.length; i++)
                getLeaf(childrenObj[i], temp)
        }
    }
    const getSearch = (value: string) => {
        const searchFilter = value ? allItem.filter(m => m.text.toLowerCase().includes(value.toLowerCase())) : []
        setSearchData(searchFilter)
    }

    return (
        <>
            <iframe className="main-page" src={iframeUrl} hidden={showSearch}>{iframeUrl}</iframe>
            <div className="main-page" hidden={!showSearch}>
                <div className="search-bar">
                    <div className="wrapper">
                        <div className="search-inform">
                            <FaSearch className="search-icon" />
                            <input type="search" placeholder="Search..." onChange={e => getSearch(e.target.value)} />
                        </div>
                        {searchData.length > 0 && <div className="search-result">
                            <div className="line" />
                            <ul>
                                {searchData.map((d) => <li key={d.id}>
                                    <div className="ellipsis" title={d.text} onClick={() => { handleIframeUrl(d.url) }}>
                                        {d.text}
                                    </div>
                                </li>
                                )}
                            </ul>
                        </div>}
                    </div>
                </div>
            </div>
        </>
    )
})

export default MainPage