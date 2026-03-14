const API_URL = 'https://educapi-v2.onrender.com';
const USER_SECRET = 'Gabr594945NO';

const headers = {
  'Content-Type': 'application/json',
  'usersecretpasskey': USER_SECRET
};

export const API = {
  getCartas: async () => {
    try {
      const response = await fetch(`${API_URL}/card`, {
        method: 'GET',
        headers
      });
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error al obtener las cartas:", error);
      return [];
    }
  },

  crearCarta: async (cartaData: any) => {
    try {
      const response = await fetch(`${API_URL}/card`, {
        method: 'POST',
        headers,
        body: JSON.stringify(cartaData)
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
