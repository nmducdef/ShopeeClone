import useRouteElements from './hooks/useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const RouteElements = useRouteElements()
  return (
    <div>
      {RouteElements}
      <ToastContainer />
    </div>
  )
}

export default App
