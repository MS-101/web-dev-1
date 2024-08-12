import React from 'react'
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Home from './pages/Home'
import Feed from './pages/Feed'
import Trending from './pages/Trending'
import Community from './pages/Community'
import './App.css'


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path='feed' element={<Feed />} />
            <Route path='trending' element={<Trending />} />
            <Route path='community' element={<Community />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
