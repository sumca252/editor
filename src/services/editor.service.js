import axios from "axios";

class EditorService {
    getAllData() {
        return axios.get("/editor");
    }

    saveData(data) {
        return axios.post("/editor", data);
    }

    getDataById(id) {
        return axios.get(`/editor/${id}`);
    }

    updateData(id, data) {
        return axios.put(`/editor/${id}`, data);
    }
}

export default new EditorService();
