<template>
  <nav class="flex row justify-around items-center w-full  mt-8">
    <div>
      <img src="../img/logo-04.png" class="w-20" />
    </div>
    <!-- <PersonalRouter :route="route" :buttonText="buttonText" class="logo-link"/> -->

    <ul class="flex row justify-around items-center gap-16">
      <li><router-link to="/"> Home </router-link></li>
      <li>
        <router-link to="/">Task Manager</router-link>
      </li>

      <li>
        <router-link to="/account">Your Profile</router-link>
      </li>
    </ul>

    <div>
      <ul class="flex flex-col justify-around items-center gap-4">
        <li class="log-out-welcome">
          <p>Welcome, {{ getEmail }}</p>
        </li>
        <li>
          <button
            @click="signOut"
            class="button border p-2 rounded-xl bg-marron hover:bg-verde"
          >
            Log out
          </button>
        </li>
      </ul>
    </div>
  </nav>
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
console.log(getEmail)

// constant that calls user email from the useUSerStore
;

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
