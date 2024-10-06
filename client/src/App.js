import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from 'contexts/auth-context'
import AppLayout from 'layouts/app-layout'
import Home from 'pages/home'
import Feed from 'pages/feed'
import Trending from 'pages/trending'
import Community from 'pages/community'
import 'app.css'


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
