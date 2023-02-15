<template>
  <Nav />

  <div class="mt-16 mx-16 flex items-center justify-center">
    <div class="container max-w-screen-lg mx-auto">
      <div class="">
        <div class="bg-verde rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
            <div class="text-gray-600">
              <img
                :src="
                  avatar_url
                    ? avatar_url
                    : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
                "
                alt="Profile picture"
              />
            </div>

            <div class="lg:col-span-2">
              <p class="font-bold text-xl">Personal Details</p>
              <div
                class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5"
              >
                <div
                  class="md:col-span-5 flex row items-center justify-between"
                >
                  <p class="font-bold text-lg">Username:</p>
                  <p class="border p-2 rounded-xl bg-white w-3/4">
                    {{ username }}
                  </p>
                </div>

                <div
                  class="md:col-span-5 flex row items-center justify-between"
                >
                  <p class="font-bold text-lg">Email:</p>
                  <p class="border p-2 rounded-xl bg-white w-3/4">
                    {{ email }}
                  </p>
                </div>

                <div
                  class="md:col-span-5 flex row items-center justify-between"
                >
                  <p class="font-bold text-lg">Creation date:</p>
                  <p class="border p-2 rounded-xl bg-white w-3/4">
                    {{ created_at ? created_at.split("T")[0] : created_at }}
                  </p>
                </div>

                <div
                  class="md:col-span-5 flex row items-center justify-between"
                >
                  <p class="font-bold text-lg">Full name:</p>
                  
                  <p  class="border p-2 rounded-xl bg-white w-3/4">
                    {{ fullname }}
                  </p>
                </div>

                <div
                  class="md:col-span-5 flex row items-center justify-between"
                >
                  <p class="font-bold text-lg">Website:</p>
                 
                  <p  class="border p-2 rounded-xl bg-white w-3/4">
                    {{ website }}
                  </p>
                </div>
                <div class="md:col-span-5 text-right">
                  <div class="inline-flex items-end">
                    <button
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      <router-link to="/editaccount">Edit</router-link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { supabase } from "../supabase";
import { onMounted, ref, toRefs } from "vue";
import { useUserStore } from "../stores/user";
import Nav from "../components/Nav.vue";

const userStore = useUserStore();

const loading = ref(false);

const website = ref(null);
const avatar_url = ref(null);
const email = ref(null);
const created_at = ref(null);
const fullname = ref(null);
const username = ref(null);

onMounted(() => {
  getProfile();
});

async function getProfile() {
  await userStore.fetchUser();
  username.value = userStore.profile.username;
  avatar_url.value = userStore.profile.avatar_url;
  email.value = userStore.profile.email;
  created_at.value = userStore.profile.created_at;
  fullname.value = userStore.profile.full_name;
  website.value = userStore.profile.website;
}

async function signOut() {
  try {
    loading.value = true;
    let { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}
</script>

<style>
img {
  width: 200px;
  border-radius: 50%;
}
</style>
