<template>
    <header>
        <!-- prettier-ignore -->
        <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 border-b">
            <div class="container flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                <RouterLink to="/" class="flex items-center pl-6">
                    <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white text-primary-700">Editor</span>
                </RouterLink>
                <div class="flex items-center md:order-2">
                    <button type="button" class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                    <span class="sr-only">Open user menu</span>
                        <i class="fa-solid fa-user dark:bg-gray-700 bg-white avatar border-gray-700 border-2 color-primary w-8 h-8"></i>
                    </button>
                    <!-- Dropdown menu -->
                    <div class="hidden z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown" style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(0px, 310px);" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom">
                        <div class="py-3 px-4">
                            <span class="block text-sm text-gray-900 dark:text-white"></span>
                            <span class="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">{{ email }}</span>
                        </div>
                        <ul class="py-1" aria-labelledby="user-menu-button">
                            <li>
                                <span @click.prevent="logout"  class="cursor-pointer block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</span>
                            </li>
                        </ul>
                    </div>
                    <button data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                <div class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
                    <ul class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                        <RouterLink :to="{ name: 'Home'}" class="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" active-class="active">Home</RouterLink>
                        </li>
                        <li>
                        <RouterLink :to="{ name: 'CodeMode'}" class="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" active-class="active" id="codemode">Codemode</RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>
<script setup>
/**
 * imports
 */
import { drop } from "lodash";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../../store/user";

const router = useRouter();

const email = ref("");
/**
 * store
 */
const userStore = useUserStore();

onMounted(() => {
    email.value = userStore.getUserEmail;
});

/**
 * methods
 */
const logout = () => {
    userStore.logout();
    router.push({ path: "/login" });
};
</script>
<style>
.avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    widows: 2rem;
    height: 2rem;
    border-radius: 50%;
}
</style>

