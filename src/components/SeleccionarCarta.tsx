import { useState } from "react"
import { useNavigate } from "react-router-dom";
import type { CartaType } from "./Carta";
import Carta from "./Carta";

type Props = {
    mazo: CartaType[];
    loading: boolean;
};

function SeleccionarCartas({ mazo, loading }: Props) {
    const navigate = useNavigate();
    const [cartaSeleccionada1, setCartaSeleccionada1] =
        useState<CartaType | null>(null);
    const [cartaSeleccionada2, setCartaSeleccionada2] =
        useState<CartaType | null>(null);
    const [listoBatalla, setListoBatalla] = useState<boolean>(false);
    const [animando, setAnimando] = useState(false);

    const handleSeleccionarCarta = (carta: CartaType) => {
        if (animando) return; // Bloquear clics durante la animación

        const isSelected1 = cartaSeleccionada1?.idCard === carta.idCard;
        const isSelected2 = cartaSeleccionada2?.idCard === carta.idCard;

        if (isSelected1) {
            setCartaSeleccionada1(null);
            setListoBatalla(false);
            return;
        }

        if (isSelected2) {
            setCartaSeleccionada2(null);
            setListoBatalla(false);
            return;
        }

        if (!cartaSeleccionada1) {
            setCartaSeleccionada1(carta);
            if (cartaSeleccionada2) setListoBatalla(true);
        } else if (!cartaSeleccionada2) {
            setCartaSeleccionada2(carta);
            setListoBatalla(true);
        }
    };

    const iniciarBatalla = () => {
        if (!cartaSeleccionada1 || !cartaSeleccionada2) return;
        
        setAnimando(true);

        // Reproducir sonido de impacto. 
        const audio = new Audio("/audios/VS.mp3",);
        setTimeout(() => {
            audio.play().catch(e => console.log("Error al reproducir audio:", e));
        }, 500);

        setTimeout(() => {
            navigate(`/campo-de-batalla/${cartaSeleccionada1.idCard}/${cartaSeleccionada2.idCard}`);
        }, 3500);
    };

    return (
        <div className="flex flex-col items-center w-full max-w-6xl mx-auto">
            {/* Animación VS a Pantalla Completa */}
            {animando && cartaSeleccionada1 && cartaSeleccionada2 && (
                <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex items-center justify-center overflow-hidden anim-shake anim-fade-out">
                    <div className="explosion-bg"></div>
                    <div className="fire-effect"></div>
                    <div className="lightning-tl"></div>
                    <div className="lightning-br"></div>
                    
                    <div className="relative w-full h-full max-w-7xl mx-auto flex items-center justify-center">
                        {/* Carta 1 - Viene de Arriba, se arrastra a la izquierda, sale por abajo */}
                        <div className="absolute left-[5%] md:left-[15%] anim-card-1 z-20">
                            <Carta carta={cartaSeleccionada1} ancho={300} alto={420} selectionMode={true} />
                        </div>

                        {/* VS - En el medio */}
                        <div className="absolute z-30 anim-vs flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-[120px] md:text-[200px] font-black italic tracking-tighter">VS</span>
                        </div>

                        {/* Carta 2 - Viene de Abajo, se arrastra a la derecha, sale por arriba */}
                        <div className="absolute right-[5%] md:right-[15%] anim-card-2 z-20">
                            <Carta carta={cartaSeleccionada2} ancho={300} alto={420} selectionMode={true} />
                        </div>
                    </div>
                </div>
            )}

            {loading ? (
                <p className="text-red-500 font-bold text-2xl animate-pulse mt-20 uppercase tracking-widest">
                    Cargando mazo...
                </p>
            ) : (
                <>
                    <div className="flex flex-wrap gap-6 justify-center w-full">
                        {!loading &&
                            mazo &&
                            mazo.map((carta) => {
                                return (
                                    <div
                                        onClick={() => handleSeleccionarCarta(carta)}
                                        key={carta.idCard}
                                    >
                                        <Carta
                                            carta={carta}
                                            color={carta.attributes.color}
                                            ancho={260}
                                            alto={360}
                                            seleccionada={
                                                cartaSeleccionada1?.idCard === carta.idCard ||
                                                cartaSeleccionada2?.idCard === carta.idCard
                                            }
                                            selectionMode={true}
                                        />
                                    </div>
                                );
                            })}
                    </div>

                    <button
                        onClick={iniciarBatalla}
                        className={`mt-8 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-300 border-2 ${
                            listoBatalla && !animando
                                ? 'bg-red-700 hover:bg-red-600 border-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.6)] cursor-pointer'
                                : 'bg-zinc-800 border-zinc-700 text-zinc-600 cursor-not-allowed opacity-50'
                        }`}
                        disabled={!listoBatalla || animando}
                    >
                        ⚔️
                    </button>
                </>
            )}
        </div>
    );
}

export default SeleccionarCartas;