import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../services/api';

function CrearCarta() {
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);
  
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    try {
      const datosParaAPI = {
        ...formData,
        attack: Number(formData.attack) || 0,
        defense: Number(formData.defense) || 0,
        lifePoints: Number(formData.lifePoints) || 0,
      };

      await API.crearCarta(datosParaAPI);
      alert('¡Carta creada exitosamente!');
      navigate('/');
    } catch (error: any) {
      alert(`Hubo un error al crear la carta: ${error.message}`);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-black/80 p-8 rounded-xl border border-red-900/50 shadow-[0_0_30px_rgba(255,0,0,0.15)] backdrop-blur-md text-white mt-10">
      <h2 className="text-3xl font-bold text-center text-red-500 mb-8 tracking-widest uppercase border-b border-red-900/50 pb-4">
        Crear Nueva Carta
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
              className="w-full bg-zinc-900/50 border border-zinc-700 rounded p-3 text-white focus:outline-none focus:border-red-500 transition-colors"
              placeholder="Ej: Leon S. Kennedy"
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
              className="w-full bg-zinc-900/50 border border-zinc-700 rounded p-3 text-white focus:outline-none focus:border-red-500 transition-colors"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 bg-black/40 p-4 rounded-lg border border-red-900/20">
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
              className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-white text-center focus:outline-none focus:border-red-500"
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
              className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 text-white text-center focus:outline-none focus:border-red-500"
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
              className="w-full bg-zinc-900/50 border border-zinc-700 rounded p-3 text-white focus:outline-none focus:border-red-500"
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
              className="w-full bg-zinc-900/50 border border-zinc-700 rounded p-3 text-white focus:outline-none focus:border-red-500 transition-colors"
              placeholder="Ej: Samurai Edge, Lanzacohetes..."
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
            className="w-full bg-zinc-900/50 border border-zinc-700 rounded p-3 text-white focus:outline-none focus:border-red-500 transition-colors resize-none"
            placeholder="Escribe la historia o perfil de esta carta..."
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={cargando}
          className={`w-full py-4 rounded font-bold uppercase tracking-widest transition-all ${
            cargando 
              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
              : 'bg-red-800 hover:bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)] cursor-pointer hover:scale-[1.02]'
          }`}
        >
          {cargando ? 'Creando Archivo...' : 'Registrar Carta'}
        </button>
      </form>
    </div>
  );
}

export default CrearCarta;
