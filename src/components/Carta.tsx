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
    <div className="relative bg-gradient-to-b from-yellow-100 via-white to-gray-200 border-4 border-yellow-600 rounded-xl w-72 shadow-2xl hover:scale-105 transition-transform">
      <div className="bg-yellow-600 text-white text-center font-bold py-1 rounded-t-md">
        {nombre}
      </div>

      <img
        src={imagen}
        alt={nombre}
        className="w-full h-44 object-cover border-b-2 border-yellow-600"
      />

      <div className="p-3 text-sm text-gray-700 italic bg-gray-50 border-t border-gray-300">
        {descripcion}
      </div>

      <div className="flex justify-between items-center px-4 py-2 bg-gradient-to-r from-red-100 to-blue-100 border-t-2 border-yellow-600">
        <span className="text-red-700 font-extrabold text-lg drop-shadow-md">
          ⚔️ {ataque}
        </span>
        <span className="text-blue-700 font-extrabold text-lg drop-shadow-md">
          🛡️ {defensa}
        </span>
      </div>
    </div>
  )
}

export default Carta
