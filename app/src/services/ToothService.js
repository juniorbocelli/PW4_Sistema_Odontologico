import http from "../http-common";

class ToothService {
  getAll() {
    return http.get("/teeth");
  }

  get(id) {
    return http.get(`/teeth/${id}`);
  }

  create(data) {
    return http.post("/teeth", data);
  }

  update(id, data) {
    return http.put(`/teeth/${id}`, data);
  }

  delete(id) {
    return http.delete(`/teeth/${id}`);
  }

  findByName(name) {
    return http.get(`/teeth?name=${name}`);
  }
}

export default new ToothService();