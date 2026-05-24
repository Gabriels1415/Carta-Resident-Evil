import { useState } from "react"
import { Link } from "react-router-dom";
import type { CartaType } from "./Carta";
import Carta from "./Carta";

type Props = {
    mazo: CartaType[];
    loading: boolean;
};

function SeleccionarCartas({ mazo, loading }: Props) {
    const [cartaSeleccionada1, setCartaSeleccionada1] =
        useState<CartaType | null>(null);
    const [cartaSeleccionada2, setCartaSeleccionada2] =
        useState<CartaType | null>(null);
    const [listoBatalla, setListoBatalla] = useState<boolean>(false);

    const handleSeleccionarCarta = (carta: CartaType) => {
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

    return (
        <div className="flex flex-col items-center w-full max-w-6xl mx-auto">
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

                    <Link
                        to={`/campo-de-batalla/${cartaSeleccionada1?.idCard}/${cartaSeleccionada2?.idCard}`}
                    >
                        <button
                            className={`mt-8 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-300 border-2 ${
                                listoBatalla
                                    ? 'bg-red-700 hover:bg-red-600 border-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.6)] cursor-pointer'
                                    : 'bg-zinc-800 border-zinc-700 text-zinc-600 cursor-not-allowed opacity-50'
                            }`}
                            disabled={!listoBatalla}
                        >
                            ⚔️
                        </button>
                    </Link>
                </>
            )}
        </div>
    );
}

export default SeleccionarCartas;