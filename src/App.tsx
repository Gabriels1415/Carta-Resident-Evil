import './App.css'
import Carta from "./components/Carta"

function App() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat p-6"
      style={{ backgroundImage: "url('public/imagenes/fondo.jpg')" }}>
        
     <img className="w-160 h-auto mx-auto mb-2 block" 
     src="public/imagenes/logo.png" 
    alt="logo" 
/>
      <p className="text-center text-white mb-4">Nombre: Gabriel Solano</p>

      <div className="flex flex-wrap gap-30 justify-center">
        <Carta
          id={1}
          nombre="✨ Leon S. Kennedy"
          ataque={110}
          defensa={85}
          agilidad={85}
          iq={90}
          descripcion1="Carta tipo Luz ✨. 
	Experto en combate cuerpo a cuerpo (especialmente con cuchillo), tirador excepcional y estratega bajo presión.
Rasgos distintivos	Su característico peinado con flequillo y sus chaquetas de cuero."
          descripcion2="Leon, a la corta edad de 21 años, fue asignado para trabajar en el Departamento de Policía de Raccoon City (Raccoon Police Department abreviado R.P.D.) en su división, las Fuerzas de Policía Selectas (Select Police Forces o S.P.F.). Tras graduarse en la academia de policía, llegó a Raccoon City el 29 de septiembre de 1998 como su primer día de trabajo, pero se encuentra con una aterradora experiencia que cambiaría su vida para siempre."
          imagen="/imagenes/leonkennedy.jpg"
          imagenModal= "public/imagenes/leoncompleto.webp"
        />

        <Carta
          id={2}
          nombre="🌍 Chris Redfield"
          ataque={120}
          defensa={95}
          agilidad={75}
          iq={80}
          descripcion1="Carta de tipo tierra, fuerza bruta y resistencia sobrehumana."
          descripcion2="cr7"
          imagen="/imagenes/chrisredfield.jpg"
          imagenModal= "public/imagenes/chriscompleto.webp"
        />

        <Carta
          id={3}
          nombre="💧 Jill Valentine"
          ataque={90}
          defensa={85}
          agilidad={95}
          iq={95}
          descripcion1="Carta de tipo agua, especialista en tácticas y supervivencia." 
          descripcion2="cr7"
          imagen="/imagenes/jillvalentine.jpg"
          imagenModal= "public/imagenes/jillcompleto.webp"
        />

        <Carta
          id={4}
          nombre="🌑 Ada Wong"
          ataque={95}
          defensa={70}
          agilidad={90}
          iq={92}
          descripcion1="Carta de tipo sombra, sigilosa y letal con armas ligeras."
          descripcion2="cr7"
          imagen="/imagenes/adawong.jpeg"
          imagenModal= "public/imagenes/adawongcompleto.webp"
        />

        <Carta
          id={5}
          nombre="🌬️ Claire Redfield"
          ataque={95}
          defensa={80}
          agilidad={88}
          iq={85}
          descripcion1="Carta de tipo viento, ágil y valiente. Especialista en supervivencia y apoyo táctico."
          descripcion2="cr7"
          imagen="/imagenes/claireredfield.jpeg"
          imagenModal= "public/imagenes/claireredfieldcompleto.webp"
        />

        <Carta
          id={6}
          nombre="🔮 Ethan Winters"
          ataque={100}
          defensa={85}
          agilidad={80}
          iq={87}
          descripcion1="Carta de tipo espíritu, un sobreviviente marcado por el horror. Resiliente y con voluntad inquebrantable."
          descripcion2="cr7"
          imagen="/imagenes/ethanwinters.jpeg"
          imagenModal= "public/imagenes/ethancompleto.webp"
        />
        <Carta
         id={7}
        nombre="🌑 Albert Wesker"
        ataque={125}
        defensa={100}
        agilidad={120}
        iq={100}
        descripcion1="Carta de tipo sombra, un antagonista maestro de la manipulación. Su fuerza sobrehumana y astucia lo convierten en una amenaza constante."
        descripcion2="messi"
        imagen="/imagenes/albertwesker.jpeg"
        imagenModal= "public/imagenes/albertweskercompleto.webp"
       />

        <Carta
        id={8}
        nombre="🌬️ Hunk"
        ataque={110}
        defensa={85}
        agilidad={80}
        iq={85}
        descripcion1="Carta de tipo viento, el misterioso 'Grim Reaper' de Umbrella. Su agilidad y precisión táctica lo hacen casi invencible en operaciones encubiertas."
        descripcion2="cr7"
        imagen="/imagenes/hunk.jpeg"
        imagenModal= "public/imagenes/hunkcompleto.webp"
        />

        <Carta
      id={9}
      nombre="🌍 Carlos Oliveira"
      ataque={100}
      defensa={95}
      agilidad={78}
      iq={80}
      descripcion1="Carta de tipo tierra, un mercenario sudamericano de la U.B.C.S. con gran resistencia y habilidad en armas pesadas. Protector y leal, aporta fuerza y apoyo táctico."
      descripcion2="cr7"
      imagen="/imagenes/carlosoliveira.jpg"
      imagenModal= "public/imagenes/carlosoliveiracompleto.webp"
        />

<Carta
  id={10}
  nombre="💉 Jake Muller"
  ataque={125}
  defensa={115}
  agilidad={110}
  iq={75}
  descripcion1="Carta de tipo tierra/sangre. Posee capacidades físicas sobrehumanas y un estilo de combate cuerpo a cuerpo letal heredado de su linaje."
  descripcion2="Hijo del bio-terrorista Albert Wesker. Jake es un mercenario con una estructura genética única que lo hace inmune a los virus. A pesar de su actitud cínica, su fuerza y agilidad lo convierten en uno de los supervivientes más poderosos del post-Raccoon City."
  imagen="/imagenes/jakemuller.jpg"
  imagenModal="public/imagenes/jakecompleto.webp"
/>

      </div>
     </div>

  )
}
    

export default App

