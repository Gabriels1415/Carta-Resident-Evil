import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../services/api';

// Pantalla para modificar un personaje ya creado
function EditarCarta() {
  const { id } = useParams(); // Para saber qué ID de personaje estamos editando
  const navigate = useNavigate(); // Para volver a la lista principal

  const [cargandoDatos, setCargandoDatos] = useState(true); // Para saber si ya bajaron los datos originales
  const [cargando, setCargando] = useState(false); // Para el botón de guardar


  // Aquí guardamos los datos del personaje que vamos a editar
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    attack: '',
    defense: '',
    lifePoints: '',
    pictureUrl: '',
    attributes: {
      tipo: 'Agente',
      armaFavorita: ''
    }
  });

  // Buscamos los datos actuales apenas entramos a esta pantalla
  useEffect(() => {
    const cargarCarta = async () => {
      if (!id) return;
      try {
        const cartaActual = await API.getCartaById(Number(id));
        // Llenamos el formulario con lo que nos diga el servidor
        setFormData({
          name: cartaActual.name || '',
          description: cartaActual.description || '',
          attack: cartaActual.attack?.toString() || '',
          defense: cartaActual.defense?.toString() || '',
          lifePoints: cartaActual.lifePoints?.toString() || '',
          pictureUrl: cartaActual.pictureUrl || '',
          attributes: {
            tipo: cartaActual.attributes?.tipo || 'Agente',
            armaFavorita: cartaActual.attributes?.armaFavorita || ''
          }
        });
      } catch (error) {
        alert("No se pudo cargar la información de la carta. Asegúrate de que existe.");
        navigate('/');
      } finally {
        setCargandoDatos(false);
      }
    };

    cargarCarta();
  }, [id, navigate]);

  // Actualizamos el formulario según lo que el usuario cambie
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'tipo' || name === 'armaFavorita') {
      setFormData({
        ...formData,
        attributes: {
          ...formData.attributes,
          [name]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: name === 'attack' || name === 'defense' || name === 'lifePoints'
          ? (value === '' ? '' : Number(value))
          : value
      });
    }
  };

  // Guardamos los cambios en el servidor
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setCargando(true);
    try {
      const datosParaAPI = {
        ...formData,
        attack: Number(formData.attack) || 0,
        defense: Number(formData.defense) || 0,
        lifePoints: Number(formData.lifePoints) || 0,
      };

      await API.editarCarta(Number(id), datosParaAPI);
      alert('¡Carta actualizada exitosamente!');
      navigate('/');
    } catch (error: any) {
      alert(`Hubo un error al actualizar la carta: ${error.message}`);
    } finally {
      setCargando(false);
    }
  };

  // Si estamos bajando los datos del servidor
  if (cargandoDatos) {
    return (
      <div className="flex flex-col items-center mt-20">
        <div className="text-stone-400 font-bold text-2xl animate-pulse uppercase tracking-widest">
          Recuperando datos del expediente...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-black/80 p-8 rounded-xl border border-stone-800 shadow-[0_0_30px_rgba(255,255,255,0.05)] backdrop-blur-md text-white mt-10">
      <h2 className="text-3xl font-bold text-center text-stone-300 mb-8 tracking-widest uppercase border-b border-stone-800 pb-4">
        Editar Expediente
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-stone-400 mb-2 uppercase tracking-wider">Nombre del Personaje</label>
            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-zinc-900/50 border border-zinc-700 rounded p-3 text-white focus:outline-none focus:border-stone-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-stone-400 mb-2 uppercase tracking-wider">URL de la Imagen</label>
            <input
              required
              type="url"
              name="pictureUrl"
              value={formData.pictureUrl}
              onChange={handleChange}
              className="w-full bg-zinc-900/50 border border-zinc-700 rounded p-3 text-white focus:outline-none focus:border-stone-500 transition-colors"
            />
          </div>
        </div>

        {/* Stats del personaje */}
        <div className="grid grid-cols-3 gap-4 bg-black/40 p-4 rounded-lg border border-stone-800/50">
          <div>
            <label className="block text-xs font-bold text-red-400 mb-2 uppercase tracking-wider text-center">Ataque</label>
            <input
              required
              type="number"
              name="attack"
              value={formData.attack}
              onChange={handleChange}
              min="0" max="9999"
              className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-white text-center focus:outline-none focus:border-red-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-400 mb-2 uppercase tracking-wider text-center">Defensa</label>
            <input
              required
              type="number"
              name="defense"
              value={formData.defense}
              onChange={handleChange}
              min="0" max="9999"
              className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-white text-center focus:outline-none focus:border-orange-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-green-400 mb-2 uppercase tracking-wider text-center">Puntos de Vida</label>
            <input
              required
              type="number"
              name="lifePoints"
              value={formData.lifePoints}
              onChange={handleChange}
              min="0" max="9999"
              className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-white text-center focus:outline-none focus:border-green-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-stone-400 mb-2 uppercase tracking-wider">Tipo</label>
            <select
              name="tipo"
              value={formData.attributes.tipo}
              onChange={handleChange}
              className="w-full bg-zinc-900/50 border border-zinc-700 rounded p-3 text-white focus:outline-none focus:border-stone-500"
            >
              <option value="Agente">Agente</option>
              <option value="Mercenario">Mercenario</option>
              <option value="Civil">Civil</option>
              <option value="Bioterrorista">Bioterrorista</option>
              <option value="B.O.W.">B.O.W. (Monstruo)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-stone-400 mb-2 uppercase tracking-wider">Arma o Especialidad</label>
            <input
              type="text"
              name="armaFavorita"
              value={formData.attributes.armaFavorita}
              onChange={handleChange}
              className="w-full bg-zinc-900/50 border border-zinc-700 rounded p-3 text-white focus:outline-none focus:border-stone-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-stone-400 mb-2 uppercase tracking-wider">Descripción / Historia</label>
          <textarea
            required
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full bg-zinc-900/50 border border-zinc-700 rounded p-3 text-white focus:outline-none focus:border-stone-500 transition-colors resize-none"
          ></textarea>
        </div>

        {/* Botones de acción directos */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-1/3 py-4 rounded font-bold uppercase tracking-widest transition-all bg-zinc-800 hover:bg-zinc-700 text-stone-300 border border-zinc-600"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={cargando}
            className={`w-2/3 py-4 rounded font-bold uppercase tracking-widest transition-all ${cargando
              ? 'bg-red-900 text-zinc-500 cursor-not-allowed'
              : 'bg-red-600 hover:bg-green-00 text-white shadow-[0_0_15px_rgba(120,113,108,0.5)] cursor-pointer hover:scale-[1.02]'
              }`}
          >
            {cargando ? 'Guardando...' : 'Reescribir Datos'}
          </button>
        </div>

      </form>
    </div>
  );
}

export default EditarCarta;
