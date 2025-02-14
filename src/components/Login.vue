<template>
  <div class="container">
    <div class="form-container">
      <div class="header">
        <div class="logo-section">
          <img src="@/assets/pet-logo.png" alt="Logo" class="logo">
          <h2 class="title">Welcome Back!</h2>
          <p class="subtitle">펫시터 찾기 서비스에 오신 것을 환영합니다</p>
        </div>
      </div>
      
      <form class="login-form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">이메일 주소</label>
          <input id="email" name="email" type="email" v-model="email" required>
        </div>

        <div class="form-group">
          <label for="password">비밀번호</label>
          <input id="password" name="password" type="password" v-model="password" required>
        </div>

        <div class="remember-me">
          <input id="remember-me" name="remember-me" type="checkbox" v-model="rememberMe">
          <label for="remember-me">로그인 상태 유지</label>
        </div>

        <button type="submit" class="submit-btn">로그인</button>
      </form>

      <div class="divider">
        <span>또는</span>
      </div>

      <div class="additional-links">
        <button class="link-btn" @click="goToMain">메인으로 돌아가기</button>
        <div class="auth-links">
          <a href="#" class="link">비밀번호 찾기</a>
          <span class="separator">|</span>
          <a href="#" @click="goToSignup" class="link">회원가입</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Header from '@/components/common/Header.vue';

declare const window: Window & typeof globalThis;

export default defineComponent({
  name: 'Login',
  emits: ['login-success'],
  setup(props, { emit }) {
    const email = ref('');
    const password = ref('');
    const rememberMe = ref(false);
    const router = useRouter();
    const headerRef = ref(null);

    const goToSignup = () => {
      router.push('/signup');
    };

    const goToMain = () => {
      router.push('/main');
    };

    const handleLogin = async () => {
      try {
        const response = await axios.post('http://localhost:8080/api/v1/user/login', {
          email: email.value,
          password: password.value
        }, {
          withCredentials: true
        });

        if (response.status === 200) {
          localStorage.setItem('userEmail', email.value);
          emit('login-success');
          await router.push('/main');
        }
      } catch (error) {
        console.error('로그인 실패:', error);
        window.alert('로그인에 실패했습니다.');
      }
    };

    return {
      email,
      password,
      rememberMe,
      handleLogin,
      goToSignup,
      goToMain,
      headerRef
    };
  }
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 80px); /* 헤더 높이만큼 뺀 높이 */
  padding: 2rem;
  background-color: #f4f4f9;
}

.form-container {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  width: 100%;
  max-width: 450px;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.logo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.logo {
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-bottom: 0.5rem;
}

.title {
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin: 0;
}

.subtitle {
  font-size: 16px;
  color: #333;
  margin: 0;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #333;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #0056b3;
}

.divider {
  margin: 2rem 0;
  text-align: center;
  position: relative;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 45%;
  height: 1px;
  background-color: #ddd;
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.divider span {
  background-color: white;
  padding: 0 1rem;
  color: #333;
}

.additional-links {
  text-align: center;
}

.link-btn {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.auth-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.link {
  color: #333;
  text-decoration: none;
}

.separator {
  color: #333;
}

@media (max-width: 768px) {
  .form-container {
    padding: 2rem;
  }
  
  .title {
    font-size: 28px;
  }
  
  .subtitle {
    font-size: 14px;
  }
  
  .logo {
    width: 50px;
    height: 50px;
  }
}
</style>
