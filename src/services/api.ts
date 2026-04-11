// Dirección de la base de datos en internet
const API_URL = 'https://educapi-v2.onrender.com';
// Contraseña secreta para poder modificar datos
const USER_SECRET = 'Gabr594945NO';

// Configuración para enviar datos y la contraseña de seguridad
const headers = {
  'Content-Type': 'application/json',
  'usersecretpasskey': USER_SECRET
};

// Objeto que agrupa todas las funciones para hablar con el servidor
export const API = {
  // Pide todas las cartas que existen en el servidor
  getCartas: async () => {
    try {
      const response = await fetch(`${API_URL}/card`, {
        method: 'GET',
        headers
      });
      const data = await response.json();
      return data.data; // Devolvemos la lista de personajes
    } catch (error) {
      console.error("Error al obtener las cartas:", error);
      return [];
    }
  },

  // Envía los datos de un nuevo personaje para guardarlo
  crearCarta: async (cartaData: any) => {
    try {
      const response = await fetch(`${API_URL}/card`, {
        method: 'POST',
        headers,
        body: JSON.stringify(cartaData) // Convertimos el objeto a texto para enviarlo
      });
      const data = await response.json();
      if (!response.ok || data.statusCode) {
        throw new Error(data.message || 'Error al crear la carta');
      }
      return data;
    } catch (error) {
      console.error("Error al crear la carta:", error);
      throw error;
    }
  },

  // Borra un personaje usando su número de ID
  eliminarCarta: async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/card/${id}`, {
        method: 'DELETE',
        headers: {
          'usersecretpasskey': USER_SECRET
        }
      });
      const data = await response.json();
      if (!response.ok || data.statusCode) {
        throw new Error(data.message || 'No se pudo eliminar la carta');
      }
      return data;
    } catch (error) {
      console.error(`Error al eliminar la carta ${id}:`, error);
      throw error;
    }
  },

  // Busca la información de un personaje específico
  getCartaById: async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/card/${id}`, {
        method: 'GET',
        headers
      });
      const data = await response.json();
      if (!response.ok || data.statusCode) {
        throw new Error(data.message || 'Error al obtener la carta');
      }
      return data.data[0]; 
    } catch (error) {
      console.error(`Error al obtener la carta ${id}:`, error);
      throw error;
    }
  },

  // Cambia los datos de un personaje que ya está guardado
  editarCarta: async (id: number, cartaData: any) => {
    try {
      const response = await fetch(`${API_URL}/card/${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(cartaData)
      });
      const data = await response.json();
      if (!response.ok || data.statusCode) {
        throw new Error(data.message || 'Error al actualizar la carta');
      }
      return data;
    } catch (error) {
      console.error(`Error al actualizar la carta ${id}:`, error);
      throw error;
    }
  }
};
