import React from 'react'
import AppLayout from './layouts/AppLayout'
import Home from './pages/Home'
import Feed from './pages/Feed'
import Trending from './pages/Trending'
import Community from './pages/Community'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
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
  );
}

export default App;
