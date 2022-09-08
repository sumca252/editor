import axios from "axios";

class EditorService {
    getAllData() {
        return axios.get("/editor");
    }

    saveData(data) {
        return axios.post("/editor", data);
    }
}

export default new EditorService();
