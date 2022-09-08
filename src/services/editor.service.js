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
}

export default new EditorService();
