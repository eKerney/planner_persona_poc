import './App.css'
import ArcGISmap from './components/ArcGISmap'
import RootLayout from './components/Layout'
import ToolPanel from './components/ToolPanel'

function App() {
  return (
    <>
      <RootLayout ArcMap={<ArcGISmap children={''} />} ToolPanel={<ToolPanel />}  />

    </>
  )
}
export default App
