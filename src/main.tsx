import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { DataStore } from './contexts/DataStore.tsx'
import { MapStore } from './contexts/MapStore.tsx'
import { AppStore2 } from './contexts/AppStore2.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppStore2>
      <DataStore>
        <MapStore>
          <App />
        </MapStore>
      </DataStore>
      </AppStore2>
  </React.StrictMode>,
)
