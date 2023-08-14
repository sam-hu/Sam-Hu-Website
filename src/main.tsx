import ReactDOM from 'react-dom/client'
import Home from './Home.tsx'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ConnectionsContainer } from './ConnectionsPlay.tsx';
import { ConnectionsForm } from './ConnectionsForm.tsx';
import { ConnectionsNYTArchive, ConnectionsNYTToday } from './ConnectionsNYT.tsx';
import { ConnectionsProvider } from './ConnectionsContext.tsx';


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
            <ConnectionsForm />
          </ConnectionsProvider>
        }
      />
      <Route
        path="/connections"
        element={
          <ConnectionsProvider>
            <ConnectionsForm />
          </ConnectionsProvider>
        }
      />

      <Route path="*" Component={Home} />
    </Routes>
  </Router>
)
