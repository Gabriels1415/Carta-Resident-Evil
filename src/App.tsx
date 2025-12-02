import './App.css'
import Carta from "./components/Carta"

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-pink-700 to-blue-900 p-6">
      <h1 className="text-center text-white text-4xl font-extrabold mb-6">
        Cartas Resident Evil
      </h1>
      <p className="text-center text-white mb-4">Nombre: Gabriel Solano</p>

      <div className="flex flex-wrap gap-4 justify-center">
        <Carta
          id={1}
          nombre="✨ Leon S. Kennedy"
          ataque={110}
          defensa={85}
          agilidad={85}
          iq={90}
          descripcion="Carta de tipo luz, un agente con reflejos rápidos y gran puntería. Destaca en situaciones de alto riesgo."
          imagen="/imagenes/leonkennedy.jpg"
        />

        <Carta
          id={2}
          nombre="🌍 Chris Redfield"
          ataque={120}
          defensa={95}
          agilidad={75}
          iq={80}
          descripcion="Carta de tipo tierra, fuerza bruta y resistencia sobrehumana."
          imagen="/imagenes/chrisredfield.jpg"
        />

        <Carta
          id={3}
          nombre="💧 Jill Valentine"
          ataque={90}
          defensa={85}
          agilidad={95}
          iq={95}
          descripcion="Carta de tipo agua, especialista en tácticas y supervivencia."
          imagen="/imagenes/jillvalentine.jpg"
        />

        <Carta
          id={4}
          nombre="🌑 Ada Wong"
          ataque={95}
          defensa={70}
          agilidad={90}
          iq={92}
          descripcion="Carta de tipo sombra, sigilosa y letal con armas ligeras."
          imagen="/imagenes/adawong.jpeg"
        />

        <Carta
          id={7}
          nombre="🌬️ Claire Redfield"
          ataque={95}
          defensa={80}
          agilidad={88}
          iq={85}
          descripcion="Carta de tipo viento, ágil y valiente. Especialista en supervivencia y apoyo táctico."
          imagen="/imagenes/claireredfield.jpeg"
        />

        <Carta
          id={8}
          nombre="🔮 Ethan Winters"
          ataque={100}
          defensa={85}
          agilidad={80}
          iq={87}
          descripcion="Carta de tipo espíritu, un sobreviviente marcado por el horror. Resiliente y con voluntad inquebrantable."
          imagen="/imagenes/ethanwinters.jpeg"
        />
      </div>
 

      <div className="flex justify-center mt-10">
  <div className="bg-black border-4 border-white rounded-full relative w-64 h-64 animate-spin-slow">
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-yellow-400 font-bold">
      Luz
    </div>
    <div className="absolute top-1/4 right-0 transform -translate-y-1/2 text-purple-500 font-bold">
      Sombra
    </div>
    <div className="absolute bottom-1/4 right-0 transform translate-y-1/2 text-violet-300 font-bold">
      Espíritu
    </div>
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-amber-700 font-bold">
      Tierra
    </div>
    <div className="absolute bottom-1/4 left-0 transform translate-y-1/2 text-blue-400 font-bold">
      Agua
    </div>
    <div className="absolute top-1/4 left-0 transform -translate-y-1/2 text-cyan-300 font-bold">
      Viento
    </div>
  </div>
</div>
</div>
  )
}
    
 
export default App
