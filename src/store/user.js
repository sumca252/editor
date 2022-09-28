import { defineStore } from "pinia";
import AuthService from "@/services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };

export const useUserStore = defineStore({
    id: "user",
    state: () => initialState,
    getters: {
        isLoggedIn: (state) => state.status.loggedIn,
        getUser: (state) => state.user,
        getUserEmail: (state) => state.user.email,
    },
    actions: {
        async register(user) {
            try {
                const response = await AuthService.registerUser(user);
                if (response.data.user) {
                    localStorage.setItem("email", response.data.user.email);
                }
                return response.data;
            } catch (error) {
                throw new Error(error);
            }
        },

        async login(user) {
            try {
                const response = await AuthService.loginUser(user);
                if (response.data.user) {
                    localStorage.setItem(
                        "user",
                        JSON.stringify(response.data.user)
                    );
                    this.user = response.data.user;
                    this.status.loggedIn = true;
                }
                return response.data;
            } catch (error) {
                throw new Error(error);
            }
        },

        logout() {
            this.status.loggedIn = false;
            this.user = null;
            localStorage.removeItem("user");
        },
    },
});
