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
  color: string  
}

function Carta({ nombre, descripcion, ataque, defensa, agilidad, iq, imagen, color }: CartaProps) {
  const [mostrarInfo, setMostrarInfo] = useState(false)

  return (
    <>

      <div
        className={`bg-gradient-to-b ${color} 
                    border-2 border-purple-700 rounded-xl 
                    w-60 h-auto shadow-lg flex flex-col p-2`}
      >
        <div className="bg-purple-700 text-white text-center font-bold py-1 rounded-t-md text-sm truncate">
          {nombre}
        </div>

        <img
          src={imagen}
          alt={nombre}
          className="w-full h-45 object-cover border-b-2 border-purple-700"
        />

        <button
          onClick={() => setMostrarInfo(true)}
          className="mt-2 bg-purple-600 text-white text-xs font-bold py-1 px-2 rounded hover:bg-purple-800 transition"
        >
          Mostrar más información
        </button>

        <div className="flex justify-between items-center px-2 py-1 mt-auto bg-gradient-to-r from-purple-200 to-purple-400 border-t-2 border-purple-700 text-xs">
          <span className="text-red-700 font-bold">⚔️ Ataque {ataque}</span>
          <span className="text-blue-700 font-bold">🛡️ Defensa {defensa}</span>
          <span className="text-red-700 font-bold">⚡ Agilidad {agilidad}</span>
          <span className="text-blue-700 font-bold">🧠 IQ {iq}</span>
        </div>
      </div>


      {mostrarInfo && (
        <div className=" fixed inset-0 flex items-center justify-center bg-blue bg-opacity-50 backdrop-blur-sm z-50">
          <div className= {`bg-gradient-to-b ${color} 
                        border-4 border-purple-700 rounded-2xl 
                        w-[600px] h-[700px] shadow-2xl flex flex-col p-6 relative`}
          >
          
      <button
        onClick={() => setMostrarInfo(false)}
        className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        X
      </button>


      <h2 className="bg-purple-700 text-white text-center font-bold py-2 rounded-md text-2xl mb-4">
        {nombre}
      </h2>


      <img
        src={imagen}
        alt={nombre}
        className="w-full h-[400px] object-cover rounded-lg border-2 border-purple-700 mb-4"
      />


      <div className="bg-white text-black p-4 rounded-md mb-4 shadow">
        <p className="italic">{descripcion}</p>
      </div>

   
      <div className="flex justify-between items-center px-4 py-2 mt-auto bg-gradient-to-r from-purple-200 to-purple-400 border-t-4 border-purple-700 text-lg rounded-md">
        <span className="text-red-700 font-bold">⚔️ Ataque {ataque}</span>
        <span className="text-blue-700 font-bold">🛡️ Defensa {defensa}</span>
        <span className="text-red-700 font-bold">⚡ Agilidad {agilidad}</span>
        <span className="text-blue-700 font-bold">🧠 IQ {iq}</span>
      </div>
    </div>
  </div>
)}
    </>
  )
}

export default Carta
