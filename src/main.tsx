import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home.tsx'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Test } from './Connections.tsx';
import { ConnectionsForm } from './ConnectionsForm.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/connections" Component={Test} />
        <Route path="/connections-create" Component={ConnectionsForm} />

        <Route path="*" Component={Home} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
