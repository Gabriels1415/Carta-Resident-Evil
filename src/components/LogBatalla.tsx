import type { LogEntry, Jugador } from './CampoDeBatalla';

type Props = {
    logs: LogEntry[];
    turnoActual: number;
    jugadorTurno: Jugador;
};

function LogsBatalla({ logs, turnoActual, jugadorTurno }: Props) {
    return (
        <div className="bg-gray-100 p-4 rounded-lg w-80 h-64 overflow-y-auto border shadow-md text-black">
            <h3 className="font-bold text-lg mb-2">📜 Registro de batalla</h3>
            
            {logs.length === 0 && (
                <p className="text-gray-500 text-sm">Sin ataques aún...</p>
            )}
            
            {logs.map((log, idx) => (
                <div key={idx} className="text-sm mb-2 border-b pb-1">
                    <span className="font-bold">Turno {log.turno}:</span> {log.atacante} a{" "}
                    {log.defensor} causó{" "}
                    <span className="text-red-600 font-bold">{log.damage}</span> de daño.
                    {log.vidaRestante > 0 ? (
                        <span> Vida restante: {log.vidaRestante}</span>
                    ) : (
                        <span className="text-red-500 font-bold ml-1">¡DERROTADO!</span>
                    )}
                </div>
            ))}
            
            <div className="text-xs text-gray-400 mt-2">
                Turno actual: {turnoActual} - Juega{" "}
                {jugadorTurno === "p1" ? "Jugador 1" : "Jugador 2"}
            </div>
        </div>
    );
}

export default LogsBatalla;