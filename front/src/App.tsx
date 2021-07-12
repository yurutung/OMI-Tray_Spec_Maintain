import { HashRouter, Route} from "react-router-dom"
import Home from './components/Home' 
import Search from './components/Search' 
import './App.css'
// dev
import { hot } from 'react-hot-loader'

const App = () => {
    return (
        <HashRouter>
            <Route path="/" exact component={ Home } />
            <Route path="/search/:mode" component={ Search } />
        </HashRouter>
    )
}

// export default App
export default hot(module)(App)