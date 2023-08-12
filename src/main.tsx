import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home.tsx'
import './index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ConnectionsContainer } from './ConnectionsPlay.tsx';
import { ConnectionsForm } from './ConnectionsForm.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <Routes>
      <Route path="/connections-play" Component={ConnectionsContainer} />
      <Route path="/connections" Component={ConnectionsForm} />

      <Route path="*" Component={Home} />
    </Routes>
  </Router>
)
