<template>
  <NavDos />
  <div class="mt-16 flex items-center justify-center mx-4">
    <div class="container max-w-screen-lg mx-auto">
      <div class="">
        <div class="bg-verde rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
            <div class="text-a flex flex-col justify-center items-center ">
              <img
                v-if="src"
                class="profile-img m-auto h-40 w-40 md:h-60 md:w-60"
                :src="src"
                alt="Profile picture"
              />

              <!--falta la logica del cambio de imagen-->

              <input
                @change="uploadAvatar"
                class=" block w-full my-8 text-xs text-gray-900 border border-gray-300  cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="small_size"
                type="file"
              />
              

            </div>

            <div class="lg:col-span-2">
              
              <div
                class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5"
              >
                <div class="md:col-span-5 my-4 lg:my-0">
                  <label for="full_name" class="text-xl  lg:text-lg ">Full Name</label>
                  <input
                    type="text"
                    name="full_name"
                    id="full_name"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    v-model="full_name"
                  />
                </div>

                <div class=" md:col-span-5 my-4 lg:my-0">
                  <label for="full_name" class="text-xl lg:text-lg">Username</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    class=" h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    v-model="username"
                  />
                </div>

                <div class="md:col-span-5 my-4 lg:my-0">
                  <label for="email" class="text-xl lg:text-lg">Email </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder="email@domain.com"
                    v-model="email"
                  />
                </div>

                <div class="md:col-span-5 my-4 lg:my-0">
                  <label for="website" class="text-xl lg:text-lg">Website </label>
                  <input
                    type="text"
                    name="website"
                    id="website"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    placeholder="Website..."
                    v-model="website"
                  />
                </div>

                <div class="md:col-span-5 text-center lg:text-right">
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
import NavDos from "../components/NavDos.vue";
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
  uploadAvatar();
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
    website.value.length === 0 ||
    email.value.length === 0 ||
    username.value.length === 0
  ) {
    alert("The information can not be empty");
  } else {
    await userStore.fetchUser();
    await userStore.editProfileSupabase(
      email.value,
      website.value,
      avatar_url.value,
      username.value,
      full_name.value
    );
    redirect.push({ path: "/account" });
  }
}

//funcion para actulizar imagen de perfil
// -------------------------------------------
// variables
const prop = defineProps(["path", "size"]);
const { path, size } = toRefs(prop);

const emit = defineEmits(["upload", "update:path"]);
const uploading = ref(false);
const src = ref("");
const files = ref();

const uploadAvatar = async (evt) => {
  files.value = evt.target.files;
  try {
    uploading.value = true;
    if (!files.value || files.value.length === 0) {
      throw new Error("You must select an image to upload.");
    }

    const file = files.value[0];
    const fileExt = file.name.split(".").pop();
    const filePath = `${Math.random()}.${fileExt}`;

    let { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);
    avatar_url.value = filePath;

    if (uploadError) throw uploadError;
    emit("update:path", filePath);
    emit("upload");
    await downloadImage(filePath);
  } catch (error) {
    alert(error.message);
  } finally {
    uploading.value = false;
  }
};

const downloadImage = async (imageUrl) => {
  try {
    const { data, error } = await supabase.storage
      .from("avatars")
      .download(imageUrl);
    if (error) throw error;
    src.value = URL.createObjectURL(data);
  } catch (error) {
    console.error("Error downloading image: ", error.message);
  }
};
</script>

<style scoped></style>
