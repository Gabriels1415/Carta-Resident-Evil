import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { CartaType } from './Carta';
import Carta from './Carta';
import LogsBatalla from './LogBatalla'; 

const BotonBatalla = ({ children, accion, disabled, extraStyle }: any) => (
    <button
        onClick={accion}
        disabled={disabled}
        className={`px-4 py-2 text-white font-semibold transition-all ${extraStyle} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
    >
        {children}
    </button>
);

// --- Tipos e Interfaces ---
export type Jugador = 'p1' | 'p2';

export interface LogEntry {
    turno: number;
    atacante: string;
    defensor: string;
    damage: number;
    vidaRestante: number;
}

// --- Funciones Auxiliares ---
const getCarta = async (id: string): Promise<CartaType> => {
    const urlAPI = `https://educapi-v2.onrender.com/card/${id}`;
    const respuesta = await fetch(urlAPI, {
        method: 'GET',
        headers: {
            usersecretpasskey: 'Gabr594945NO',
        },
    });

    if (!respuesta.ok) throw new Error(`No se pudo cargar la carta ${id}`);
    const objeto = await respuesta.json();
    const carta = objeto.data?.[0];
    if (!carta) throw new Error(`No se encontró la carta ${id}`);
    
    return carta;
};

const checkStalemate = (c1: CartaType, c2: CartaType): boolean => {
    return c1.attack <= c2.defense && c2.attack <= c1.defense;
};

const calcularDanio = (atacante: CartaType, defensor: CartaType): number => {
    const danio = atacante.attack - defensor.defense;
    return danio > 0 ? danio : 0;
};

// --- Componente Principal ---
function CampoDeBatalla() {
    const { id1, id2 } = useParams<{ id1: string; id2: string }>();
    const navigate = useNavigate();

    // Estados
    const [carta1, setCarta1] = useState<CartaType | null>(null);
    const [carta2, setCarta2] = useState<CartaType | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [turno, setTurno] = useState<number>(1);
    const [cartaAtacando, setCartaAtacando] = useState<Jugador | null>(null);
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [winner, setWinner] = useState<Jugador | null>(null);
    const [draw, setDraw] = useState<boolean>(false);
    const [autoBattle, setAutoBattle] = useState<boolean>(false);
    
    const timeoutRef = useRef<number | null>(null);
    const jugadorTurno: Jugador = turno % 2 !== 0 ? 'p1' : 'p2';

    const volverASeleccion = () => navigate('/');

    const toggleAutoBattle = () => {
        if (gameOver) return;
        setAutoBattle(prev => !prev);
    };

    // Función extra añadida para el botón "Rendirse"
    const rendirse = () => {
        setGameOver(true);
        setWinner(jugadorTurno === 'p1' ? 'p2' : 'p1'); // Gana el oponente
    };

    // Efecto de Auto Battle
    useEffect(() => {
        if (!autoBattle) return;
        if (gameOver || cartaAtacando || !carta1 || !carta2) return;

        timeoutRef.current = setTimeout(() => {
            if (!gameOver && !cartaAtacando) {
                siguienteTurno();
            }
        }, 500);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [autoBattle, gameOver, cartaAtacando, carta1, carta2, turno]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    // Carga inicial
    useEffect(() => {
        if (!id1 || !id2) {
            setCarta1(null);
            setCarta2(null);
            return;
        }

        setLoading(true);
        setError(null);
        setTurno(1);
        setCartaAtacando(null);
        setLogs([]);
        setGameOver(false);
        setWinner(null);
        setDraw(false);
        setAutoBattle(false);

        const cargarCartas = async () => {
            try {
                const [nc1, nc2] = await Promise.all([getCarta(id1), getCarta(id2)]);
                setCarta1(nc1);
                setCarta2(nc2);
                
                if (checkStalemate(nc1, nc2)) {
                    setDraw(true);
                    setGameOver(true);
                    setWinner(null);
                }
            } catch (err: any) {
                setError(err.message || "No se pudieron cargar las cartas");
            } finally {
                setLoading(false);
            }
        };

        cargarCartas();
    }, [id1, id2]);

    const ejecutarAtaque = (): boolean => {
        if (!carta1 || !carta2) return false;

        const atacante = jugadorTurno === "p1" ? carta1 : carta2;
        const defensor = jugadorTurno === "p1" ? carta2 : carta1;
        const damage = calcularDanio(atacante, defensor);
        const nuevaVida = Math.max(0, defensor.lifePoints - damage);

        if (jugadorTurno === "p1") {
            setCarta2({ ...carta2, lifePoints: nuevaVida });
        } else {
            setCarta1({ ...carta1, lifePoints: nuevaVida });
        }

        setLogs((prev) => [
            ...prev,
            {
                turno,
                atacante: atacante.name,
                defensor: defensor.name,
                damage,
                vidaRestante: nuevaVida,
            },
        ]);

        if (nuevaVida <= 0) {
            setGameOver(true);
            setWinner(jugadorTurno);
            return true;
        }
        return false;
    };

    const finalizarAnimacionGolpe = () => {
        setCartaAtacando(null);
        if (!gameOver) setTurno((t) => t + 1);
    };

    const siguienteTurno = () => {
        if (!carta1 || !carta2 || cartaAtacando || gameOver) return;
        
        const terminado = ejecutarAtaque();
        
        if (!terminado) {
            setCartaAtacando(jugadorTurno);
            setTimeout(() => {
                finalizarAnimacionGolpe();
            }, 600);
        } else {
            setAutoBattle(false);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center flex-1 w-full min-h-screen bg-neutral-900 text-white p-6'>
            {loading && <p className="text-red-500 font-bold text-2xl mt-20">Cargando ...</p>}
            {error && <p className="text-red-400 font-bold text-xl mt-10">{error}</p>}

            {!loading && !error && carta1 && carta2 && (
                <div className='flex flex-col items-center gap-8 w-full'>
                    
                    {/* Botonera basada exactamente en tu lámina */}
                    <div className="flex items-center justify-center gap-4 mt-4 w-full">
                        {carta1 && carta2 && !gameOver && (
                            <p className="mr-4 text-xl font-bold">
                                Turno {turno}: {jugadorTurno === 'p1' ? carta1.name : carta2.name}
                            </p>
                        )}
                        
                        <BotonBatalla
                            extraStyle="rounded-full w-[20%] bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 disabled:opacity-50"
                            accion={siguienteTurno}
                            disabled={!carta1 || !carta2 || Boolean(cartaAtacando) || gameOver || autoBattle}
                        >
                            <p>Siguiente Turno</p>
                        </BotonBatalla>

                        <BotonBatalla
                            extraStyle="rounded-full w-[20%] bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 disabled:opacity-50"
                            accion={toggleAutoBattle}
                            disabled={!carta1 || !carta2 || gameOver || Boolean(cartaAtacando)}
                        >
                            <p>{autoBattle ? "Detener" : "Auto (FF)"}</p>
                        </BotonBatalla>

                        <BotonBatalla 
                            extraStyle="rounded-full w-[120px] bg-red-600 hover:bg-red-700 text-white px-4 py-2 disabled:opacity-50" 
                            accion={rendirse}
                            disabled={gameOver}
                        >
                            <p>Rendirse</p>
                        </BotonBatalla>
                    </div>

                    <div className='flex items-center justify-center gap-12 w-full max-w-5xl mt-6'>
                        
                        {/* Carta P1 */}
                        <div className={`relative transition-transform duration-300 ${cartaAtacando === 'p1' ? 'scale-110 translate-x-4 drop-shadow-[0_0_25px_rgba(239,68,68,0.7)]' : ''}`}>
                            <Carta carta={carta1} color={carta1.attributes?.color ?? '#252120'} ancho={260} alto={360} selectionMode={true} />
                            <p className="text-center mt-2 font-semibold text-green-400">Vida: {carta1.lifePoints}</p>
                        </div>
                        
                        {/* Nuevo componente de Logs de Batalla en el centro */}
                        <div className="min-w-[320px] flex justify-center">
                            <LogsBatalla logs={logs} turnoActual={turno} jugadorTurno={jugadorTurno} />
                        </div>

                        {/* Carta P2 */}
                        <div className={`relative transition-transform duration-300 ${cartaAtacando === 'p2' ? 'scale-110 -translate-x-4 drop-shadow-[0_0_25px_rgba(239,68,68,0.7)]' : ''}`}>
                            <Carta carta={carta2} color={carta2.attributes?.color ?? '#252120'} ancho={260} alto={360} selectionMode={true} />
                            <p className="text-center mt-2 font-semibold text-green-400">Vida: {carta2.lifePoints}</p>
                        </div>
                    </div>

                    {/* --- Modales de Fin de Juego --- */}
                    {gameOver && draw && (
                        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                            <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-8 text-center max-w-md w-full">
                                <h2 className="text-4xl font-bold mb-4 text-yellow-500">🤝 Empate Técnico</h2>
                                <p className="text-lg mb-4 text-neutral-300">Ninguna carta puede hacer daño a la otra.</p>
                                <BotonBatalla extraStyle="rounded-full bg-blue-600 px-6 py-3 w-full text-white" accion={volverASeleccion}>
                                    <p>Seleccionar nuevas cartas</p>
                                </BotonBatalla>
                            </div>
                        </div>
                    )}

                    {gameOver && !draw && winner && (
                        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                            <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-8 text-center max-w-md w-full">
                                <h2 className="text-4xl font-black mb-4 text-green-400">🏆 Victoria 🏆</h2>
                                <p className="text-2xl mb-8 text-white font-semibold">
                                    ¡{winner === 'p1' ? carta1.name : carta2.name} ha ganado!
                                </p>
                                <BotonBatalla extraStyle="rounded-full bg-blue-600 px-6 py-3 w-full text-white" accion={volverASeleccion}>
                                    <p>Volver a Selección</p>
                                </BotonBatalla>
                            </div>
                        </div>
                    )}

                </div>
            )}
        </div>
    );
}

export default CampoDeBatalla;