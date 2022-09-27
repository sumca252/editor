import axios from "axios";

class AuthService {
    registerUser(user) {
        return axios.post("/auth/register", user);
    }
}

export default new AuthService();
