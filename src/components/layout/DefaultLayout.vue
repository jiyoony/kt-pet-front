<template>
  <div class="layout">
    <header class="header">
      <nav class="nav">
        <div class="logo">
          <img src="@/assets/pet-logo.png" alt="Logo" @click="goToMain">
          <span class="black-text">펫시터 찾기</span>
        </div>
        <div class="nav-buttons">
          <button class="login" @click="goToLogin">로그인</button>
          <button class="signup" @click="goToSignup">회원가입</button>
        </div>
      </nav>
    </header>

    <main>
      <slot></slot>
    </main>

    <footer class="footer">
      <p>&copy; 2025 펫시터 찾기. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  methods: {
    goToLogin() {
      this.$router.push('/login');
    },
    goToSignup() {
      this.$router.push('/signup');
    },
    goToMain() {
      this.$router.push('/main');
    }
  }
}
</script>

<style scoped>
/* 기존 header, nav, footer 스타일을 여기로 이동 */
</style> 