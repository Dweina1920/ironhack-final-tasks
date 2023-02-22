<template>
  <header>
    <!-- This example requires Tailwind CSS v2.0+ -->
    <nav x-data="{ open: false }" class="bg-white">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex items-center justify-between h-16">
          <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <!-- Mobile menu button-->
            <button
              x-on:click="open = ! open"
              type="button"
              class="ml-8 mt-10 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>

              <svg
                class="block h-8 w-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

              <svg
                class="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div
            class="flex-1 flex items-center justify-end mx-10 mt-10 sm:items-stretch sm:justify-start lg:justify-between"
          >
            <div class="flex-shrink-0 flex items-center ">
              <router-link to="/">
                <img src="../img/logo-04.png" class="w-16" />
              </router-link>
            </div>

            <div class="mt-4 hidden sm:block sm:ml-6">
              <div class="flex space-x-4">
                <a
                  href="#"
                  class="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  ><router-link to="/"> Home </router-link></a
                >

                <a
                  href="#"
                  class="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  ><router-link to="/task">Task Manager</router-link></a
                >

                <a
                  href="#"
                  class="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  ><router-link to="/account">Profile</router-link></a
                >

                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                <a
                  @click="signOut"
                  class="bg-turquesa text-white px-3 py-2 rounded-md text-sm font-medium"
                  aria-current="page"
                  >Log Out</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state. -->
      <div class="sm:hidden" id="mobile-menu ">
        <div
          x-show="open"
          x-on:click.away="open = false"
          class="px-2 pt-2 pb-3 space-y-1 mt-6 mx-10 "
        >
          <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
          <a
            href="#"
            class=" text-black bg-verde block px-3 py-2 rounded-md text-base font-medium"
            aria-current="page"
            ><router-link to="/"> Home </router-link></a
          >

          <a
            href="#"
            class="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            ><router-link to="/task">Task Manager</router-link></a
          >

          <a
            href="#"
            class="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            ><router-link to="/account">Profile</router-link></a
          >

          <a
          @click="signOut"
            class="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >Log Out</a
          >
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
// import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

//constant to save a variable that will hold the use router method
const route = "/";
const buttonText = "Todo app";

// constant to save a variable that will get the user from store with a computed function imported from vue
// const getUser = computed(() => useUserStore().user);
const getEmail = useUserStore().user.email;
console.log(getEmail);

// constant that calls user email from the useUSerStore

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
const redirect = useRouter();

const signOut = async () => {
  try {
    // call the user store and send the users info to backend to signOut
    await useUserStore().signOut();
    // redirects user to the homeView

    // then redirect user to the homeView
    redirect.push({ path: "/auth/login" });
  } catch (error) {}
};
</script>

<style></style>
