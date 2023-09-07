import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Home';
import LoadingSpinner from './Connections/Loading';

const ConnectionsProvider = lazy(() => import('./Connections/ConnectionsProvider'));
const ConnectionsRouter = lazy(() => import('./Connections/ConnectionsRouter'));
const ConnectionsCreate = lazy(() => import('./Connections/ConnectionsCreate'));
const ConnectionsNYTArchive = lazy(() => import('./Connections/ConnectionsNYTArchive'));
const ConnectionsNYTToday = lazy(() => import('./Connections/ConnectionsNYTToday'));
const ConnectionsLanding = lazy(() => import('./Connections/ConnectionsLanding'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route
          path="/connections/play"
          element={(
            <ConnectionsProvider>
              <ConnectionsRouter />
            </ConnectionsProvider>
          )}
        />
        <Route
          path="/connections/today"
          element={(
            <ConnectionsProvider>
              <ConnectionsNYTToday />
            </ConnectionsProvider>
          )}
        />
        <Route
          path="/connections/archive"
          element={(
            <ConnectionsProvider>
              <ConnectionsNYTArchive />
            </ConnectionsProvider>
          )}
        />
        <Route
          path="/connections/create"
          element={(
            <ConnectionsProvider>
              <ConnectionsCreate />
            </ConnectionsProvider>
          )}
        />
        <Route
          path="/connections"
          element={(
            <ConnectionsProvider>
              <ConnectionsLanding />
            </ConnectionsProvider>
          )}
        />

        <Route path="*" Component={Home} />
      </Routes>
    </Suspense>
  </Router>,
);
