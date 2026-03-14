const Crear = () => {
return (
        <div className="p-6 bg-black/60 rounded-lg max-w-2xl mx-auto text-white">
            <h1 className="text-2xl font-bold mb-4 text-red-600 text-center">Crear Carta</h1>

            <div className="space-y-4">
                <p className="border-b border-gray-700 pb-2">Nombre </p>
                <p className="border-b border-gray-700 pb-2">Stats</p>
                <p className="border-b border-gray-700 pb-2">Imagenes</p>
                <p className="border-b border-gray-700 pb-2">Descripcion</p>
            </div>
        </div>
    );
};

export default Crear;