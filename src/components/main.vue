<template>
  <div id="app">

    <main>
      <section class="hero">
        <div class="hero-content">
          <h1 class="black-text">믿을 수 있는 펫시터를 찾아보세요</h1>
          <p class="black-text">전문 펫시터가 여러분의 소중한 반려동물을 돌봐드립니다</p>
          <input type="text" placeholder="지역을 입력하세요">
        </div>
      </section>

      <section class="features">
        <h2 class="black-text">왜 저희 서비스를 이용해야 할까요?</h2>
        <div class="feature-list">
          <div class="feature-card">
            <i class="fas fa-check-circle"></i>
            <h3 class="black-text">검증된 펫시터</h3>
            <p class="black-text">모든 펫시터는 엄격한 심사 과정을 거쳐 선발됩니다.</p>
          </div>
          <div class="feature-card">
            <i class="fas fa-calendar-alt"></i>
            <h3 class="black-text">유연한 예약</h3>
            <p class="black-text">원하는 날짜와 시간에 맞춰 펫시터를 예약할 수 있습니다.</p>
          </div>
        </div>
      </section>

      <section class="cta">
        <h2 class="black-text">지금 바로 펫시터 찾기를 시작하세요</h2>
        <p class="black-text">여러분의 소중한 반려동물에게 최고의 돌봄을 선사하세요</p>
        <button class="cta-button" @click="goToPetSitterList">펫시터 찾기</button>
      </section>
    </main>

  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false,
      userEmail: ''
    }
  },
  mounted() {
    // 스크롤 애니메이션
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1
      }
    );

    document.querySelectorAll('.feature-card, .cta').forEach(el => {
      el.classList.add('scroll-fade');
      observer.observe(el);
    });

    // 페이지 로드 시 로그인 상태 확인
    this.checkLoginStatus();
  },
  methods: {
    goToLogin() {
      this.$router.push('/login');
    },
    goToSignup() {
      this.$router.push('/signup');
    },
    handleLogout() {
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
      this.isLoggedIn = false;
      this.userEmail = '';
      this.$router.push('/login');
    },
    checkLoginStatus() {
      const token = localStorage.getItem('token');
      const email = localStorage.getItem('userEmail');
      if (token && email) {
        this.isLoggedIn = true;
        this.userEmail = email;
      }
    },
    goToProfile() {
      this.$router.push('/user-profile');
    },
    goToPetSitterList() {
      this.$router.push('/pet-sitter-list');
    }
  }
};
</script>

<style>
/* 기본 스타일 */
:root {
  --primary-color: #007bff;
  --success-color: #28a745;
  --dark-color: #343a40;
  --light-color: #f8f9fa;
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Noto Sans KR', Arial, sans-serif;
  background-color: var(--light-color);
  min-height: 100vh;
  width: 100%;
  line-height: 1.6;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 헤더 스타일 */
.header {
  background: white;
  padding: 1rem;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: var(--transition);
}

.header:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.nav {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}

/* 로고 스타일 */
.logo {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: var(--transition);
}

.logo:hover {
  transform: scale(1.02);
}

.logo img {
  height: 40px;
  object-fit: contain;
}

/* 버튼 스타일 */
.nav-buttons button {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  position: relative;
  overflow: hidden;
}

.nav-buttons button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.login {
  background: var(--primary-color);
  color: white;
  margin-right: 1rem;
}

.signup {
  background: var(--success-color);
  color: white;
}

/* 히어로 섹션 */
.hero {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 5rem 1rem;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: var(--dark-color);
  animation: fadeInUp 0.8s ease;
}

.hero p {
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
  color: #666;
  animation: fadeInUp 1s ease;
}

.hero input {
  padding: 1rem 1.5rem;
  width: 100%;
  max-width: 400px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: var(--transition);
  animation: fadeInUp 1.2s ease;
}

.hero input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

/* 특징 섹션 */
.features {
  padding: 5rem 1rem;
  background: white;
  text-align: center;
}

.features h2 {
  color: #333;
  margin-bottom: 2rem;
  font-size: 2rem;
}

.feature-list {
  max-width: 1200px;
  margin: 3rem auto 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 0 1rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: var(--transition);
  cursor: pointer;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.feature-card i {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

/* CTA 섹션 */
.cta {
  background: linear-gradient(135deg, var(--primary-color) 0%, #0056b3 100%);
  padding: 5rem 1rem;
  text-align: center;
  color: white;
}

.cta-button {
  background: white;
  color: var(--primary-color);
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  transition: var(--transition);
  margin-top: 2rem;
}

.cta-button:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

/* 푸터 */
.footer {
  background: var(--dark-color);
  color: white;
  text-align: center;
  padding: 2rem 1rem;
}

/* 애니메이션 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.5rem;
  }
  
  .nav {
    padding: 0 0.5rem;
  }
  
  .nav-buttons button {
    padding: 0.6rem 1rem;
  }
  
  .feature-card {
    padding: 1.5rem;
  }
}

/* 스크롤 애니메이션 */
.scroll-fade {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.scroll-fade.visible {
  opacity: 1;
  transform: translateY(0);
}

/* 텍스트 색상 관련 스타일 */
.black-text {
  color: #333; /* 부드러운 검정색 */
}

.hero h1, .hero p {
  color: #333;
}

.features h2 {
  color: #333;
}

.feature-card h3, .feature-card p {
  color: #333;
}

/* CTA 섹션은 배경이 컬러풀하므로 흰색 텍스트 유지 */
.cta h2, .cta p {
  color: white;
}

/* 푸터는 어두운 배경이므로 흰색 텍스트 유지 */
.footer p {
  color: white;
}

/* 사용자 정보 스타일 */
.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-icon {
  font-size: 1.2rem;
  color: #333;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.user-icon:hover {
  background-color: #f0f0f0;
  transform: translateY(-2px);
}

.user-email {
  color: #333;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.user-email:hover {
  color: #007BFF;
  transform: translateY(-2px);
}

.logout {
  background: #dc3545;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout:hover {
  background: #c82333;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.nav-buttons {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>