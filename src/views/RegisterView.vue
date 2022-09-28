<template>
    <div class="bg-gray-50 dark:bg-gray-900">
        <div
            class="
                flex flex-col
                items-center
                justify-center
                px-6
                py-8
                mx-auto
                md:h-screen
                lg:py-0
            "
        >
            <span
                class="
                    flex
                    items-center
                    mb-6
                    text-2xl
                    font-semibold
                    text-gray-400
                    dark:text-gray-500
                "
            >
                Editor
            </span>
            <div
                class="
                    w-full
                    bg-white
                    rounded-lg
                    shadow
                    dark:border
                    md:mt-0
                    sm:max-w-md
                    xl:p-0
                    dark:bg-gray-800 dark:border-gray-700
                "
            >
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1
                        class="
                            text-center text-xl
                            font-bold
                            leading-tight
                            tracking-tight
                            text-gray-900
                            md:text-2xl
                            dark:text-white
                        "
                    >
                        Register
                    </h1>
                    <Form
                        class="space-y-4 md:space-y-6"
                        :validation-schema="schema"
                        @submit="registerUser"
                    >
                        <div>
                            <label
                                for="email"
                                class="
                                    block
                                    mb-2
                                    text-sm
                                    font-medium
                                    text-gray-900
                                    dark:text-white
                                "
                                >Your email</label
                            >
                            <Field
                                v-model="email"
                                type="email"
                                name="email"
                                id="email"
                                class="
                                    bg-gray-50
                                    border border-gray-300
                                    text-gray-900
                                    sm:text-sm
                                    rounded-lg
                                    focus:ring-primary-600
                                    focus:border-primary-600
                                    block
                                    w-full
                                    p-2.5
                                    dark:bg-gray-700
                                    dark:border-gray-600
                                    dark:placeholder-gray-400
                                    dark:text-white
                                    dark:focus:ring-blue-500
                                    dark:focus:border-blue-500
                                "
                                placeholder="name@company.com"
                                autofocus
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                class="text-red-500 text-sm"
                            />
                        </div>
                        <div>
                            <label
                                for="password"
                                class="
                                    block
                                    mb-2
                                    text-sm
                                    font-medium
                                    text-gray-900
                                    dark:text-white
                                "
                                >Password</label
                            >
                            <Field
                                v-model="password"
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                class="
                                    bg-gray-50
                                    border border-gray-300
                                    text-gray-900
                                    sm:text-sm
                                    rounded-lg
                                    focus:ring-primary-600
                                    focus:border-primary-600
                                    block
                                    w-full
                                    p-2.5
                                    dark:bg-gray-700
                                    dark:border-gray-600
                                    dark:placeholder-gray-400
                                    dark:text-white
                                    dark:focus:ring-blue-500
                                    dark:focus:border-blue-500
                                "
                                required
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                class="text-red-500 text-sm"
                            />
                        </div>
                        <div>
                            <label
                                for="confirmPassword"
                                class="
                                    block
                                    mb-2
                                    text-sm
                                    font-medium
                                    text-gray-900
                                    dark:text-white
                                "
                                >Confirm password</label
                            >
                            <Field
                                v-model="confirmPassword"
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="••••••••"
                                class="
                                    bg-gray-50
                                    border border-gray-300
                                    text-gray-900
                                    sm:text-sm
                                    rounded-lg
                                    focus:ring-primary-600
                                    focus:border-primary-600
                                    block
                                    w-full
                                    p-2.5
                                    dark:bg-gray-700
                                    dark:border-gray-600
                                    dark:placeholder-gray-400
                                    dark:text-white
                                    dark:focus:ring-blue-500
                                    dark:focus:border-blue-500
                                "
                                required
                            />
                            <ErrorMessage
                                name="confirmPassword"
                                component="div"
                                class="text-red-500 text-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            class="
                                w-full
                                text-white
                                bg-primary-600
                                hover:bg-primary-700
                                focus:ring-4
                                focus:outline-none
                                focus:ring-primary-300
                                font-medium
                                rounded-lg
                                text-sm
                                px-5
                                py-2.5
                                text-center
                                dark:bg-primary-600
                                dark:hover:bg-primary-700
                                dark:focus:ring-primary-800
                            "
                        >
                            Register
                        </button>
                        <p
                            class="
                                text-sm
                                font-light
                                text-gray-500
                                dark:text-gray-400
                            "
                        >
                            Already have an account?
                            <RouterLink
                                :to="{ name: 'Login' }"
                                class="
                                    font-medium
                                    text-blue-600
                                    hover:underline
                                    dark:text-primary-500
                                "
                                >Login</RouterLink
                            >
                        </p>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
/**
 * imports
 */
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { useUserStore } from "@/store/user.js";

/**
 * refs
 */
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const router = useRouter();

const userStore = useUserStore();

/**
 * validation schema
 */

const schema = yup.object({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup
        .string()
        .required("Confirm password is required")
        .oneOf([yup.ref("password"), null], "Passwords must match"), // compare password and confirm password
});

/**
 * methods
 */

const registerUser = async () => {
    const newUser = {
        email: email.value,
        password: password.value,
    };

    try {
        const status = await userStore.register(newUser);
        console.log(status);

        if (status.message === "User created") {
            router.push("/login");
        }
    } catch (error) {
        throw new Error(error);
    }
};
</script>
