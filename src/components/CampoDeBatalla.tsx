// ============================================================
//  CampoDeBatalla.tsx
//  Vista principal del combate por turnos entre dos cartas.
//  Jugador (P1) vs. IA (P2)
// ============================================================


// ─────────────────────────────────────────────
//  1. IMPORTS
// ─────────────────────────────────────────────
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { CartaType } from './Carta';
import Carta from './Carta';
import LogsBatalla from './LogBatalla';


// ─────────────────────────────────────────────
//  2. TIPOS E INTERFACES
// ─────────────────────────────────────────────
export type Jugador = 'p1' | 'p2';
export type TipoAccion = 'basico' | 'especial' | 'curar';
export type TipoLog = 'ataque' | 'especial' | 'curar';

export interface LogEntry {
    turno: number;
    tipo: TipoLog;
    atacante: string;
    defensor?: string;
    damage?: number;
    curacion?: number;
    nombreArma?: string;
    vidaRestante: number;
    esCritico?: boolean;
}

interface Cooldowns {
    especial: number;
    curar: number;
}


// ─────────────────────────────────────────────
//  3. CONSTANTES DE JUEGO
// ─────────────────────────────────────────────
const COOLDOWN_ESPECIAL = 6;
const COOLDOWN_CURAR = 8;
const BONUS_ESPECIAL = 1.50;


// ─────────────────────────────────────────────
//  4. RUTAS DE AUDIO
//  Todos los archivos de sonido usados en el combate.
// ─────────────────────────────────────────────
const AUDIO = {
    /** Música de fondo del combate (en loop) */
    bgm: '/audios/Pelea.mp3',
    /** Sonido de victoria / K.O. */
    ko: '/audios/KO.mp3',
    /** Sonido al rendirse / abortar */
    rendicion: '/audios/Agarrenlo.mp3',
    /** Sonido de curación */
    curacion: '/audios/Curacion.mp3',
    /** Hover sobre un botón de acción */
    hover: '/audios/Elegir.mp3',
    /** Click para confirmar una acción */
    confirmar: '/audios/Seleccionar.mp3',
} as const;


// ─────────────────────────────────────────────
//  5. HELPERS DE AUDIO
// ─────────────────────────────────────────────

/** Reproduce un sonido de interfaz puntual (no en loop). */
const reproducirSonidoUI = (ruta: string, volumen: number = 1.0) => {
    const audio = new Audio(ruta);
    audio.volume = volumen;
    audio.play().catch(e => console.log('Error reproduciendo sonido UI:', e));
};


// ─────────────────────────────────────────────
//  6. HELPERS DE LÓGICA DE COMBATE
// ─────────────────────────────────────────────

/** Obtiene los datos de una carta desde la API. */
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

/**
 * Calcula el daño de un ataque.
 * Incluye probabilidad de golpe crítico (20 %).
 */
const calcularDanio = (
    atacante: CartaType,
    defensor: CartaType,
    multiplicador = 1
): { danio: number; esCritico: boolean } => {
    const esCritico = Math.random() < 0.20;
    const defensa = defensor.defense > 0 ? defensor.defense : 1;
    let danioBase = (atacante.attack / defensa) * 10 * multiplicador;
    let danioFinal = esCritico ? danioBase * 1.5 : danioBase;

    return {
        danio: Math.round(danioFinal),
        esCritico,
    };
};

/**
 * Decide la acción de la IA según su estado actual.
 * Prioriza curar si la vida es baja, luego ataque especial al azar.
 */
const elegirAccionAI = (
    vida: number,
    maxVida: number,
    cd: Cooldowns
): TipoAccion => {
    const porcentajeVida = vida / maxVida;
    if (cd.curar === 0 && porcentajeVida <= 0.35) return 'curar';
    if (cd.especial === 0 && Math.random() < 0.4) return 'especial';
    return 'basico';
};


// ─────────────────────────────────────────────
//  7. SUB-COMPONENTES EXTERNOS
//  (no necesitan acceso al estado del componente principal)
// ─────────────────────────────────────────────

/** Botón genérico de la pantalla de batalla (Abortar, Volver, etc.). */
const BotonBatalla = ({ children, accion, disabled, extraStyle }: any) => (
    <button
        onClick={accion}
        disabled={disabled}
        className={`px-4 py-2 font-bold tracking-widest uppercase transition-all border-b-4 ${extraStyle} ${disabled
            ? 'opacity-50 cursor-not-allowed border-zinc-800'
            : 'hover:translate-y-1 hover:border-b-0 mt-1 mb-[3px] active:scale-95 shadow-[0_0_15px_rgba(255,0,0,0.2)] hover:shadow-[0_0_25px_rgba(255,0,0,0.6)]'
            }`}
    >
        {children}
    </button>
);


// ─────────────────────────────────────────────
//  8. COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────
function CampoDeBatalla() {

    // ── 8.1  Params y navegación ─────────────
    const { id1, id2 } = useParams<{ id1: string; id2: string }>();
    const navigate = useNavigate();


    // ── 8.2  Estado del componente ───────────

    // Cartas y carga
    const [carta1, setCarta1] = useState<CartaType | null>(null);
    const [carta2, setCarta2] = useState<CartaType | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Vida máxima (se fija al cargar)
    const [maxVidaP1, setMaxVidaP1] = useState<number>(1);
    const [maxVidaP2, setMaxVidaP2] = useState<number>(1);

    // Flujo de la batalla
    const [turno, setTurno] = useState<number>(1);
    const [cartaAtacando, setCartaAtacando] = useState<Jugador | null>(null);
    const [cooldowns, setCooldowns] = useState<{ p1: Cooldowns; p2: Cooldowns }>({
        p1: { especial: 0, curar: 0 },
        p2: { especial: 0, curar: 0 },
    });

    // Animaciones de cartas
    const [cartaRecibiendoDano, setCartaRecibiendoDano] = useState<Jugador | null>(null);
    const [cartaCurandose, setCartaCurandose] = useState<Jugador | null>(null);

    // Fin de partida
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [winner, setWinner] = useState<Jugador | null>(null);
    const [draw, setDraw] = useState<boolean>(false);
    const [motivoFinal, setMotivoFinal] = useState<'victoria' | 'rendicion' | null>(null);

    // UI
    const [menuAbierto, setMenuAbierto] = useState<boolean>(false);
    const [logs, setLogs] = useState<LogEntry[]>([]);

    // Refs
    const timeoutRef = useRef<number | null>(null);
    const bgmRef = useRef<HTMLAudioElement | null>(null);


    // ── 8.3  Derivados ───────────────────────
    const jugadorTurno: Jugador = turno % 2 !== 0 ? 'p1' : 'p2';
    const nombreArmaP1 = carta1?.attributes?.armaFavorita || 'Ataque Especial';


    // ─────────────────────────────────────────────
    //  9. EFFECTS
    // ─────────────────────────────────────────────

    /** Limpieza del timeout al desmontar el componente. */
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    /** Carga las dos cartas desde la API cuando cambian los IDs. */
    useEffect(() => {
        if (!id1 || !id2) {
            setCarta1(null);
            setCarta2(null);
            return;
        }

        // Reiniciamos todo el estado de la batalla
        setLoading(true);
        setError(null);
        setTurno(1);
        setCartaAtacando(null);
        setCartaRecibiendoDano(null);
        setCartaCurandose(null);
        setLogs([]);
        setGameOver(false);
        setWinner(null);
        setDraw(false);
        setMenuAbierto(false);
        setCooldowns({ p1: { especial: 0, curar: 0 }, p2: { especial: 0, curar: 0 } });

        const cargarCartas = async () => {
            try {
                const [nc1, nc2] = await Promise.all([getCarta(id1), getCarta(id2)]);
                setCarta1(nc1);
                setCarta2(nc2);
                setMaxVidaP1(nc1.lifePoints || 1);
                setMaxVidaP2(nc2.lifePoints || 1);
            } catch (err: any) {
                setError(err.message || 'No se pudieron cargar las cartas');
            } finally {
                setLoading(false);
            }
        };

        cargarCartas();
    }, [id1, id2]);

    /** Controla la música de fondo: la pone/pausa según el estado de la batalla. */
    useEffect(() => {
        if (!bgmRef.current) {
            bgmRef.current = new Audio(AUDIO.bgm);
            bgmRef.current.volume = 0.017;
            bgmRef.current.loop = true;
        }

        if (!gameOver && !loading && carta1 && carta2) {
            bgmRef.current.play().catch(e => console.log('El navegador bloqueó el autoplay:', e));
        } else if (gameOver && bgmRef.current) {
            bgmRef.current.pause();
        }

        return () => {
            if (bgmRef.current) {
                bgmRef.current.pause();
            }
        };
    }, [gameOver, loading, carta1, carta2]);

    /** Reproduce el sonido de K.O. cuando hay un ganador (no si fue rendición). */
    useEffect(() => {
        // Si fue rendición, NO reproducimos el audio de K.O.
        if (gameOver && motivoFinal === 'rendicion') return;

        let audioVictoria: HTMLAudioElement | null = null;
        if (gameOver && !draw && winner) {
            audioVictoria = new Audio(AUDIO.ko);
            audioVictoria.volume = 0.05;
            audioVictoria.play().catch(e => console.log('Error audio:', e));
        }
        return () => {
            if (audioVictoria) {
                audioVictoria.pause();
                audioVictoria.currentTime = 0;
            }
        };
    }, [gameOver, draw, winner, motivoFinal]);

    /** Turno automático de la IA (P2): elige y ejecuta su acción con un pequeño delay. */
    useEffect(() => {
        if (gameOver || cartaAtacando || !carta1 || !carta2) return;
        if (jugadorTurno !== 'p2') return;

        timeoutRef.current = setTimeout(() => {
            const accion = elegirAccionAI(carta2.lifePoints, maxVidaP2, cooldowns.p2);
            ejecutarAccion(accion);
        }, 800);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [jugadorTurno, turno, gameOver, cartaAtacando, carta1, carta2, cooldowns.p2, maxVidaP2]);


    // ─────────────────────────────────────────────
    //  10. HANDLERS / LÓGICA DE COMBATE
    // ─────────────────────────────────────────────

    /** Aplica el cooldown correspondiente luego de usar una habilidad. */
    const aplicarCooldown = (jugador: Jugador, accion: TipoAccion) => {
        if (accion === 'especial') {
            setCooldowns(prev => ({
                ...prev,
                [jugador]: { ...prev[jugador], especial: COOLDOWN_ESPECIAL },
            }));
        } else if (accion === 'curar') {
            setCooldowns(prev => ({
                ...prev,
                [jugador]: { ...prev[jugador], curar: COOLDOWN_CURAR },
            }));
        }
    };

    /** Reduce en 1 los cooldowns del jugador al final de su turno. */
    const tickCooldowns = (jugador: Jugador) => {
        setCooldowns(prev => ({
            ...prev,
            [jugador]: {
                especial: Math.max(0, prev[jugador].especial - 1),
                curar: Math.max(0, prev[jugador].curar - 1),
            },
        }));
    };

    /**
     * Ejecuta el daño de un ataque básico o especial.
     * Retorna `true` si el defensor llegó a 0 de vida (fin de partida).
     */
    const ejecutarAtaque = (jugador: Jugador, accion: TipoAccion): boolean => {
        if (!carta1 || !carta2) return false;

        const atacante = jugador === 'p1' ? carta1 : carta2;
        const defensor = jugador === 'p1' ? carta2 : carta1;
        const multiplicador = accion === 'especial' ? BONUS_ESPECIAL : 1;
        const { danio: damage, esCritico } = calcularDanio(atacante, defensor, multiplicador);
        const nuevaVida = Math.max(0, defensor.lifePoints - damage);
        const nombreArma = atacante.attributes?.armaFavorita || 'Ataque Especial';

        if (jugador === 'p1') {
            setCarta2({ ...carta2, lifePoints: nuevaVida });
            setCartaRecibiendoDano('p2');
        } else {
            setCarta1({ ...carta1, lifePoints: nuevaVida });
            setCartaRecibiendoDano('p1');
        }

        setLogs(prev => [
            ...prev,
            {
                turno,
                tipo: accion === 'especial' ? 'especial' : 'ataque',
                atacante: atacante.name,
                defensor: defensor.name,
                damage,
                nombreArma: accion === 'especial' ? nombreArma : undefined,
                vidaRestante: nuevaVida,
                esCritico,
            },
        ]);

        if (nuevaVida <= 0) {
            setGameOver(true);
            setWinner(jugador);
            return true;
        }
        return false;
    };

    /**
     * Recupera el 20 % de la vida máxima del jugador indicado.
     * Siempre retorna `false` (curar no termina la partida).
     */
    const ejecutarCuracion = (jugador: Jugador): boolean => {
        if (!carta1 || !carta2) return false;

        const carta = jugador === 'p1' ? carta1 : carta2;
        const maxVida = jugador === 'p1' ? maxVidaP1 : maxVidaP2;
        const curacion = Math.round(maxVida * 0.20);
        const nuevaVida = Math.min(maxVida, carta.lifePoints + curacion);

        if (jugador === 'p1') {
            setCarta1({ ...carta1, lifePoints: nuevaVida });
        } else {
            setCarta2({ ...carta2, lifePoints: nuevaVida });
        }

        setCartaCurandose(jugador);

        setLogs(prev => [
            ...prev,
            {
                turno,
                tipo: 'curar',
                atacante: carta.name,
                curacion,
                vidaRestante: nuevaVida,
            },
        ]);

        return false;
    };

    /** Finaliza la animación de un turno y avanza al siguiente. */
    const finalizarAnimacionGolpe = (jugador: Jugador, accion: TipoAccion) => {
        tickCooldowns(jugador);
        aplicarCooldown(jugador, accion);
        setCartaAtacando(null);
        setCartaRecibiendoDano(null);
        setCartaCurandose(null);
        if (!gameOver) setTurno(t => t + 1);
    };

    /**
     * Punto de entrada para CUALQUIER acción (básico, especial, curar).
     * Valida cooldowns, activa animaciones y despacha la lógica correcta.
     */
    const ejecutarAccion = (accion: TipoAccion) => {
        if (!carta1 || !carta2 || cartaAtacando || gameOver) return;

        const cd = cooldowns[jugadorTurno];
        if (accion === 'especial' && cd.especial > 0) return;
        if (accion === 'curar' && cd.curar > 0) return;

        setCartaAtacando(jugadorTurno);
        setMenuAbierto(false);

        setTimeout(() => {


            if (accion === 'curar') {
                ejecutarCuracion(jugadorTurno);
            } else {
                ejecutarAtaque(jugadorTurno, accion);
            }

            setTimeout(() => {
                finalizarAnimacionGolpe(jugadorTurno, accion);
            }, 500);
        }, 300);
    };

    /** Abre el menú de acciones del jugador (solo en turno de P1). */
    const abrirMenuAcciones = () => {
        if (jugadorTurno !== 'p1' || cartaAtacando || gameOver) return;
        setMenuAbierto(true);
    };

    /** Navega de regreso a la selección de cartas. */
    const volverASeleccion = () => navigate('/');

    /** El jugador (P1) se rinde: el oponente con más vida gana. */
    const rendirse = () => {
        if (!carta1 || !carta2) return;

        // Marcamos que terminó por rendición
        setMotivoFinal('rendicion');

        // Reproducimos SOLO el sonido de rendición
        const audioRendirse = new Audio(AUDIO.rendicion);
        audioRendirse.volume = 0.5;
        audioRendirse.play().catch(e => console.log(e));

        const ganador: Jugador = carta1.lifePoints >= carta2.lifePoints ? 'p1' : 'p2';
        setGameOver(true);
        setWinner(ganador);
    };


    // ─────────────────────────────────────────────
    //  11. SUB-COMPONENTES INTERNOS
    //  (definidos aquí porque necesitan acceso al estado)
    // ─────────────────────────────────────────────

    /** Muestra la barra de vida con colores según el porcentaje restante. */
    const BarraVida = ({ actual, maximo }: { actual: number; maximo: number }) => {
        const porcentaje = Math.max(0, Math.min(100, (actual / maximo) * 100));

        let colorBarra = 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]';
        let statusText = 'BIEN';

        if (porcentaje <= 20) {
            colorBarra = 'bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)] animate-pulse';
            statusText = 'PELIGRO';
        } else if (porcentaje <= 50) {
            colorBarra = 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]';
            statusText = 'CRÍTICO';
        }

        return (
            <div className="w-[260px] mt-4 flex flex-col gap-1">
                <div className="flex justify-between text-xs font-bold font-mono tracking-widest px-1">
                    <span className={porcentaje <= 20 ? 'text-red-500' : porcentaje <= 50 ? 'text-orange-400' : 'text-green-400'}>
                        {statusText}
                    </span>
                    <span className="text-zinc-400">{actual} / {maximo}</span>
                </div>
                <div className="w-full bg-black border-2 border-zinc-700 h-6 relative overflow-hidden rounded-sm p-[2px]">
                    <div
                        className={`h-full transition-all duration-500 ease-out ${colorBarra}`}
                        style={{ width: `${porcentaje}%` }}
                    />
                </div>
            </div>
        );
    };

    /**
     * Botón del menú de acciones con colores temáticos,
     * sublabel informativo y soporte para efecto hover de audio.
     */
    const BotonAccion = ({
        label,
        sublabel,
        onClick,
        onHover,
        disabled,
        color = 'red',
    }: {
        label: string;
        sublabel?: string;
        onClick: () => void;
        onHover?: () => void;
        disabled?: boolean;
        color?: 'red' | 'green' | 'orange';
    }) => {
        const colores = {
            red: 'bg-red-800    border-red-600    hover:bg-red-700',
            green: 'bg-green-800  border-green-600  hover:bg-green-700',
            orange: 'bg-orange-800 border-orange-600 hover:bg-orange-700',
        };

        return (
            <button
                onClick={onClick}
                onMouseEnter={!disabled ? onHover : undefined}
                disabled={disabled}
                className={`w-full px-6 py-4 font-bold tracking-widest uppercase transition-all border-b-4 text-left ${colores[color]} ${disabled
                    ? 'opacity-40 cursor-not-allowed border-zinc-800'
                    : 'hover:translate-y-1 hover:border-b-0 active:scale-95'
                    }`}
            >
                <span className="block text-white">{label}</span>
                {sublabel && <span className="block text-xs text-zinc-300 mt-1 normal-case tracking-normal">{sublabel}</span>}
            </button>
        );
    };


    // ─────────────────────────────────────────────
    //  12. RENDER
    // ─────────────────────────────────────────────
    return (
        <div className='flex flex-col items-center justify-center flex-1 w-full min-h-screen text-white p-6 relative overflow-hidden backdrop-blur-sm bg-black/10'>

            <div className="relative z-10 flex flex-col items-center w-full">

                {/* ── Estados de carga y error ── */}
                {loading && <p className="text-red-500 font-bold text-2xl mt-20 animate-pulse">Cargando ...</p>}
                {error && <p className="text-red-400 font-bold text-xl mt-10 bg-red-900/30 p-4 border border-red-500">{error}</p>}

                {/* ── Contenido principal (solo si las cartas están listas) ── */}
                {!loading && !error && carta1 && carta2 && (
                    <div className='flex flex-col items-center gap-8 w-full'>

                        {/* ── Panel de turno y botón Abortar ── */}
                        <div className="flex flex-col items-center gap-4 mt-2 w-full bg-black/60 p-6 rounded-xl border border-zinc-800 shadow-[0_0_30px_rgba(0,0,0,0.8)] max-w-3xl backdrop-blur-sm">
                            {!gameOver && (
                                <div className="text-center mb-2">
                                    <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase mb-1">Turno Actual</p>
                                    <p className="text-2xl font-black text-red-500 tracking-wider">
                                        [{turno.toString().padStart(2, '0')}] {jugadorTurno === 'p1' ? carta1.name : carta2.name}
                                    </p>
                                    <p className="text-zinc-400 text-sm mt-2 font-mono">
                                        {jugadorTurno === 'p1'
                                            ? 'Toca tu carta para elegir una acción'
                                            : 'El enemigo está eligiendo su acción...'}
                                    </p>
                                </div>
                            )}

                            <div className="flex gap-4 w-full justify-center">
                                <BotonBatalla
                                    extraStyle="w-48 bg-red-700 text-white border-red-900 hover:bg-red-600 hover:border-red-700"
                                    accion={rendirse}
                                    disabled={gameOver}
                                >
                                    ABORTAR
                                </BotonBatalla>
                            </div>
                        </div>

                        {/* ── Arena: Carta P1 | Logs | Carta P2 ── */}
                        <div className='flex items-center justify-center gap-16 w-full max-w-6xl mt-8'>

                            {/* Carta P1 – Jugador */}
                            <div className="flex flex-col items-center">
                                <div
                                    onClick={abrirMenuAcciones}
                                    className={`relative transition-transform duration-300 ${jugadorTurno === 'p1' && !gameOver && !cartaAtacando
                                        ? 'cursor-pointer hover:scale-105'
                                        : ''
                                        } ${cartaAtacando === 'p1' ? 'scale-110 translate-x-12 z-20 drop-shadow-[0_0_30px_rgba(220,38,38,0.8)]' : 'z-10'} ${cartaRecibiendoDano === 'p1' ? 'anim-snake' : ''}`}
                                >
                                    <Carta carta={carta1} color={carta1.attributes?.color ?? '#252120'} ancho={260} alto={360} selectionMode={true} />
                                    {cartaRecibiendoDano === 'p1' && <div className="absolute inset-0 bg-red-600/30 mix-blend-overlay rounded-xl pointer-events-none"></div>}
                                    {cartaCurandose === 'p1' && <div className="absolute inset-0 bg-green-500/30 mix-blend-overlay rounded-xl pointer-events-none animate-pulse"></div>}
                                    {jugadorTurno === 'p1' && !gameOver && !cartaAtacando && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.8)]">
                                            Tu turno
                                        </div>
                                    )}
                                </div>
                                <BarraVida actual={carta1.lifePoints} maximo={maxVidaP1} />
                            </div>

                            {/* Log de batalla (centro) */}
                            <div className="min-w-[320px] flex justify-center z-0">
                                <LogsBatalla logs={logs} turnoActual={turno} jugadorTurno={jugadorTurno} />
                            </div>

                            {/* Carta P2 – IA */}
                            <div className="flex flex-col items-center">
                                <div className={`relative transition-transform duration-300 ${cartaAtacando === 'p2' ? 'scale-110 -translate-x-12 z-20 drop-shadow-[0_0_30px_rgba(220,38,38,0.8)]' : 'z-10'} ${cartaRecibiendoDano === 'p2' ? 'anim-snake' : ''}`}>
                                    <Carta carta={carta2} color={carta2.attributes?.color ?? '#252120'} ancho={260} alto={360} selectionMode={true} />
                                    {cartaRecibiendoDano === 'p2' && <div className="absolute inset-0 bg-red-600/30 mix-blend-overlay rounded-xl pointer-events-none"></div>}
                                    {cartaCurandose === 'p2' && <div className="absolute inset-0 bg-green-500/30 mix-blend-overlay rounded-xl pointer-events-none animate-pulse"></div>}
                                    {jugadorTurno === 'p2' && !gameOver && cartaAtacando === 'p2' && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-zinc-700 text-zinc-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                                            IA
                                        </div>
                                    )}
                                </div>
                                <BarraVida actual={carta2.lifePoints} maximo={maxVidaP2} />
                            </div>
                        </div>

                        {/* ── Modal: Menú de acciones del jugador ── */}
                        {menuAbierto && jugadorTurno === 'p1' && !gameOver && (
                            <div
                                className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-md"
                                onClick={() => setMenuAbierto(false)}
                            >
                                <div
                                    className="bg-black/80 border border-red-500/30 shadow-[0_0_50px_rgba(220,38,38,0.3)] rounded-2xl p-8 max-w-md w-full relative"
                                    onClick={e => e.stopPropagation()}
                                >
                                    <h2 className="text-2xl font-black text-red-500 uppercase tracking-widest mb-2 text-center">
                                        Elige tu acción
                                    </h2>
                                    <p className="text-zinc-400 text-sm text-center mb-6 font-mono">
                                        {carta1.name} — Turno {turno.toString().padStart(2, '0')}
                                    </p>

                                    <div className="flex flex-col gap-3">
                                        {/* Ataque básico */}
                                        <BotonAccion
                                            label="Ataque Básico"
                                            sublabel="Daño estándar con posibilidad de crítico"
                                            onHover={() => reproducirSonidoUI(AUDIO.hover, 1.0)}
                                            onClick={() => {
                                                reproducirSonidoUI(AUDIO.confirmar, 1.0);
                                                ejecutarAccion('basico');
                                            }}
                                            color="red"
                                        />

                                        {/* Ataque especial (arma favorita) */}
                                        <BotonAccion
                                            label={nombreArmaP1}
                                            sublabel={
                                                cooldowns.p1.especial > 0
                                                    ? `En enfriamiento — ${cooldowns.p1.especial} turno(s) restante(s)`
                                                    : `+3% de daño · Enfriamiento: ${COOLDOWN_ESPECIAL} turnos`
                                            }
                                            onHover={() => reproducirSonidoUI(AUDIO.hover, 1.0)}
                                            onClick={() => {
                                                reproducirSonidoUI(AUDIO.confirmar, 1.0);
                                                ejecutarAccion('especial');
                                            }}
                                            disabled={cooldowns.p1.especial > 0}
                                            color="orange"
                                        />

                                        {/* Curación */}
                                        <BotonAccion
                                            label="Curarse"
                                            sublabel={
                                                cooldowns.p1.curar > 0
                                                    ? `En enfriamiento — ${cooldowns.p1.curar} turno(s) restante(s)`
                                                    : `Recupera 20% de vida · Enfriamiento: ${COOLDOWN_CURAR} turnos`
                                            }
                                            onHover={() => reproducirSonidoUI(AUDIO.hover, 1.0)}
                                            onClick={() => {
                                                reproducirSonidoUI(AUDIO.curacion, 0.55);
                                                ejecutarAccion('curar');
                                            }}
                                            disabled={cooldowns.p1.curar > 0}
                                            color="green"
                                        />
                                    </div>

                                    {/* Cancelar */}
                                    <button
                                        onClick={() => setMenuAbierto(false)}
                                        onMouseEnter={() => reproducirSonidoUI(AUDIO.hover)}
                                        className="w-full mt-4 py-2 text-zinc-500 hover:text-zinc-300 text-sm uppercase tracking-widest transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* ── Modal: Empate ── */}
                        {gameOver && draw && (
                            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-md">
                                <div className="bg-black/40 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-2xl p-10 text-center max-w-lg w-full relative overflow-hidden backdrop-blur-xl">
                                    <h2 className="text-3xl font-black mb-4 text-yellow-500 uppercase tracking-widest drop-shadow-md">Empate Técnico</h2>
                                    <p className="text-sm mb-8 text-zinc-300 font-mono">
                                        [SYS_MSG] Ambas unidades han alcanzado un punto muerto.
                                    </p>
                                    <BotonBatalla extraStyle="bg-yellow-600/80 text-white w-full border-yellow-500/50 hover:bg-yellow-500 backdrop-blur-md" accion={volverASeleccion}>
                                        ABORTAR Y VOLVER
                                    </BotonBatalla>
                                </div>
                            </div>
                        )}

                        {/* ── Modal: Victoria o Rendición ── */}
                        {gameOver && !draw && winner && (
                            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-md">
                                <div className={`bg-black/40 border ${motivoFinal === 'rendicion' ? 'border-yellow-500/30' : 'border-red-500/30'} shadow-[0_0_50px_rgba(220,38,38,0.3)] rounded-2xl p-10 text-center max-w-lg w-full relative overflow-hidden backdrop-blur-xl`}>

                                    <h2 className={`text-4xl font-black mb-2 uppercase tracking-widest ${motivoFinal === 'rendicion' ? 'text-yellow-500' : 'text-red-500'}`}>
                                        {motivoFinal === 'rendicion' ? 'Has escapado' : 'Misión Cumplida'}
                                    </h2>

                                    <p className="text-xl mb-8 text-zinc-200 font-mono border-y border-white/10 py-3 mt-4">
                                        {motivoFinal === 'rendicion'
                                            ? 'Retirada táctica completada.'
                                            : <>VENCEDOR: <span className="font-bold text-white drop-shadow-md">{winner === 'p1' ? carta1?.name : carta2?.name}</span></>
                                        }
                                    </p>

                                    <BotonBatalla
                                        extraStyle={`${motivoFinal === 'rendicion' ? 'bg-yellow-600/80 border-yellow-500/50 hover:bg-yellow-500' : 'bg-red-600/80 border-red-500/50 hover:bg-red-500'} text-white w-full backdrop-blur-md`}
                                        accion={volverASeleccion}
                                    >
                                        VOLVER A LA BASE
                                    </BotonBatalla>
                                </div>
                            </div>
                        )}

                    </div>
                )}
            </div>
        </div>
    );
}

export default CampoDeBatalla;