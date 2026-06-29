// Herramientas para que la página sea interactiva y sepa moverse entre pantallas
import { useState, useEffect } from 'react'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Carta, { type CartaType } from "./components/Carta"
import Recomendaciones from "./components/recomendaciones"
import CrearCarta from "./components/CrearCarta"
import EditarCarta from "./components/EditarCarta"
import SeleccionarCartas from "./components/SeleccionarCarta"
import CampoDeBatalla from "./components/CampoDeBatalla"
import GenerarCartaIA from "./components/GenerarCartaIA"
import { API } from "./services/api"

// Propiedades que Home recibe de App
type HomeProps = {
  cartas: CartaType[];
  cargando: boolean;
  setCartas: React.Dispatch<React.SetStateAction<CartaType[]>>;
}

// Esta es la pantalla principal donde vemos todas las cartas
function Home({ cartas, cargando, setCartas }: HomeProps) {
  // Lo que el usuario va escribiendo para buscar a alguien
  const [busqueda, setBusqueda] = useState('');
  // Para mostrar un aviso si se está borrando algo
  const [borrar, setBorrar] = useState(false);

  // Para quitar un personaje del archivo
  const manejarBorrar = async (idCard: number) => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar esta carta del archivo?");
    if (confirmar) {
      try {
        setBorrar(true);
        await API.eliminarCarta(idCard);
        // Quitamos la carta de nuestra lista local para que desaparezca de la pantalla
        setCartas(cartas.filter(carta => carta.idCard !== idCard));
      } catch (error: any) {
       setBorrar(false);
      } finally {
        setBorrar(false);
      }
    }
  };

  // Filtramos la lista según lo que se escriba en el buscador
  const cartasFiltradas = cartas.filter(carta =>
    carta.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto">

      {/* Solo aparece el buscador si ya terminó de cargar */}
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

      {/* Si todavía está bajando los datos de internet */}
      {cargando ? (
        <div className="text-red-500 font-bold text-2xl animate-pulse mt-20 uppercase tracking-widest text-center">
          Accediendo a la base de datos...
        </div>
      ) : (
        <>
        {/* Aviso de que se está borrando un registro */}
        {borrar && (
            <div className="text-red-600 font-bold text-2xl animate-pulse my-10 uppercase tracking-widest text-center">
              Eliminando carta del archivo...
            </div>
          )}
       
       {/* Si el archivo está vacío, mostramos el botón de creación */}
       {cartas.length === 0 && busqueda === '' ? (
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
        // Aquí dibujamos todas las cartas en la pantalla
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
        </>
      )} 
    </div>
  )
}

// ── Helper de audio para la navegación ──────────────────────
const reproducirNav = (ruta: string, volumen = 1.0) => {
  const audio = new Audio(ruta);
  audio.volume = volumen;
  audio.play().catch(() => {});
};

// Estructura general de la pantalla y el menú
function App() {
  // Estado global de cartas (compartido entre Home y SeleccionarCartas)
  const [mazoCartas, setMazoCartas] = useState<CartaType[]>([]);
  const [loading, setLoading] = useState(true);

  // Función para recargar las cartas cuando se crea o edita una
  const cargarCartas = async () => {
    setLoading(true);
    const data = await API.getCartas();
    setMazoCartas(data);
    setLoading(false);
  };

  // Cargar cartas al iniciar la aplicación
  useEffect(() => {
    cargarCartas();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat p-6 bg-fixed"
      style={{ backgroundImage: "url('/imagenes/fondo.jpg')" }}>

      {/* Botones del menú principal */}
      <nav className="flex justify-center gap-6 mb-8 bg-black/50 p-4 rounded-lg backdrop-blur-sm max-w-4xl mx-auto border border-zinc-800">
        <Link
          to="/"
          className="text-white hover:text-red-500 font-bold transition-colors"
          onMouseEnter={() => reproducirNav('/audios/Elegir.mp3')}
          onClick={() => reproducirNav('/audios/Seleccionar.mp3')}
        >COLECCIÓN</Link>
        <Link
          to="/crear"
          className="text-white hover:text-red-500 font-bold transition-colors"
          onMouseEnter={() => reproducirNav('/audios/Elegir.mp3')}
          onClick={() => reproducirNav('/audios/Seleccionar.mp3')}
        >CREAR CARTA</Link>
        <Link
          to="/generar-carta-ia"
          className="text-white hover:text-red-500 font-bold transition-colors text-purple-400"
          onMouseEnter={() => reproducirNav('/audios/Elegir.mp3')}
          onClick={() => reproducirNav('/audios/Seleccionar.mp3')}
        >GENERAR IA</Link>
        <Link
          to="/seleccionar-cartas"
          className="text-white hover:text-red-500 font-bold transition-colors"
          onMouseEnter={() => reproducirNav('/audios/Elegir.mp3')}
          onClick={() => reproducirNav('/audios/Seleccionar.mp3')}
        >BATALLA</Link>
        <Link
          to="/recomendaciones"
          className="text-white hover:text-red-500 font-bold transition-colors"
          onMouseEnter={() => reproducirNav('/audios/Elegir.mp3')}
          onClick={() => reproducirNav('/audios/Seleccionar.mp3')}
        >INFO</Link>
      </nav>

      {/* Imagen del logo principal */}
      <img className="w-160 h-auto mx-auto mb-2 block"
        src="/imagenes/logo.png"
        alt="logo"
      />
      <p className="text-center text-red-700/80 mb-8 font-bold tracking-widest uppercase">
        Acceso de Nivel Superior: <span className="text-white">Gabriel Solano</span>
      </p>

      {/* Mapa que decide qué sección cargar */}
      <Routes>
        <Route path="/" element={<Home cartas={mazoCartas} cargando={loading} setCartas={setMazoCartas} />} />
        <Route path="/crear" element={<CrearCarta recargarCartas={cargarCartas} />} />
        <Route path="/generar-carta-ia" element={<GenerarCartaIA recargarCartas={cargarCartas} />} />
        <Route path="/editar/:id" element={<EditarCarta recargarCartas={cargarCartas} />} />
        <Route path="/recomendaciones" element={<Recomendaciones />} />
        <Route path="/seleccionar-cartas" element={<SeleccionarCartas mazo={mazoCartas} loading={loading} />} />
        <Route path='/campo-de-batalla/:id1/:id2' element={<CampoDeBatalla />} />
      </Routes>
    </div>
  )
}

export default App
