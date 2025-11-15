import './App.css'
import Carta from "./components/Carta"

function App() {
  return (
    <div>
      <h1>Cartas Resident Evil</h1>
      <p>Nombre: Gabriel Solano</p>

      <Carta
        id={1}
        nombre="Leon S. Kennedy"
        ataque={110}
        defensa={85}
        descripcion="Carta de tipo luz, un agente con reflejos rápidos y gran puntería. Destaca en situaciones de alto riesgo."
        imagen="/imagenes/leonkennedy.jpeg"
      />

      <Carta
        id={2}
        nombre="Chris Redfield"
        ataque={120}
        defensa={95}
        descripcion="Carta de tipo tierra, fuerza bruta y resistencia sobrehumana."
        imagen="/imagenes/chrisredfield.jpeg"
      />

      <Carta
        id={3}
        nombre="Jill Valentine"
        ataque={90}
        defensa={85}
        descripcion="Carta de tipo agua, especialista en tácticas y supervivencia."
        imagen="/imagenes/jillvalentine.jpeg"
      />

      <Carta
        id={4}
        nombre="Ada Wong"
        ataque={95}
        defensa={70}
        descripcion="Carta de tipo sombra, sigilosa y letal con armas ligeras."
        imagen="/imagenes/adawong.jpeg"
      />

      <Carta
        id={5}
        nombre="Albert Wesker"
        ataque={130}
        defensa={100}
        descripcion="Carta de tipo oscuridad, velocidad sobrehumana y poder devastador."
        imagen="/imagenes/albertwesker.jpeg"
      />

      <Carta
        id={6}
        nombre="Hunk"
        ataque={105}
        defensa={90}
        descripcion="Carta de tipo sombra, el misterioso 'Grim Reaper' de Umbrella. Preciso, frío y letal."
        imagen="/imagenes/hunk.jpeg"
      />

      <Carta
        id={7}
        nombre="Claire Redfield"
        ataque={95}
        defensa={80}
        descripcion="Carta de tipo viento, ágil y valiente. Especialista en supervivencia y apoyo táctico."
        imagen="/imagenes/claireredfield.jpeg"
      />

      <Carta
        id={8}
        nombre="Ethan Winters"
        ataque={100}
        defensa={85}
        descripcion="Carta de tipo espíritu, un sobreviviente marcado por el horror. Resiliente y con voluntad inquebrantable."
        imagen="/imagenes/ethanwinters.jpeg"
      />
    </div>
  )
}

export default App
