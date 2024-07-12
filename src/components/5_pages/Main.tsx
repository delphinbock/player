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

// Root element
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

// Alias Vite => import.meta.env.MODE === 'development' - Vite detect automatically the environment
if (import.meta.env.DEV) {
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  )
} else {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  )
}
