import React, { useEffect, useState, useRef } from 'react'

// component
import HeaderBar from './components/HeaderBar'
import SideBar from './components/SideBar'
import MainPage from './components/MainPage'
import { getFunctionList } from './API'

// css
import './assets/css/App.css'

const App = () => {
  // TODO: login, add cookie
  const [toggled, setToggled] = useState(false)
  const handleToggleSidebar = (value: boolean) => {
    setToggled(value)
  }
  const sidebarRef = useRef<any>()
  const [site, setSite] = useState('')
  const handleSite = (value: string) => {
    setSite(value)
  }
  useEffect(() => {
    getFunctionList(site)
      .then(l => {
        sidebarRef.current.refHandleMenuHtml(l as IMenu[])
        mainRef.current.refHandleSearchItem(l as IMenu[])
      })
      .catch(err => console.log(err))
  }, [site])
  const mainRef = useRef<any>()
  const handleOpenUrl = (url: string) => {
    mainRef.current.refHandleIframeUrl(url)
  }

  return (
    <>
      <HeaderBar handleToggleSidebar={handleToggleSidebar} handleSite={handleSite} />
      <SideBar toggled={toggled} handleToggleSidebar={handleToggleSidebar} handleOpenUrl={handleOpenUrl} ref={sidebarRef} />
      <MainPage ref={mainRef} />
    </>
  )
}

export default App
