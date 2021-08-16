import React, { ChangeEvent } from 'react'
import './asset/css/App.css'
import './i18n'

import { MemoryRouter, Route, Redirect } from "react-router-dom"
import { useTranslation } from 'react-i18next'
import Home from './components/Home'
import Search from './components/Search'
import Datas from './components/Datas'
import AddTraySpec from './components/AddTraySpec'
import AddTrayMsl from './components/AddTrayMsl'
import UploadPreview from './components/UploadPreview'

const App = () => {
  const { i18n } = useTranslation()
  const seti18n = (e: ChangeEvent<HTMLSelectElement>) => {
    const l = e.target.value
    if (l) i18n.changeLanguage(l)
  }

  return (
    <>
      <div className="title-bar">
        <div id="title_bar" >Title</div>
        {/* set language */}
        <div className="lan-select">
          <select className="form-select" defaultValue={i18n.language} onChange={e => seti18n(e)}>
            <option value="zh-TW">繁體中文</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
      <MemoryRouter>
        <Route path="/" exact component={Home} />
        <Route path="/search/:mode" component={Search} />
        <Route path="/datas/:mode/:id" component={Datas} />
        <Route path="/add/tray_spec/:id" component={AddTraySpec} />
        <Route path="/add/tray_msl/:id" component={AddTrayMsl} />
        <Route path="/upload_preview/:mode" component={UploadPreview} />
        <Route render={() => <Redirect to="/" />} />
      </MemoryRouter>
    </>
  )
}

export default App