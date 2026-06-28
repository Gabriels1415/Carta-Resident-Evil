import { useState } from 'react';
import { API } from '../services/api';
import Carta, { type CartaType } from './Carta';
import { useNavigate } from 'react-router-dom';

type Props = {
  recargarCartas?: () => Promise<void>;
};

function GenerarCartaIA({ recargarCartas }: Props) {
  const [cardPrompt, setCardPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cartaGenerada, setCartaGenerada] = useState<CartaType | null>(null);
  const navigate = useNavigate();

  // Contexto global enfocado en Resident Evil y balanceado según las reglas del usuario
  const globalContext = "Temática de survival horror tipo Resident Evil. Los personajes pueden ser Agentes, Mercenarios, Civiles o Monstruos (B.O.W.). Los stats de ataque, defensa y vida deben estar entre (ataque:7-15) defensa; (5-15) vida: (80-100) . Debe tener un estilo oscuro y de acción.";

  const manejarGenerar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardPrompt.trim()) return;

    setLoading(true);
    setError(null);
    setCartaGenerada(null);

    try {
      const data = await API.generarCartaIA(globalContext, cardPrompt);
      // La API devuelve directamente el objeto de la carta en caso de éxito
      setCartaGenerada(data);
      if (recargarCartas) {
        await recargarCartas();
      }
    } catch (err: any) {
      setError(err.message || "Error desconocido al generar la carta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-white mb-6 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">Generar Carta con IA</h2>

      <form onSubmit={manejarGenerar} className="w-full bg-black/60 p-6 rounded-lg border border-red-900/50 shadow-[0_0_20px_rgba(255,0,0,0.1)] backdrop-blur-sm mb-8 flex flex-col items-center">
        <label htmlFor="prompt" className="text-stone-300 font-bold mb-4 uppercase tracking-widest text-sm text-center">
          Describe la carta que deseas crear:
        </label>

        <textarea
          id="prompt"
          value={cardPrompt}
          onChange={(e) => setCardPrompt(e.target.value)}
          placeholder="Ej: Mercenario, musculoso, con traje rojo y negro de la saga de juegos Resident Evil que su naturaleza es ser rudo, posee una arma (pistola) o habilidad especial (superfuerza)."
          className="w-full max-w-2xl bg-black/80 border border-zinc-700 rounded p-4 text-white focus:outline-none focus:border-red-500 shadow-inner h-32 resize-none mb-6"
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading || !cardPrompt.trim()}
          className="bg-[#450a0a] hover:bg-red-800 disabled:bg-zinc-800 disabled:text-zinc-500 text-stone-200 border border-red-900/50 px-8 py-3 rounded uppercase font-bold tracking-widest transition-colors shadow-[0_0_15px_rgba(69,10,10,0.5)] cursor-pointer"
        >
          {loading ? 'Procesando Inteligencia Artificial...' : 'Generar Carta'}
        </button>
      </form>

      {/* Manejo de estados: Error */}
      {error && (
        <div className="bg-red-900/80 text-white p-4 rounded mb-8 border border-red-500 text-center uppercase tracking-wider font-bold">
          {error}
        </div>
      )}

      {/* Manejo de estados: Cargando */}
      {loading && (
        <div className="flex flex-col items-center justify-center mt-10">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600 mb-4"></div>
          <p className="text-red-500 font-bold text-xl animate-pulse uppercase tracking-widest text-center">
            IA Analizando Parámetros...
          </p>
        </div>
      )}

      {/* Manejo de estados: Carta Generada */}
      {cartaGenerada && (
        <div className="flex flex-col items-center mt-8 animate-fade-in">
          <h3 className="text-xl text-green-500 font-bold mb-6 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">
            ¡Carta Creada Exitosamente!
          </h3>
          <div className="mb-8 scale-110">
            <Carta carta={cartaGenerada} />
          </div>

          <button
            onClick={() => navigate('/')}
            className="text-stone-400 hover:text-white border border-stone-600 hover:border-white px-6 py-2 rounded uppercase text-sm font-bold tracking-widest transition-colors"
          >
            Volver a la Colección
          </button>
        </div>
      )}
    </div>
  );
}

export default GenerarCartaIA;
