import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Carta from "./components/Carta"
import Recomendaciones from "./components/recomendaciones"

function Home() {
  return (
    <div className="flex flex-wrap gap-10 justify-center">
      <Carta
        id={1}
        nombre="✨ Leon S. Kennedy"
        ataque={110}
        defensa={85}
        agilidad={85}
        iq={90}
        descripcionBreve="Agente federal experto en situaciones biológicas extremas."
        historia="Leon, a la corta edad de 21 años, sobrevivió al incidente de Raccoon City en su primer día como policía. Desde entonces, se ha convertido en uno de los agentes más capaces del gobierno estadounidense, enfrentando amenazas globales y protegiendo a la familia presidencial."
        imagen="/imagenes/leonkennedy.jpg"
        imagenModal="/imagenes/leoncompleto.webp"
        destrezas={"• Combate Cuchillo\n• Puntería Letal\n• Estratega"}
        debilidades={"• Protector Obsesivo\n• Traumas Raccoon City"}
        armasPoderes={"• Matilda\n• Silver Ghost\n• Patada Giratoria"}
      />

      <Carta
        id={2}
        nombre="🌍 Chris Redfield"
        ataque={120}
        defensa={95}
        agilidad={75}
        iq={80}
        descripcionBreve="Capitán de la BSAA y leyenda en la lucha contra el bioterrorismo."
        historia="Ex-miembro de S.T.A.R.S. y fundador de la BSAA. Chris ha dedicado su vida a erradicar las armas biológicas. Su fuerza física y liderazgo son legendarios, habiendo derrotado amenazas que parecían imposibles."
        imagen="/imagenes/chrisredfield.jpg"
        imagenModal="/imagenes/chriscompleto.webp"
        destrezas={"• Fuerza Bruta\n• Liderazgo\n• Manejo Armas Pesadas"}
        debilidades={"• Carga Emocional\n• Terquedad"}
        armasPoderes={"• Puños de Acero\n• Dragoon\n• Machete"}
      />

      <Carta
        id={3}
        nombre="💧 Jill Valentine"
        ataque={90}
        defensa={85}
        agilidad={95}
        iq={95}
        descripcionBreve="Especialista en desactivación de explosivos y ganzúas."
        historia="Una de las pocas supervivientes del equipo original S.T.A.R.S. Jill combina inteligencia aguda con una agilidad excepcional. Ha superado el control mental y virus letales, manteniéndose firme en su lucha."
        imagen="/imagenes/jillvalentine.jpg"
        imagenModal="/imagenes/jillcompleto.webp"
        destrezas={"• Maestra del Desbloqueo\n• Agilidad Extrema\n• Hacking"}
        debilidades={"• Secuelas P30\n• Sacrificio Personal"}
        armasPoderes={"• Samurai Edge\n• Ganzúa\n• Esquiva Maestra"}
      />

      <Carta
        id={4}
        nombre="🌑 Ada Wong"
        ataque={95}
        defensa={70}
        agilidad={90}
        iq={92}
        descripcionBreve="Espía corporativa envuelta en misterio."
        historia="Una mercenaria enigmática que trabaja para organizaciones secretas. Sus verdaderas lealtades son desconocidas, pero siempre cumple su misión con estilo y precisión letal."
        imagen="/imagenes/adawong.jpeg"
        imagenModal="/imagenes/adawongcompleto.webp"
        destrezas={"• Espionaje\n• Sigilo\n• Manipulación"}
        debilidades={"• Juega a dos bandos\n• Leon S. Kennedy"}
        armasPoderes={"• Ballesta\n• Gancho Táctico\n• Artes Marciales"}
      />

      <Carta
        id={5}
        nombre="🌬️ Claire Redfield"
        ataque={95}
        defensa={80}
        agilidad={88}
        iq={85}
        descripcionBreve="Activista de TerraSave y superviviente nata."
        historia="Hermana menor de Chris. Claire pasó de ser una civil buscando a su hermano a una defensora clave contra el bioterrorismo. Su empatía es su mayor fortaleza, protegiendo siempre a los inocentes."
        imagen="/imagenes/claireredfield.jpeg"
        imagenModal="/imagenes/claireredfieldcompleto.webp"
        destrezas={"• Supervivencia\n• Improvisación\n• Empatía"}
        debilidades={"• Protección de Menores\n• Civil (No Militar)"}
        armasPoderes={"• Lanzagranadas\n• Revolver SLS 60\n• Ingenio"}
      />

      <Carta
        id={6}
        nombre="🔮 Ethan Winters"
        ataque={100}
        defensa={85}
        agilidad={80}
        iq={87}
        descripcionBreve="Padre decidido impulsado por el amor a su familia."
        historia="Un arquitecto ordinario arrastrado al infierno. Infectado por el Moho, desarrolló capacidades regenerativas extraordinarias. Su voluntad inquebrantable lo lleva a enfrentar horrores inimaginables por salvar a su hija."
        imagen="/imagenes/ethanwinters.jpeg"
        imagenModal="/imagenes/ethancompleto.webp"
        destrezas={"• Regeneración (Moho)\n• Voluntad de Acero\n• Ingeniería"}
        debilidades={"• Entrenamiento Formal Limitado\n• Manos Sufridas"}
        armasPoderes={"• Cuerpo de Moho\n• Bloqueo Defensivo\n• Escopeta"}
      />

      <Carta
        id={7}
        nombre="🌑 Albert Wesker"
        ataque={125}
        defensa={100}
        agilidad={120}
        iq={100}
        descripcionBreve="Científico brillante con complejo de dios."
        historia="El antagonista definitivo. Wesker se inyectó un virus prototipo que le otorgó velocidad y fuerza sobrehumanas. Busca forzar la evolución de la humanidad mediante la selección natural viral."
        imagen="/imagenes/albertwesker.jpeg"
        imagenModal="/imagenes/albertweskercompleto.webp"
        destrezas={"• Velocidad Sónica\n• Fuerza Sobrehumana\n• Intelecto"}
        debilidades={"• Arrogancia\n• Dependencia de Suero"}
        armasPoderes={"• Ojos Virales\n• Dash Sónico\n• Artes Marciales"}
      />

      <Carta
        id={8}
        nombre="🌬️ Hunk"
        ataque={110}
        defensa={85}
        agilidad={80}
        iq={85}
        descripcionBreve="El legendario 'Mr. Death' de Umbrella."
        historia="Líder del equipo Alpha de la U.S.S. Es famoso por ser siempre el único superviviente de sus misiones. Frío, calculador y profesional, la misión es lo único que importa."
        imagen="/imagenes/hunk.jpeg"
        imagenModal="/imagenes/hunkcompleto.webp"
        destrezas={"• Ejecución 'Neck Breaker'\n• Sigilo\n• Resistencia"}
        debilidades={"• Trabajo en Equipo\n• Humanidad Nula"}
        armasPoderes={"• LE 5\n• Rompecuellos\n• Granadas Cegadoras"}
      />

      <Carta
        id={9}
        nombre="🌍 Carlos Oliveira"
        ataque={100}
        defensa={95}
        agilidad={78}
        iq={80}
        descripcionBreve="Mercenario de la U.B.C.S. con corazón de oro."
        historia="Enviado a Raccoon City como carne de cañón, Carlos demostró su valía protegiendo a Jill. Experto en armas pesadas y guerra de guerrillas, prioriza las vidas sobre las órdenes."
        imagen="/imagenes/carlosoliveira.jpg"
        imagenModal="/imagenes/carlosoliveiracompleto.webp"
        destrezas={"• Armas de Asalto\n• Combate Urbano\n• Lealtad"}
        debilidades={"• Improvisación\n• Desobedecer Órdenes"}
        armasPoderes={"• Rifle de Asalto CQBR\n• Puñetazo\n• Hombro Táctico"}
      />

      <Carta
        id={10}
        nombre="💉 Jake Muller"
        ataque={125}
        defensa={115}
        agilidad={110}
        iq={75}
        descripcionBreve="Mercenario con sangre maldita."
        historia="El hijo ilegítimo de Albert Wesker. Heredó la genética superior de su padre, otorgándole fuerza y agilidad inmensas sin perder su humanidad. De cínico mercenario a salvador del mundo."
        imagen="/imagenes/jakemuller.jpg"
        imagenModal="/imagenes/jakecompleto.webp"
        destrezas={"• Genética Wesker\n• Combate Mano a Mano\n• Inmunidad Viral"}
        debilidades={"• Cinismo\n• Precio Alto"}
        armasPoderes={"• Fuerza Bruta\n• Artes Marciales\n• Eleven-Seven"}
      />
    </div>
  )
}

function App() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat p-6"
      style={{ backgroundImage: "url('/imagenes/fondo.jpg')" }}>

      <nav className="flex justify-center gap-6 mb-8 bg-black/50 p-4 rounded-lg backdrop-blur-sm">
        <Link to="/" className="text-white hover:text-red-500 font-bold transition-colors">INICIO</Link>
        <Link to="/recomendaciones" className="text-white hover:text-red-500 font-bold transition-colors">RECOMENDACIONES</Link>
      </nav>

      <img className="w-160 h-auto mx-auto mb-2 block"
        src="/imagenes/logo.png"
        alt="logo"
      />
      <p className="text-center text-white mb-4">Nombre: Gabriel Solano</p>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recomendaciones" element={<Recomendaciones />} />
      </Routes>

    </div>
  )
}

export default App
