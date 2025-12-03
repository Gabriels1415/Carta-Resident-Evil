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
          color="from-yellow-200 via-yellow-300 to-yellow-400"
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
          color="from-amber-700 via-yellow-800 to-yellow-900"
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
          color="from-blue-200 via-blue-300 to-blue-400"
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
          color="from-purple-700 via-purple-800 to-purple-900"
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
          color="from-cyan-200 via-cyan-300 to-cyan-400"
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
          color="from-violet-300 via-violet-400 to-violet-500"
        />
        <Carta
         id={9}
        nombre="🌑 Albert Wesker"
          ataque={125}
          defensa={100}
          agilidad={120}
          iq={100}
        descripcion="Carta de tipo sombra, un antagonista maestro de la manipulación. Su fuerza sobrehumana y astucia lo convierten en una amenaza constante."
        imagen="/imagenes/albertwesker.jpeg"
        color="from-purple-700 via-purple-800 to-purple-900"
       />

        <Carta
        id={10}
        nombre="🌬️ Hunk"
        ataque={110}
        defensa={85}
        agilidad={80}
        iq={85}
        descripcion="Carta de tipo viento, el misterioso 'Grim Reaper' de Umbrella. Su agilidad y precisión táctica lo hacen casi invencible en operaciones encubiertas."
        imagen="/imagenes/hunk.jpeg"
        color="from-cyan-200 via-cyan-300 to-cyan-400"
        />

        <Carta
      id={11}
      nombre="🌍 Carlos Oliveira"
      ataque={100}
      defensa={95}
      agilidad={78}
      iq={80}
      descripcion="Carta de tipo tierra, un mercenario sudamericano de la U.B.C.S. con gran resistencia y habilidad en armas pesadas. Protector y leal, aporta fuerza y apoyo táctico."
      imagen="/imagenes/carlosoliveira.jpg"
      color="from-amber-700 via-yellow-800 to-yellow-900"
        />


      </div>
     </div>

  )
}
    

export default App

