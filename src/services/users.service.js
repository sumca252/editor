import axios from "axios";

class UsersService {
    getAuthoredByUser(email) {
        return axios.get(`/users/author/${email}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    getSharedWithUser(email) {
        return axios.get(`/users/shared/${email}`);
    }
}

export default new UsersService();
