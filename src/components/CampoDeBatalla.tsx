import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { CartaType } from './Carta';
import Carta from './Carta';
import LogBatalla from './LogBatalla';

// Busca una carta por ID directamente en la API
const getCarta = async (id: string): Promise<CartaType> => {
    const urlAPI = `https://educapi-v2.onrender.com/card/${id}`;
    const respuesta = await fetch(urlAPI, {
        method: 'GET',
        headers: {
            usersecretpasskey: 'Gabr594945NO',
        },
    });

    if (!respuesta.ok) {
        throw new Error(`No se pudo cargar la carta ${id}`);
    }

    const objeto = await respuesta.json();
    const carta = objeto.data?.[0];

    if (!carta) {
        throw new Error(`No se encontro la carta ${id}`);
    }

    return carta;
};

function CampoDeBatalla() {
    const { id1, id2 } = useParams();

    const [carta1, setCarta1] = useState<CartaType | null>(null);
    const [carta2, setCarta2] = useState<CartaType | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const cargarCartas = async () => {
            setLoading(true);
            setError(null);
            try {
                if (id1 && id2) {
                    const [c1, c2] = await Promise.all([getCarta(id1), getCarta(id2)]);
                    setCarta1(c1);
                    setCarta2(c2);
                }
            } catch (err: any) {
                setError(err.message || 'Error al cargar las cartas');
            } finally {
                setLoading(false);
            }
        };
        cargarCartas();
    }, [id1, id2]);

    return (
        <div className='flex flex-col items-center justify-center flex-1'>
            {loading && <p className="text-red-500 font-bold text-2xl animate-pulse mt-20 uppercase tracking-widest">Cargando ...</p>}
            {error && <p className="text-red-400 font-bold text-xl mt-10">{error}</p>}

            {!loading && !error && carta1 && carta2 && (
                <div className='flex items-center justify-center gap-12'>
                    <div className='relative z-10'>
                        <Carta
                            carta={carta1}
                            color={carta1.attributes?.color ?? '#252120'}
                            ancho={260}
                            alto={360}
                            selectionMode={true}
                        />
                    </div>
                    <p className='text-7xl font-bold text-white drop-shadow-[0_0_20px_rgba(255,0,0,0.5)]'>VS</p>
                    <div className='relative z-10'>
                        <Carta
                            carta={carta2}
                            color={carta2.attributes?.color ?? '#252120'}
                            ancho={260}
                            alto={360}
                            selectionMode={true}
                        />
                    </div>
                </div>
            )}

            {carta1 && carta2 && (
                <div className="mt-8 w-full max-w-2xl">
                    <LogBatalla turno={1} p1={carta1} p2={carta2} damage={100} />
                </div>
            )}
        </div>
    );
}

export default CampoDeBatalla;
