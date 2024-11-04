import axios from '../services/root.service.js';

class CitaService {
  constructor() {
    this.token = localStorage.getItem('token') || '';
  }

  getConfig() {
    return {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };
  }

  async getCitas() {
    try {
      const response = await axios.get('/citas', this.getConfig());
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createCita(citaData) {
    try {
      const response = await axios.post(
        '/citas',
        citaData,
        this.getConfig()
      );
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateCita(id, citaData) {
    try {
      const response = await axios.put(
        `/citas/${id}`,
        citaData,
        this.getConfig()
      );
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deleteCita(id) {
    try {
      await axios.delete(`/citas/${id}`, this.getConfig());
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (axios.isAxiosError(error)) {
      return new Error(
        error.response?.data?.message || 'Error en la petición al servidor'
      );
    }
    return new Error('Error inesperado');
  }
}

export default new CitaService();
