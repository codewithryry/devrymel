<!-- 
  Copyright (c) 2026 Reymel Mislang
  Mindoro State University (MINSU) - Calapan Campus, Philippines
 -->
<template>
  <div class="home-container">
    <PersonalProfile />
  </div>
</template>

<script>
import PersonalProfile from '@/components/profile/PersonalProfile.vue'

export default {
  name: 'HomeView',
  components: {
    PersonalProfile
  }
}
</script>

<style scoped>
.home-container {
  width: 100%;
}
</style>