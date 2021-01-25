import http from "../http-common";

class ConsultationService {
  getAll() {
    return http.get("/consultations");
  }

  get(id) {
    return http.get(`/consultations/${id}`);
  }

  create(data) {
    return http.post("/consultations", data);
  }

  update(id, data) {
    return http.put(`/consultations/${id}`, data);
  }

  delete(id) {
    return http.delete(`/consultations/${id}`);
  }

  findByDate(date) {
    return http.get(`/consultations?date=${date}`);
  }
}

export default new ConsultationService();