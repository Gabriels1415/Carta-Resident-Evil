import { useRef, useEffect } from 'react';
import type { LogEntry, Jugador } from './CampoDeBatalla';

type Props = {
    logs: LogEntry[];
    turnoActual: number;
    jugadorTurno: Jugador;
};

function LogsBatalla({ logs, turnoActual, jugadorTurno }: Props) {
    const endOfLogsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endOfLogsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    const renderLogContent = (log: LogEntry) => {
        if (log.tipo === 'curar') {
            return (
                <div className="text-zinc-300">
                    <span className="font-semibold text-green-400">{log.atacante}</span> se cura.<br />
                    Curación: <span className="text-green-400 font-bold">{log.curacion}</span> HP.
                </div>
            );
        }

        if (log.tipo === 'especial') {
            return (
                <div className="text-zinc-300">
                    <span className="font-semibold text-orange-400">{log.atacante}</span> usa{' '}
                    <span className="font-semibold text-orange-300">{log.nombreArma}</span> contra{' '}
                    <span className="font-semibold text-white">{log.defensor}</span>.<br />
                    Daño: <span className={log.esCritico ? "text-red-400 font-black text-sm drop-shadow-[0_0_5px_rgba(220,38,38,0.8)]" : "text-orange-400 font-bold"}>{log.damage}</span>.
                    {log.esCritico && (
                        <span className="text-red-500 font-bold ml-1 animate-pulse drop-shadow-sm uppercase text-[10px]">
                            [Crítico]
                        </span>
                    )}
                </div>
            );
        }

        return (
            <div className="text-zinc-300">
                <span className="font-semibold text-white">{log.atacante}</span> ataca a{' '}
                <span className="font-semibold text-white">{log.defensor}</span>.<br />
                Daño: <span className={log.esCritico ? "text-red-400 font-black text-sm drop-shadow-[0_0_5px_rgba(220,38,38,0.8)]" : "text-white font-bold"}>{log.damage}</span>.
                {log.esCritico && (
                    <span className="text-red-500 font-bold ml-1 animate-pulse drop-shadow-sm uppercase text-[10px]">
                        [Crítico]
                    </span>
                )}
            </div>
        );
    };

    return (
        <div className="relative bg-black/40 backdrop-blur-md p-5 rounded-xl border border-white/10 w-80 h-72 overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] text-zinc-200">

            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                <h3 className="font-bold text-sm uppercase tracking-widest text-zinc-300 drop-shadow-md">Combat HUD</h3>
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)] block"></span>
            </div>

            <div className="h-[180px] overflow-y-auto pr-2 flex flex-col gap-3 text-xs leading-relaxed custom-scrollbar relative z-10">
                {logs.length === 0 && (
                    <p className="text-zinc-500 opacity-70 animate-pulse text-center mt-4">Esperando datos de combate...</p>
                )}

                {logs.map((log, idx) => (
                    <div
                        key={idx}
                        className={`border-l-2 pl-2 bg-white/5 p-2 rounded-r-md ${log.tipo === 'curar'
                            ? 'border-green-500/50'
                            : log.tipo === 'especial'
                                ? 'border-orange-500/50'
                                : 'border-white/20'
                            }`}
                    >
                        <div className="text-zinc-400 mb-1 opacity-70 text-[10px] font-mono uppercase tracking-wider">
                            &gt; Turno {log.turno.toString().padStart(2, '0')}
                        </div>
                        {renderLogContent(log)}
                        {log.tipo !== 'curar' && log.vidaRestante > 0 ? (
                            <div className="text-zinc-400 opacity-80 mt-1 text-[10px] uppercase tracking-wide">
                                Vida Restante: <span className="text-white font-medium">{log.vidaRestante}</span>
                            </div>
                        ) : log.tipo !== 'curar' ? (
                            <div className="text-red-500 font-bold mt-1 uppercase text-[10px] tracking-widest drop-shadow-md">
                                Objetivo Eliminado
                            </div>
                        ) : (
                            <div className="text-green-400 opacity-80 mt-1 text-[10px] uppercase tracking-wide">
                                Vida Actual: <span className="text-white font-medium">{log.vidaRestante}</span>
                            </div>
                        )}
                    </div>
                ))}
                <div ref={endOfLogsRef} />
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-md border-t border-white/10 p-2 text-[10px] text-zinc-400 uppercase flex justify-between z-10 font-mono tracking-widest">
                <span>T:{turnoActual}</span>
                <span>Activo: <span className="text-white font-bold">{jugadorTurno === "p1" ? "P1" : "P2"}</span></span>
            </div>
        </div>
    );
}

export default LogsBatalla;
