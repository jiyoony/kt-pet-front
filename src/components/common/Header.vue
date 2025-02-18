<template>
  <header class="header">
    <nav class="nav">
      <div class="logo" @click="goToMain">
        <img src="@/assets/pet-logo.png" alt="Logo">
        <span class="black-text">펫시터 찾기</span>
      </div>
      <div class="nav-buttons">
        <!-- 로그인 상태가 아닐 때 -->
        <template v-if="!isLoggedIn">
          <button class="login" @click="goToLogin">로그인</button>
          <button class="signup" @click="goToSignup">회원가입</button>
        </template>
        <!-- 로그인 상태일 때 -->
        <div v-else class="user-info">
          <span class="user-email" @click="goToProfile">{{ userEmail }}</span>
          <button class="mypage" @click="goToProfile">마이페이지</button>
          <button class="logout" @click="logout">로그아웃</button>
        </div>
      </div>
      <router-link v-if="isLoggedIn && !isAdmin" to="/reservations">예약 목록 보기</router-link>
      <router-link v-if="isLoggedIn && isAdmin" to="/animal-code-manager">동물 코드 관리</router-link>
    </nav>
  </header>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import store from '@/store/index';

export default {
  name: 'Header',
  setup() {
    const userEmail = ref(localStorage.getItem('userEmail'));
    const router = useRouter();
    const isLoggedIn = ref(!!userEmail.value);
    const isAdmin = ref(store.state.userRole === 'admin');

    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
      userEmail.value = null;
      isLoggedIn.value = false;
      window.location.reload();
    };

    const goToMain = () => {
      router.push('/');
    };

    const goToLogin = () => {
      router.push('/login');
    };

    const goToSignup = () => {
      router.push('/signup');
    };

    const goToProfile = () => {
      router.push('/user-profile');
    };

    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('userEmail');
      if (token && email) {
        isLoggedIn.value = true;
        userEmail.value = email;
        isAdmin.value = store.state.userRole === 'admin'; // 관리자 여부 확인
      }
    };

    onMounted(() => {
      checkLoginStatus(); // 컴포넌트가 마운트될 때 상태 확인
    });

    return {
      userEmail,
      isLoggedIn,
      isAdmin,
      logout,
      goToMain,
      goToLogin,
      goToSignup,
      goToProfile,
      checkLoginStatus
    };
  }
}
</script>

<style scoped>
.header {
  background: white;
  padding: 1rem;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.nav {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
}

.logo img {
  height: 40px;
  object-fit: contain;
}

.nav-buttons {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.login, .signup, .logout {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
}

.login {
  background: #007bff;
  color: white;
}

.signup {
  background: #28a745;
  color: white;
}

.logout {
  background: #dc3545;
  color: white;
}

.mypage {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #17a2b8;
  color: white;
}

.mypage:hover {
  background: #138496;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-email {
  color: #333;
  font-weight: 500;
  cursor: default;
}
</style> 