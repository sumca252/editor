import axios from "axios";

class AuthService {
    registerUser(user) {
        return axios.post("/auth/register", user);
    }

    loginUser(user) {
        return axios.post("/auth/login", user);
    }
}

export default new AuthService();
