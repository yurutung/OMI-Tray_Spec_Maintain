import React from 'react';
import './App.css';

import { MemoryRouter, Route, Redirect } from "react-router-dom"
import Home from './components/Home'
import Search from './components/Search'
import Datas from './components/Datas'
import AddTraySpec from './components/AddTraySpec'
import AddTrayMsl from './components/AddTrayMsl'

const App = () => {

  return (
    <>
      <MemoryRouter>
        <Route path="/" exact component={Home} />
        <Route path="/search/:mode" component={Search} />
        <Route path="/datas/:mode/:id" component={Datas} />
        <Route path="/add/tray_spec/:id" component={AddTraySpec} />
        <Route path="/add/tray_msl/:id" component={AddTrayMsl} />
        <Route render={() => <Redirect to="/" />} />
      </MemoryRouter>
    </>
  )
}

export default App