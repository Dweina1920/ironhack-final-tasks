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
              <input type="file" @change="fileUploaded" class="mt-4 bg-verde rounded-xl"/>
                <button @click="upload" class=" bg-verdeoscuro p-2 mt-4 border-verdeoscuro rounded-xl w-full" >Upload</button>
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
                    value=""
                  />
                </div>

                <div class="md:col-span-5">
                  <label for="email">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value=""
                    placeholder="email@domain.com"
                  />
                </div>

                <div class="md:col-span-5">
                  <label for="email">Created At</label>
                  <input
                    type="date"
                    name="email"
                    id="email"
                    class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value=""
                    placeholder="email@domain.com"
                  />
                </div>

                <div class="md:col-span-5 text-right">
                  <div class="inline-flex items-end">
                    <button
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Submit
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



      function fileUploaded(event) {
        console.log(event.target.files[0].name) //here is the original name
        this.selectedFile = event.target.files[0]
      }

     function upload() {
       let fd = new FormatData()
       fd.append('image', this.selectedFile, 'GiveItAnotherNameHere')
       axios.post('url', fd) //upload it to backend
      }

</script>

<style scoped></style>
