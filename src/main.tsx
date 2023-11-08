import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AppStore } from './contexts/AppStore.tsx'
import { DataStore } from './contexts/DataStore.tsx'
import { MapStore } from './contexts/MapStore.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppStore>
      <DataStore>
        <MapStore>
          <App />
        </MapStore>
      </DataStore>
    </AppStore>
  </React.StrictMode>,
)
