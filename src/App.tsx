import './App.css'
import ArcGISmap from './components/ArcGISmap'
import RootLayout from './components/Layout'
import MapLayer from './components/MapLayer'
import ToolPanel from './components/ToolPanel'

function App() {
  return (
    <>
      <RootLayout 
        ArcMap={
          <ArcGISmap> 
            <MapLayer />
          </ArcGISmap>} 
        ToolPanel={<ToolPanel />}  
      />
    </>
  )
}
export default App
