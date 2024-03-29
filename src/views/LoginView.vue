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
                        Login
                    </h1>
                    <Form
                        class="space-y-4 md:space-y-6"
                        :validation-schema="schema"
                        @submit="login"
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
                            />
                            <ErrorMessage
                                name="email"
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
                            />
                            <ErrorMessage
                                name="password"
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
                            Login
                        </button>
                        <p
                            class="
                                text-sm
                                font-light
                                text-gray-500
                                dark:text-gray-400
                            "
                        >
                            Don't have an account yet?
                            <RouterLink
                                :to="{ name: 'Register' }"
                                class="
                                    font-medium
                                    text-blue-600
                                    hover:underline
                                    dark:text-primary-500
                                "
                                >Register</RouterLink
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
import { useUserStore } from "@/store/user";

import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

/**
 * refs
 */
const email = ref("");
const password = ref("");

/**
 * router
 */
const router = useRouter();

/**
 * store
 */
const userStore = useUserStore();

/**
 * validation schema
 */
const schema = yup.object({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
});

/**
 * methods
 */
const login = async () => {
    try {
        const data = {
            email: email.value,
            password: password.value,
        };

        const status = await userStore.login(data);

        router.push({ path: "/" });
        localStorage.removeItem("email");
    } catch (error) {
        throw new Error(error);
    }
};

/**
 * lifecycle hooks
 */
onMounted(() => {
    if (localStorage.getItem("email")) {
        email.value = localStorage.getItem("email");
    }
});
</script>