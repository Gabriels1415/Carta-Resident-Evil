import { useState } from "react"

type CartaProps = {
  id: number
  nombre: string
  descripcion: string
  ataque: number
  defensa: number
  agilidad: number
  iq: number
  imagen: string
}

function Carta({ nombre, descripcion, ataque, defensa, agilidad, iq, imagen }: CartaProps) {
  const [mostrarInfo, setMostrarInfo] = useState(false)

  return (
    <div className="bg-gradient-to-b from-purple-200 via-purple-300 to-purple-400 
                    border-2 border-purple-700 rounded-xl 
                    w-60 h-auto shadow-lg flex flex-col p-2">
      
  
      <div className="bg-purple-700 text-white text-center font-bold py-1 rounded-t-md text-sm truncate">
        {nombre}
      </div>


      <img
        src={imagen}
        alt={nombre}
        className="w-full h-28 object-cover border-b-2 border-purple-700"
      />

    
      <button
        onClick={() => setMostrarInfo(!mostrarInfo)}
        className="mt-2 bg-purple-600 text-white text-xs font-bold py-1 px-2 rounded hover:bg-purple-800 transition"
        >
        {mostrarInfo ? "Ocultar información" : "Mostrar más información"}
      </button>


      
        {mostrarInfo && (
        <div className="mt-2 p-2 text-xs text-gray-900 italic bg-purple-100 border-t border-purple-300 overflow-hidden">
          {descripcion}
        </div>
          )}
      

      <div className="flex justify-between items-center px-2 py-1 mt-auto bg-gradient-to-r from-purple-200 to-purple-400 border-t-2 border-purple-700 text-xs">
        <span className="text-red-700 font-bold">⚔️ Ataque {ataque}</span>
        <span className="text-blue-700 font-bold">🛡️ Defensa {defensa}</span>
        <span className="text-red-700 font-bold">⚡ Agilidad {agilidad}</span>
        <span className="text-blue-700 font-bold">🧠 IQ {iq}</span>
      </div>
      
    </div>
  )
}

export default Carta
