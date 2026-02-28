import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Recomendaciones from "./pages/recomendaciones"
import Home from './pages/Home'
import Crear from './pages/Crear'


function App() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat p-6"
      style={{ backgroundImage: "url('/imagenes/fondo.jpg')" }}>

      <nav className="flex justify-center gap-6 mb-8 bg-black/50 p-4 rounded-lg backdrop-blur-sm">
        <Link to="/" className="text-white hover:text-red-500 font-bold transition-colors">INICIO</Link>
        <Link to="/recomendaciones" className="text-white hover:text-red-500 font-bold transition-colors">RECOMENDACIONES</Link>
         <Link to="/Crear" className="text-white hover:text-red-500 font-bold transition-colors">CREAR</Link>
      </nav>

      <img className="w-160 h-auto mx-auto mb-2 block"
        src="/imagenes/logo.png"
        alt="logo"
      />
      <p className="text-center text-white mb-4">Nombre: Gabriel Solano</p>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recomendaciones" element={<Recomendaciones />} />
        <Route path="/crear" element={<Crear />} />
      </Routes>

    </div>
  )
}

export default App
