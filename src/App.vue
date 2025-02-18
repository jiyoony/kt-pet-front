<script setup lang="ts">
import { ref } from 'vue'
import Header from './components/common/Header.vue'
import Footer from './components/common/Footer.vue'

const headerRef = ref(null)

const handleLoginSuccess = () => {
  // Call the checkLoginStatus method on the Header component
  if (headerRef.value) {
    headerRef.value.checkLoginStatus(); // Ensure this method exists
  }
}
</script>

<template>
  <div class="app-container">
    <Header ref="headerRef" />
    <main class="main-content">
      <router-view @login-success="handleLoginSuccess" />
    </main>
    <Footer />
  </div>
</template>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 전체 뷰포트 높이 사용 */
}

.main-content {
  flex: 1;
  padding-top: 80px; /* 헤더 높이만큼 여백 */
  display: flex;
  flex-direction: column;
}
</style>
