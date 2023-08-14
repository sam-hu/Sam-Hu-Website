import ReactDOM from 'react-dom/client'
import Home from './Home.tsx'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ConnectionsContainer } from './Connections/ConnectionsPlay.tsx';
import { ConnectionsCreate } from './Connections/ConnectionsCreate.tsx';
import { ConnectionsNYTArchive, ConnectionsNYTToday } from './Connections/ConnectionsNYT.tsx';
import { ConnectionsProvider } from './Connections/ConnectionsContext.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <Routes>
      <Route
        path="/connections/play"
        element={
          <ConnectionsProvider>
            <ConnectionsContainer />
          </ConnectionsProvider>
        }
      />
      <Route
        path="/connections/today"
        element={
          <ConnectionsProvider>
            <ConnectionsNYTToday />
          </ConnectionsProvider>
        }
      />
      <Route
        path="/connections/archive"
        element={
          <ConnectionsProvider>
            <ConnectionsNYTArchive />
          </ConnectionsProvider>
        }
      />
      <Route
        path="/connections/create"
        element={
          <ConnectionsProvider>
            <ConnectionsCreate />
          </ConnectionsProvider>
        }
      />
      <Route
        path="/connections"
        element={
          <ConnectionsProvider>
            <ConnectionsCreate />
          </ConnectionsProvider>
        }
      />

      <Route path="*" Component={Home} />
    </Routes>
  </Router>
)
