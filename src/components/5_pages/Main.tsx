// React
import React from 'react'
import ReactDOM from 'react-dom/client'

// Redux
import { Provider } from 'react-redux'
import store from '@/redux/store'

// Components
import App from './App'

// Styles
import '@pages/Main.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
