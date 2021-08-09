import React from 'react';
import './App.css';

import { MemoryRouter, Route, Redirect } from "react-router-dom"
import Home from './components/Home'
import Search from './components/Search'
import Datas from './components/Datas'
import AddTraySpec from './components/AddTraySpec'
import AddTrayMsl from './components/AddTrayMsl'
import UploadPreview from './components/UploadPreview'

const App = () => {

  return (
    <>
      <div id="title_bar" className="title-bar"> Title </div>
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