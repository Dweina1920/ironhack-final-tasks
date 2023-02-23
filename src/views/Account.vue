<template>
<NavDos />

<Suspense>
  <Profile />
  <template #fallback>
    <Skeleton />
  </template>

</Suspense>

  <Footer />
</template>

<script setup>
import Profile from "../components/Profile.vue"
import NavDos from "../components/NavDos.vue"
import Footer from "../components/Footer.vue"
import Skeleton from "../components/Skeleton.vue"
</script>

<style>
img {
  width: 200px;
  border-radius: 50%;
}
</style>
