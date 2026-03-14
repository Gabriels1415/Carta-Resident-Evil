import { useState, useEffect } from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Carta, { type CartaType } from "./components/Carta"
import Recomendaciones from "./components/recomendaciones"
import CrearCarta from "./components/CrearCarta"
import EditarCarta from "./components/EditarCarta"
import { API } from "./services/api"

function Home() {
  const [cartas, setCartas] = useState<CartaType[]>([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');

  const cargarCartas = async () => {
    setCargando(true);
    const data = await API.getCartas();
    setCartas(data);
    setCargando(false);
  };

  useEffect(() => {
    cargarCartas();
  }, []);

  const manejarBorrar = async (idCard: number) => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar esta carta del archivo?");
    if (confirmar) {
      try {
        await API.eliminarCarta(idCard);
        setCartas(cartas.filter(carta => carta.idCard !== idCard));
      } catch (error: any) {
        alert(`Ocurrió un error intentando borrar la carta: ${error.message}`);
      }
    }
  };

  const cartasFiltradas = cartas.filter(carta =>
    carta.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto">

      {!cargando && (cartas.length > 0 || busqueda !== '') && (
        <div className="w-full max-w-md mb-10 relative">
          <input
            type="text"
            placeholder="Buscar sujeto en el archivo..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full bg-black/60 border border-red-900/50 rounded-full py-3 px-6 text-white text-center focus:outline-none focus:border-red-500 shadow-[0_0_15px_rgba(255,0,0,0.1)] backdrop-blur-sm transition-all"
          />
          {busqueda && (
            <button
              onClick={() => setBusqueda('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-red-500 font-bold"
            >
              ✕
            </button>
          )}
        </div>
      )}

      {cargando ? (
        <div className="text-red-500 font-bold text-2xl animate-pulse mt-20 uppercase tracking-widest text-center">
          Accediendo a la base de datos...
        </div>
      ) : cartas.length === 0 && busqueda === '' ? (
        <div className="text-stone-400 mt-20 text-center">
          <p className="text-2xl mb-4 uppercase tracking-widest">No tienes cartas registradas</p>
          <Link to="/crear" className="text-red-500 hover:text-red-400 border border-red-500 px-4 py-2 rounded">
            Crear tu Primera Carta
          </Link>
        </div>
      ) : cartasFiltradas.length === 0 ? (
        <div className="text-stone-400 mt-20 text-center">
          <p className="text-xl mb-4 uppercase tracking-widest">No se encontraron sujetos con ese nombre</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-10 justify-center w-full">
          {cartasFiltradas.map((carta) => (
            <Carta
              key={carta.idCard}
              carta={carta}
              onBorrar={manejarBorrar}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function App() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat p-6 bg-fixed"
      style={{ backgroundImage: "url('/imagenes/fondo.jpg')" }}>

      <nav className="flex justify-center gap-6 mb-8 bg-black/50 p-4 rounded-lg backdrop-blur-sm max-w-4xl mx-auto border border-zinc-800">
        <Link to="/" className="text-white hover:text-red-500 font-bold transition-colors">COLECCIÓN</Link>
        <Link to="/crear" className="text-white hover:text-red-500 font-bold transition-colors">CREAR CARTA</Link>
        <Link to="/recomendaciones" className="text-white hover:text-red-500 font-bold transition-colors">INFO</Link>
      </nav>

      <img className="w-160 h-auto mx-auto mb-2 block"
        src="/imagenes/logo.png"
        alt="logo"
      />
      <p className="text-center text-red-700/80 mb-8 font-bold tracking-widest uppercase">
        Acceso de Nivel Superior: <span className="text-white">Gabriel Solano</span>
      </p>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crear" element={<CrearCarta />} />
        <Route path="/editar/:id" element={<EditarCarta />} />
        <Route path="/recomendaciones" element={<Recomendaciones />} />
      </Routes>
    </div>
  )
}

export default App
