import { useState } from "react"
import { Link } from "react-router-dom"

export type CartaType = {
  idCard: number;
  name: string;
  description: string;
  attack: number;
  defense: number;
  lifePoints: number;
  pictureUrl: string;
  attributes: {
    tipo?: string;
    armaFavorita?: string;
    [key: string]: any;
  };
}

type CartaProps = {
  carta: CartaType;
  onBorrar?: (idCard: number) => void;
}

function Carta({ carta, onBorrar }: CartaProps) {
  const [mostrarInfo, setMostrarInfo] = useState(false)

  const { idCard, name, description, attack, defense, lifePoints, pictureUrl, attributes } = carta;

  return (
    <>
      <div className="bg-gradient-to-b from-[#450a0a] via-zinc-900 to-black border-2 border-zinc-800 rounded-xl w-60 h-auto shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex flex-col p-2 hover:scale-105 transition-transform duration-300 relative group">
        
        {onBorrar && (
          <button 
            onClick={() => onBorrar(idCard)}
            className="absolute -top-3 -right-3 bg-red-600 hover:bg-red-500 text-white text-xs w-8 h-8 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-bold z-10 cursor-pointer border-2 border-black"
            title="Borrar Carta"
          >
            ✕
          </button>
        )}

        <div className="bg-black/40 text-white/75 text-center font-bold py-1 rounded-t-md text-sm truncate tracking-widest uppercase">
          {name}
        </div>

        <img
          src={pictureUrl}
          alt={name}
          className="w-full h-45 object-cover border-b border-zinc-800/50 grayscale-[10%]"
        />

        <button
          onClick={() => setMostrarInfo(true)}
          className="mt-2 bg-[#2d0606] text-stone-500 text-[10px] uppercase tracking-widest font-bold py-1 px-2 rounded border border-zinc-800 hover:bg-[#450a0a] hover:text-stone-200 transition-colors cursor-pointer"
        >
          EXPEDIENTE
        </button>

        <div className="flex justify-between items-center px-1 py-2 mt-auto text-[10px] font-bold">
          <span className="text-[#7f1d1d]" title="Ataque">⚔️ {attack}</span>
          <span className="text-zinc-600" title="Defensa">🛡️ {defense}</span>
          <span className="text-green-600" title="Puntos de Vida">❤ {lifePoints}</span>
        </div>
      </div>

      <div className={`fixed inset-0 flex items-center justify-center bg-black/95 backdrop-blur-md z-50 modal-animacion ${mostrarInfo ? 'open' : ''}`}>
        
        <button
          onClick={() => setMostrarInfo(false)}
          className="absolute top-5 right-10 text-white text-4xl font-light hover:text-red-500 z-[60] transition cursor-pointer"
        >
          ✕
        </button>

        <div className="w-full h-full flex flex-col md:flex-row items-center justify-between px-10 relative overflow-y-auto md:overflow-hidden py-10 md:py-0">
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-stone-700 text-5xl md:text-7xl font-bold uppercase tracking-widest select-none whitespace-nowrap z-0 opacity-50">
            {name}
          </div>

          <div className="w-full h-full flex flex-col md:flex-row items-center justify-center relative z-10 gap-8">
            
            <div className="w-full md:w-1/4 text-stone-300 text-sm font-light space-y-6 bg-black/40 p-6 rounded-lg border border-[#450a0a]/30">
              
              <div className="border-l-2 border-[#450a0a] pl-3">
                <h3 className="text-[#7f1d1d] font-bold uppercase tracking-widest mb-1 text-xs">Clasificación</h3>
                <p className="italic leading-relaxed text-stone-400 whitespace-pre-line">
                  Tipo: <span className="text-white font-bold">{attributes?.tipo || 'Desconocido'}</span>
                </p>
              </div>

              <div>
                <h3 className="text-stone-500 font-bold uppercase tracking-widest mb-1 text-xs border-b border-stone-800 pb-1">Particularidades</h3>
                <p className="text-stone-400 text-xs text-left whitespace-pre-line leading-relaxed">
                  Arma/Especialidad: {attributes?.armaFavorita || 'Ninguna'}
                </p>
              </div>
            </div>

            <div className="w-full md:w-1/3 h-[50vh] md:h-[80vh] flex justify-center items-center relative group">
              <div className="absolute inset-0 bg-[#450a0a] opacity-20 blur-[80px] rounded-full group-hover:opacity-30 transition-opacity duration-700"></div>
              <img
                src={pictureUrl}
                alt={name}
                className="max-h-full max-w-full object-contain relative z-10 drop-shadow-[0_0_50px_rgba(69,10,10,0.6)]"
              />
            </div>

            <div className="w-full md:w-1/4 text-stone-300 text-left font-light z-10 flex flex-col justify-between">
              <div>
                <h3 className="text-[#7f1d1d] font-bold uppercase tracking-widest mb-4 text-xl">Archivo Clasificado</h3>
                <p className="border-l-2 border-[#450a0a] pl-6 leading-loose text-lg text-justify text-stone-400 whitespace-pre-line">
                  {description || "No hay información registrada en el archivo sobre este sujeto."}
                </p>
              </div>

              <div className="mt-8">
                <Link 
                  to={`/editar/${idCard}`}
                  className="inline-block bg-[#450a0a] hover:bg-red-800 border border-red-900/50 text-stone-300 hover:text-white px-6 py-3 rounded uppercase font-bold tracking-widest text-xs transition-colors shadow-[0_0_15px_rgba(69,10,10,0.5)]"
                >
                  Modificar Archivo
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default Carta
