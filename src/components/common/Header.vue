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
          <span class="user-email">{{ userEmail }}</span>
          <button class="mypage" @click="goToProfile">마이페이지</button>
          <button class="logout" @click="handleLogout">로그아웃</button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Header',
  data() {
    return {
      isLoggedIn: false,
      userEmail: ''
    }
  },
  mounted() {
    this.checkLoginStatus();
  },
  methods: {
    goToMain() {
      this.$router.push('/main');
    },
    goToLogin() {
      this.$router.push('/login');
    },
    goToSignup() {
      this.$router.push('/signup');
    },
    goToProfile() {
      this.$router.push('/user-profile');
    },
    handleLogout() {
      // 세션 로그아웃 요청
      axios.post('http://localhost:8080/api/v1/user/logout', {}, {
        withCredentials: true
      }).then(() => {
        localStorage.removeItem('userEmail');
        this.isLoggedIn = false;
        this.userEmail = '';
        this.$router.push('/main');
      }).catch(error => {
        console.error('로그아웃 실패:', error);
      });
    },
    checkLoginStatus() {
      const email = localStorage.getItem('userEmail');
      if (email) {
        // 세션 상태 확인
        axios.get('http://localhost:8080/api/v1/user/check-login', {
          withCredentials: true
        }).then(() => {
          this.isLoggedIn = true;
          this.userEmail = email;
        }).catch(() => {
          // 세션이 없으면 로컬 스토리지도 클리어
          this.isLoggedIn = false;
          this.userEmail = '';
          localStorage.removeItem('userEmail');
        });
      }
    }
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
  transition: all 0.3s ease;
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