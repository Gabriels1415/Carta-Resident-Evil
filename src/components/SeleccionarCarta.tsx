import { useState } from "react"
import { Link } from "react-router-dom"; 
import type { CartaType } from "./Carta";
import Carta from "./Carta";


type Props = {
    mazo: CartaType[];
};

function SeleccionarCartas({ mazo }: Props) {
    const [cartaSeleccionada1, setCartaSeleccionada1] = useState<CartaType | null>(null);
    const [cartaSeleccionada2, setCartaSeleccionada2] = useState<CartaType | null>(null);
    const listoBatalla = cartaSeleccionada1 !== null && cartaSeleccionada2 !== null;

    const handleSeleccionarCarta = (carta: CartaType) => {
        const isSelect1 = cartaSeleccionada1?.idCard === carta.idCard;
        const isSelect2 = cartaSeleccionada2?.idCard === carta.idCard;

        if (isSelect1) {
            setCartaSeleccionada1(null);
            return;
        }
        if (isSelect2) {
            setCartaSeleccionada2(null);
            return;
        }

        if (!cartaSeleccionada1) {
            setCartaSeleccionada1(carta);
        } else if (!cartaSeleccionada2) {
            setCartaSeleccionada2(carta);
        }
    };

    return (
        <div className="contenedor-seleccion">
            <div className="grid-cartas">
                {mazo &&
                    mazo.map((carta) => {
                        const estaSeleccionada =
                            cartaSeleccionada1?.idCard === carta.idCard ||
                            cartaSeleccionada2?.idCard === carta.idCard;

                        return (
                            <div
                                onClick={() => handleSeleccionarCarta(carta)}
                                key={carta.idCard}
                            >
                                <Carta
                                    Carta={carta}
                                    color={carta.attributes.color}
                                    ancho={260}
                                    alto={360}
                                    seleccionada={estaSeleccionada}
                                    selectionMode={true}
                                />
                            </div>
                        );
                    })}
            </div>

            {listoBatalla ? (
                <Link to={`/campo-de-batalla/${cartaSeleccionada1?.idCard}/${cartaSeleccionada2?.idCard}`}>
                    <CustomBtn extraStyle="rounded-full" 
                    accion={() => {}} 
                    disabled={!listoBatalla}
                    >
                        <TbSwords size={28} />
                    </CustomBtn>
                </Link>
            )}
        </div>
    );
}

export default SeleccionarCartas;