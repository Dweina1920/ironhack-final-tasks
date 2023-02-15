<template>
  <Nav />
  <div class="mt-16 flex items-center justify-center">
    <div class="container max-w-screen-lg mx-auto">
      <div class="">
        <div class="bg-verde rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
            <div class="text-a flex flex-col justify-center items-center m-12">
              <img
                :src="
                  avatar_url
                    ? avatar_url
                    : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png'
                "
                alt="Profile picture"
              />

              <!--falta la logica del cambio de imagen-->
              <input
                type="file"
                @change="fileUploaded"
                class="mt-4 bg-verde rounded-xl"
                accept=".jpg, .jpeg, .png, .gif"
              />
              <button
                @change="uploadAvatar"
                class="bg-verdeoscuro p-2 mt-4 border-verdeoscuro rounded-xl w-full"
              >
                Upload
              </button>
            </div>

            <div class="lg:col-span-2">
              <p class="font-medium text-lg text-center">Personal Details</p>
              <div
                class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5"
              >
                <div class="md:col-span-5">
                  <label for="full_name">Full Name</label>
                  <input
                    type="text"
                    name="full_name"
                    id="full_name"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    v-model="full_name"
                  />
                </div>

                <div class="md:col-span-5">
                  <label for="full_name">Username</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    v-model="username"
                  />
                </div>

                <div class="md:col-span-5">
                  <label for="email">Email </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder="email@domain.com"
                    v-model="email"
                  />
                </div>

                <div class="md:col-span-5">
                  <label for="website">Website </label>
                  <input
                    type="text"
                    name="website"
                    id="website"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder="Website..."
                    v-model="website"
                  />
                </div>

                <div class="md:col-span-5 text-right">
                  <div class="inline-flex items-end">
                    <button
                      @click.prevent="editProfileSupabase"
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Save
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

  <Footer />
</template>

<script setup>
import Nav from "../components/Nav.vue";
import Footer from "../components/Footer.vue";
import { supabase } from "../supabase";
import { onMounted, ref, toRefs } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

// declarar variable de la UserStore
const userStore = useUserStore();
// Variables para guardar los datos del usuario
const loading = ref(false);
const website = ref(null);
const avatar_url = ref(null);
const email = ref(null);
const full_name = ref(null);
const username = ref(null);
const redirect = useRouter();

// Ejecutar la funcion getProfile al actualizar la página
onMounted(() => {
  getProfile();
});

// Función para traer los datos del perfil desde la store
async function getProfile() {
  await userStore.fetchUser();
  username.value = userStore.profile.username;
  avatar_url.value = userStore.profile.avatar_url;
  email.value = userStore.profile.email;
  full_name.value = userStore.profile.full_name;
  website.value = userStore.profile.website;
}


// funcion para editar perfil
async function editProfileSupabase() {
  if (
    website.value.length === 0  ||
    email.value.length === 0 ||
    username.value.length === 0
  ) {
    alert("The information can not be empty");
  } else { 
   
    await userStore.fetchUser();
    await userStore.editProfileSupabase(email.value, website.value, avatar_url.value, username.value, full_name.value);
    redirect.push({ path: "/account" });
  }

}




</script>

<style scoped></style>
