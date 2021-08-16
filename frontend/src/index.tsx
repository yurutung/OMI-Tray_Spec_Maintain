import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'

// css
import './asset/css/bootstrap.css'
import './asset/css/index.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
