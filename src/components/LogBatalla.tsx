import type { CartaType } from "./Carta";

type Props = {
    turno: number;
    p1: CartaType;
    p2: CartaType;
    damage: number;
};

function LogBatalla({ turno, p1, p2, damage }: Props) {
    return (
        <div className='flex items-center gap-2 p-2 hover:bg-amber-500/30 transition-all ease-in rounded'>
            <p className='text-orange-400 font-bold text-xl'>Turno {turno}:</p>
            <p className='text-xl text-white'>
                P1 ({p1.name}) hizo {damage} de daño a P2 ({p2.name})
            </p>
        </div>
    );
}

export default LogBatalla;
