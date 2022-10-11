import axios from "axios";

const BASE_URL = "https://execjs.emilfolino.se";

class CodeService {
    getAllCode() {
        return axios.get("/code");
    }

    getCodeByUserEmail(email) {
        return axios.get(`/code/${email}`);
    }

    saveCode(code) {
        return axios.post("/code", code);
    }

    executeCode(code) {
        return axios.post(`${BASE_URL}/code`, { code });
    }
}

export default new CodeService();
