import http from "../http-common";

class ProcedureService {
  getAll() {
    return http.get("/procedures");
  }

  get(id) {
    return http.get(`/procedures/${id}`);
  }

  create(data) {
    return http.post("/procedures", data);
  }

  update(id, data) {
    return http.put(`/procedures/${id}`, data);
  }

  delete(id) {
    return http.delete(`/procedures/${id}`);
  }

  findByName(name) {
    return http.get(`/procedures?name=${name}`);
  }
}

export default new ProcedureService();