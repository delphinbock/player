// React
import { lazy, Suspense } from 'react'

// Components
const Player = lazy(() => import('@templates/Player'))

const App = () => {
  return (
    <div id="root">
      <Suspense fallback={<div>Loading...</div>}>
        <Player />
      </Suspense>
    </div>
  )
}

export default App
