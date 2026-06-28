// Pantalla de consejos útiles para el juego
const Recomendaciones = () => {
    return (
        <div className="p-6 bg-black/60 rounded-lg max-w-2xl mx-auto text-white">
            <h1 className="text-2xl font-bold mb-6 text-red-600 text-center uppercase tracking-widest border-b border-red-900 pb-4">Reglas de Batalla</h1>

            {/* Lista de reglas de batalla */}
            <div className="space-y-6">
                <div className="bg-[#450a0a]/40 p-4 rounded border border-red-900/30">
                    <h3 className="text-red-500 font-bold mb-2 uppercase tracking-widest text-sm">❤️ Curación Estratégica</h3>
                    <p className="text-stone-300">Durante la batalla, tienes la capacidad de curar a tu personaje si su salud se ve comprometida. ¡Úsalo sabiamente!</p>
                </div>

                <div className="bg-[#450a0a]/40 p-4 rounded border border-red-900/30">
                    <h3 className="text-red-500 font-bold mb-2 uppercase tracking-widest text-sm">⚔️ Daño de Ataques Secundarios</h3>
                    <p className="text-stone-300">Los segundos ataques (usando habilidades especiales o armas de fuego) siempre infligen <strong>mayor daño</strong> que el ataque físico o inicial básico.</p>
                </div>

                <div className="bg-[#450a0a]/40 p-4 rounded border border-red-900/30">
                    <h3 className="text-red-500 font-bold mb-2 uppercase tracking-widest text-sm">🧠 Táctica de Combate</h3>
                    <p className="text-stone-300">Conoce los atributos de tu carta. Aprovecha las ventajas de los ataques más fuertes en los momentos decisivos y vigila siempre tu barra de vida.</p>
                </div>
            </div>
        </div>
    );
};

export default Recomendaciones;
