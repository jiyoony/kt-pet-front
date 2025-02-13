<template>
  <div class="container">
    <!-- Navigation -->
    <nav class="navbar">
      <div class="navbar-content">
        <div class="logo">
        </div>
        <div class="nav-links">
          <a v-for="link in navigationLinks" 
             :key="link.text" 
             :href="link.href">
            {{ link.text }}
          </a>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <div class="hero-section">
      <h1>당신의 반려동물을 위한 최고의 서비스</h1>
      <p>펫 케어 서비스를 통해 다양한 혜택을 누려보세요!</p>
      <button>웹 대표 사진</button>
    </div>

    <!-- Promotion Section -->
    <div class="promotion-section">
      <h2>홍보 자료</h2>
      <div class="promotion-items">
        <div v-for="(item, index) in promotionItems" 
             :key="index"
             class="promotion-item">
          <h3>{{ item.title }}</h3>
          <p>{{ item.content }}</p>
        </div>
      </div>
    </div>

    <!-- Services Section -->
    <div class="services-section">
      <h2>우리의 서비스</h2>
      <div class="service-items">
        <div v-for="service in services" 
             :key="service.title"
             class="service-item">
          <component :is="service.icon" class="service-icon" />
          <h3>{{ service.title }}</h3>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="footer">
      <p>&copy; {{ new Date().getFullYear() }} 회사명. 모든 권리 보유.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { User, ShoppingBag } from 'lucide-vue-next'

const navigationLinks = ref([
  { text: '회원가입', href: '#' },
  { text: '로그인', href: '#' },
  { text: '마이페이지', href: '#' }
])

const promotionItems = ref([
  { title: '홍보 자료', content: '펫 케어 서비스의 특별한 장점과 혜택을 소개합니다.' },
  { title: '홍보 자료', content: '전문 펫시터가 제공하는 맞춤형 돌봄 서비스를 만나보세요.' },
  { title: '홍보 자료', content: '반려동물을 위한 최고의 선택, 저희와 함께하세요.' }
])

const services = ref([
  { title: '펫시터 서비스', icon: User },
  { title: '쇼핑몰 서비스', icon: ShoppingBag }
])
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f9f9f9;
}

.navbar {
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo img {
  height: 48px;
  width: 48px;
  border-radius: 50%;
}

.nav-links a {
  margin-left: 16px;
  text-decoration: none;
  color: #4a4a4a;
  transition: background-color 0.3s;
}

.nav-links a:hover {
  background-color: #f0f0f0;
  padding: 8px 12px;
  border-radius: 4px;
}

.hero-section {
  background-color: #fcd34d;
  padding: 50px 20px;
  text-align: center;
}

.hero-section h1 {
  font-size: 2.5rem;
  color: #3b3b3b;
}

.hero-section p {
  color: #4b5563;
  margin-top: 10px;
}

.hero-section button {
  margin-top: 20px;
  background-color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  color: #3b3b3b;
  cursor: pointer;
  transition: background-color 0.3s;
}

.hero-section button:hover {
  background-color: #f0f0f0;
}

.promotion-section {
  padding: 40px 20px;
  background-color: white;
  text-align: center;
}

.promotion-section h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #3b3b3b;
}

.promotion-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.promotion-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  transition: box-shadow 0.3s;
}

.promotion-item:hover {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.services-section {
  padding: 40px 20px;
  background-color: #f9f9f9;
  text-align: center;
}

.services-section h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #3b3b3b;
}

.service-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.service-item {
  background-color: #e0f2fe;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  transition: background-color 0.3s;
  cursor: pointer;
}

.service-item:hover {
  background-color: #bbdefb;
}

.service-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 20px;
  color: #3b82f6;
}

.footer {
  background-color: #f3f4f6;
  padding: 20px;
  text-align: center;
  color: #6b7280;
}
</style>
