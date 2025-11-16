type CartaProps = {
  id: number
  nombre: string
  descripcion: string
  ataque: number
  defensa: number
  imagen: string
}

function Carta({ nombre, descripcion, ataque, defensa, imagen }: CartaProps) {
  return (
    <div className="bg-gradient-to-b from-yellow-100 via-white to-gray-200 
                    border-4 border-yellow-600 rounded-xl 
                    w-44 h-72 shadow-md 
                    flex flex-col">
      {/* Nombre */}
      <div className="bg-yellow-600 text-white text-center font-bold py-1 rounded-t-md text-sm truncate">
        {nombre}
      </div>

      {/* Imagen */}
      <img
        src={imagen}
        alt={nombre}
        className="w-full h-24 object-cover border-b-2 border-yellow-600"
      />

      {/* Descripción */}
      <div className="p-2 text-xs text-gray-700 italic bg-gray-50 border-t border-gray-300 flex-grow overflow-hidden">
        {descripcion}
      </div>

      {/* Stats */}
      <div className="flex justify-between items-center px-2 py-1 bg-gradient-to-r from-red-100 to-blue-100 border-t-2 border-yellow-600 text-xs">
        <span className="text-red-700 font-bold">⚔️ {ataque}</span>
        <span className="text-blue-700 font-bold">🛡️ {defensa}</span>
      </div>
    </div>
  )
}

export default Carta
