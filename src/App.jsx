import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import MovieDetails from './pages/MovieDetails'
import Favorites from './pages/Favorites'
import ScrollToTop from './components/ScrollToTop'
import Error404 from './pages/Error404'

const App = () => {
  return (
    <>
      <ScrollToTop />
      <div className="relative min-h-screen overflow-hidden bg-black/90 text-white">

        <div
          className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-10 blur-sm scale-110"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1710344062492-3317c79f2848?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9nZ3klMjB3ZWF0aGVyfGVufDB8fDB8fHww')",
          }}
        />

        <div className="fixed inset-0 -z-10 bg-black/70" />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/details/:type/:id" element={<MovieDetails />} />
          <Route path="/:type/:movietype1" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </>
  )
}

export default App
