import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import './index.css'
import Home from './Home.tsx'
import LoadingSpinner from './Connections/Loading.tsx';
const ConnectionsContainer = lazy(() => import('./Connections/ConnectionsContainer.tsx'));
const ConnectionsCreate = lazy(() => import('./Connections/ConnectionsCreate.tsx'));
const ConnectionsNYTArchive = lazy(() => import('./Connections/ConnectionsNYTArchive.tsx'));
const ConnectionsNYTToday = lazy(() => import('./Connections/ConnectionsNYTToday.tsx'));
const ConnectionsProvider = lazy(() => import('./Connections/ConnectionsProvider.tsx'));
const ConnectionsLanding = lazy(() => import('./Connections/ConnectionsLanding.tsx'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <Suspense fallback={<LoadingSpinner />}>
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
              <ConnectionsLanding />
            </ConnectionsProvider>
          }
        />

        <Route path="*" Component={Home} />
      </Routes>
    </Suspense>
  </Router>
)
