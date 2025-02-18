<template>
  <div class="container">
    <div class="form-container">
      <div class="header">
        <div class="logo-section">
          <img src="@/assets/pet-logo.png" alt="Logo" class="logo">
          <h2 class="title">새 계정 만들기</h2>
          <p class="subtitle">펫시터 찾기 서비스에 가입하세요</p>
        </div>
      </div>
      
      <form class="signup-form" @submit.prevent="handleSignup">
        <div class="form-group">
          <label for="userType">회원 유형</label>
          <div class="user-type-options">
            <label class="user-type-label">
              <input type="radio" v-model="userType" value="user" required />
              유저
            </label>
            <label class="user-type-label">
              <input type="radio" v-model="userType" value="petsitter" required />
              펫시터
            </label>
          </div>
        </div>

        <div class="form-group">
          <label for="email">이메일 주소</label>
          <input id="email" name="email" type="email" v-model="email" required>
        </div>

        <div class="form-group">
          <label for="password">비밀번호</label>
          <input id="password" name="password" type="password" v-model="password" required>
        </div>

        <div class="form-group">
          <label for="name">이름</label>
          <input id="name" name="name" type="text" v-model="name" required>
        </div>

        <div class="form-group">
          <label for="phone">전화번호</label>
          <input id="phone" name="phone" type="tel" v-model="phone" required>
        </div>

        <button type="submit" class="submit-btn">회원가입</button>
      </form>

      <div class="divider">
        <span>또는</span>
      </div>

      <div class="additional-links">
        <button class="link-btn" @click="goToMain">메인으로 돌아가기</button>
        <div class="auth-links">
          <a href="#" @click="goToLogin" class="link">이미 계정이 있으신가요? 로그인하기</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import store from '../store'; // Import the store

declare const alert: (message: string) => void;

export default defineComponent({
  name: 'Signup',
  setup() {
    const email = ref('');
    const password = ref('');
    const name = ref('');
    const phone = ref('');
    const userType = ref('user'); // 기본값으로 유저 선택
    const router = useRouter();

    const handleSignup = async () => {
      try {
        // 회원가입 요청 URL 결정
        const signupUrl = userType.value === 'petsitter' 
          ? 'http://localhost:8080/api/v1/user/petsitter/register' 
          : 'http://localhost:8080/api/v1/user/register';

        // 1. 회원가입 요청
        const signupResponse = await axios.post(signupUrl, {
          email: email.value,
          password: password.value,
          name: name.value,
          phone: phone.value,
          userType: userType.value // 회원 유형 추가
        });

        if (signupResponse.status === 200) {
          console.log('회원가입 성공:', signupResponse.data);

          // 2. 회원가입 성공 후 자동 로그인 요청
          const loginResponse = await axios.post('http://localhost:8080/api/v1/user/login', {
            email: email.value,
            password: password.value
          });

          if (loginResponse.status === 200) {
            // 3. 로그인 성공 시 토큰과 이메일 저장
            localStorage.setItem('token', loginResponse.data.token);
            localStorage.setItem('userEmail', email.value);
            
            // 4. 헤더 상태 업데이트
            window.dispatchEvent(new Event('user-logged-in')); // Emit an event to update the header

            // 5. 메인 페이지로 이동
            router.push('/main');

            // 로그인 성공 후
            store.commit('setUserRole', loginResponse.data.role); // 사용자 역할 설정
          } else {
            alert('로그인에 실패했습니다. 다시 시도해주세요.'); // 로그인 실패 처리
          }
        }
      } catch (error) {
        console.error('회원가입 실패:', error);
        alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    };

    return {
      email,
      password,
      name,
      phone,
      userType, // 회원 유형 추가
      handleSignup,
      goToLogin: () => router.push('/login'),
      goToMain: () => router.push('/main')
    };
  }
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  min-height: calc(100vh - 160px); /* 헤더와 푸터 높이를 고려한 수정 */
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
  color: #2c3e50;
  margin: 0;
  background: linear-gradient(120deg, #007BFF, #00a1ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 16px;
  color: #666;
  margin: 0;
  font-weight: 500;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-size: 15px;
  color: #555;
  margin-bottom: 0.8rem;
  font-weight: 500;
}

.user-type-options {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
}

.user-type-label {
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #555;
}

.user-type-label input {
  margin-right: 5px; /* 라디오 버튼과 텍스트 간격 */
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 2px solid #e1e1e1;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.3s ease;
}

.form-group input:focus {
  border-color: #007BFF;
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2);
}

.divider {
  text-align: center;
  margin: 2rem 0;
  position: relative;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 45%;
  height: 1px;
  background-color: #e1e1e1;
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.divider span {
  background-color: #fff;
  padding: 0 1rem;
  color: #888;
  font-size: 14px;
}

.link-btn {
  width: 100%;
  padding: 12px;
  background-color: #f8f9fa;
  border: 2px solid #e1e1e1;
  border-radius: 8px;
  color: #555;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
}

.link-btn:hover {
  background-color: #e9ecef;
  transform: translateY(-2px);
}

.auth-links {
  text-align: center;
}

.link {
  color: #007BFF;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
}

.link:hover {
  text-decoration: underline;
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
