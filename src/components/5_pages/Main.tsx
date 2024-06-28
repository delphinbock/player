// React
import React from 'react'
import ReactDOM from 'react-dom/client'

// Components
import App from './App'

// Styles
import '@pages/Main.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
