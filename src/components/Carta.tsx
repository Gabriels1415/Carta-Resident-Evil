import { useState } from "react"

type CartaProps = {
  id: number
  nombre: string
  descripcion1: string
  descripcion2: string
  ataque: number
  defensa: number
  agilidad: number
  iq: number
  imagen: string
  imagenModal: string
}

function Carta({ nombre, descripcion1, descripcion2, ataque, defensa, agilidad, iq, imagen, imagenModal }: CartaProps) {
  const [mostrarInfo, setMostrarInfo] = useState(false)




  return (
    <>


<div className="bg-gradient-to-b from-[#450a0a] via-zinc-900 to-black border-2 border-zinc-800 rounded-xl w-60 h-auto shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex flex-col p-2">

  <div className="bg-black/40 text-white/75 text-center font-bold py-1 rounded-t-md text-sm truncate tracking-widest uppercase">
    {nombre}
  </div>
  
  <img
    src={imagen}
    alt={nombre}
    className="w-full h-45 object-cover border-b border-zinc-800/50 grayscale-[20%]"
  />

  <button
    onClick={() => setMostrarInfo(true)}
    className="mt-2 bg-[#2d0606] text-stone-500 text-[10px] uppercase tracking-widest font-bold py-1 px-2 rounded border border-zinc-800 hover:bg-[#450a0a] hover:text-stone-200 transition-colors"
  >
    EXPEDIENTE
  </button>

  <div className="flex justify-between items-center px-2 py-2 mt-auto text-[10px] font-bold">
    <span className="text-[#7f1d1d]">⚔️ {ataque}</span>
    <span className="text-zinc-600">🛡️ {defensa}</span>
    <span className="text-[#7f1d1d]">⚡ {agilidad}</span>
    <span className="text-zinc-600">🧠 {iq}</span>
  </div>
</div>

      {/* MODAL UNIFICADO: Sin el && para que la animación de salida funcione
      NOTA: Esto si lo hice con IA porque me salia error  */}
      <div className={`fixed inset-0 flex items-center justify-center bg-black/90 backdrop-blur-md z-50 modal-animacion ${mostrarInfo ? 'open' : ''}`}>
        {/*Hasta aqui*/}
        
        <button
          onClick={() => setMostrarInfo(false)}
          className="absolute top-5 right-10 text-white text-4xl font-light hover:text-red-500 z-[60] transition"
        >
          ✕
        </button>

        <div className="w-full h-full flex flex-row items-center justify-between px-10 relative">
          
     
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20 text-8xl font-black uppercase tracking-tighter select-none">
            {nombre}
          </div>

          <div className="w-full h-full flex flex-row items-center justify-center px-4 relative">
  
  <div className="w-1/3 text-stone-200 text-right text-lg md:text-xl font-light italic pr-2 z-10">
    <p className="border-r-2 border-[#450a0a] pr-4 leading-relaxed">
      {descripcion1}
    </p>
  </div>

  <div className="w-1.2/3 h-[85vh] flex justify-center items-center relative">
    <div className="absolute inset-0 bg-[#450a0a] opacity-30 blur-[100px] rounded-full"></div>
    
    <img
      src={imagenModal}
      alt={nombre}
      className="max-h-full max-w-full object-contain relative z-10 drop-shadow-[0_0_30px_rgba(69,10,10,0.8)]"
    />
  </div>

  <div className="w-1/3 text-stone-200 text-left text-lg md:text-xl font-light italic pl-2 z-10">
    <p className="border-l-2 border-[#450a0a] pl-4 leading-relaxed">
      {descripcion2}
    </p>
    </div>
    </div>
      </div>
      </div>
    </>
  )
}

export default Carta
