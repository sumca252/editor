import axios from "axios";

class EmailService {
    sendInviteToEditDocument(data) {
        return axios.post("/email", data);
    }
}

export default new EmailService();
