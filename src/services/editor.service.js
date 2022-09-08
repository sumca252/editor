import axios from "axios";

class EditorService {
    getAllData() {
        return axios.get("/editor");
    }
}

export default new EditorService();
