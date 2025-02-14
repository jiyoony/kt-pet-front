<template>
  <div class="pet-sitter-list">
    <h1>펫시터 목록</h1>
    
    <!-- 필터 섹션 -->
    <div class="filters">
      <div class="filter-group">
        <select v-model="selectedLocation" class="filter-select">
          <option value="">모든 지역</option>
          <option value="서울특별시">서울특별시</option>
          <option value="경기도">경기도</option>
          <option value="인천광역시">인천광역시</option>
          <option value="부산광역시">부산광역시</option>
          <option value="대구광역시">대구광역시</option>
          <option value="광주광역시">광주광역시</option>
          <option value="대전광역시">대전광역시</option>
          <option value="울산광역시">울산광역시</option>
        </select>
      </div>

      <div class="filter-group">
        <select v-model="selectedPetType" class="filter-select">
          <option value="">모든 동물</option>
          <option value="강아지">강아지</option>
          <option value="고양이">고양이</option>
          <option value="토끼">토끼</option>
          <option value="햄스터">햄스터</option>
          <option value="새">새</option>
          <option value="고슴도치">고슴도치</option>
        </select>
      </div>
    </div>

    <div class="sitter-grid">
      <div v-for="sitter in filteredPetSitters" :key="sitter.id" class="sitter-card">
        <img :src="sitter.image" :alt="sitter.name" class="sitter-image">
        <div class="sitter-info">
          <div class="sitter-header">
            <h2 class="sitter-name">{{ sitter.name }}</h2>
            <div class="rating">
              <span class="stars">⭐ {{ sitter.rating || '4.5' }}</span>
            </div>
          </div>
          <div class="sitter-details">
            <p class="price">💰 {{ sitter.price?.toLocaleString() || '0' }}원/시간</p>
            <p class="schedule">
              🕒 {{ formatDateTime(sitter.startAt) }} ~ {{ formatDateTime(sitter.endAt) }}
            </p>
            <p class="location">📍 {{ sitter.location || '-' }}</p>
            <p class="pet-types">
              <span class="tags">
                <span v-for="type in getPetTypes(sitter.availablePetTypes)" 
                      :key="type" 
                      class="pet-tag">
                  {{ type }}
                </span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PetSitterList',
  data() {
    return {
      isLoggedIn: false,
      userEmail: '',
      selectedLocation: '',
      selectedPetType: '',
      petSitters: [
        {
          id: 1,
          userId: 1,
          price: 15000,
          startAt: "2024-03-20T09:00:00",
          endAt: "2024-03-20T18:00:00",
          availablePetTypes: "강아지,고양이",
          location: "서울특별시",
          image: 'https://picsum.photos/200/300',
          name: '김펫시터'
        },
        {
          id: 2,
          userId: 2,
          price: 18000,
          startAt: "2024-03-20T10:00:00",
          endAt: "2024-03-20T19:00:00",
          availablePetTypes: "강아지,토끼",
          location: "경기도",
          image: 'https://picsum.photos/200/301',
          name: '이펫시터'
        },
        {
          id: 3,
          userId: 3,
          price: 20000,
          startAt: "2024-03-20T08:00:00",
          endAt: "2024-03-20T17:00:00",
          availablePetTypes: "고양이,햄스터",
          location: "인천광역시",
          image: 'https://picsum.photos/200/302',
          name: '박펫시터'
        },
        {
          id: 4,
          userId: 4,
          price: 17000,
          startAt: "2024-03-20T11:00:00",
          endAt: "2024-03-20T20:00:00",
          availablePetTypes: "강아지,고양이,새",
          location: "경기도",
          image: 'https://picsum.photos/200/303',
          name: '최펫시터'
        },
        {
          id: 5,
          userId: 5,
          price: 16000,
          startAt: "2024-03-20T09:00:00",
          endAt: "2024-03-20T18:00:00",
          availablePetTypes: "강아지,고슴도치",
          location: "인천광역시",
          image: 'https://picsum.photos/200/304',
          name: '정펫시터'
        }
      ]
    }
  },
  computed: {
    filteredPetSitters() {
      return this.petSitters.filter(sitter => {
        const locationMatch = !this.selectedLocation || sitter.location === this.selectedLocation;
        const petTypeMatch = !this.selectedPetType || sitter.availablePetTypes.includes(this.selectedPetType);
        return locationMatch && petTypeMatch;
      });
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
    formatDateTime(dateTime) {
      if (!dateTime) return '-';
      try {
        const date = new Date(dateTime);
        if (isNaN(date.getTime())) return '-';
        return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
      } catch (error) {
        return '-';
      }
    },
    getPetTypes(types) {
      if (!types) return ['정보없음'];
      try {
        return types.split(',').map(type => type.trim()).filter(type => type);
      } catch (error) {
        return ['정보없음'];
      }
    }
  }
}
</script>

<style scoped>
.pet-sitter-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.sitter-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(320px, 1fr));
  gap: 30px;
  margin: 0 auto;
  padding: 0 20px;
  justify-content: center;
}

.sitter-card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
  height: 450px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.sitter-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.sitter-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: all 0.3s ease;
}

.sitter-card:hover .sitter-image {
  transform: scale(1.05);
}

.sitter-info {
  height: 200px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sitter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.rating {
  font-size: 13px;
  color: #333;
}

.sitter-details {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sitter-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.price, .schedule, .location {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #333;
}

.location {
  font-size: 14px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 2px 0;
  white-space: nowrap;
}

.pet-types {
  margin-top: 2px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.pet-tag {
  background-color: #f8f9fa;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  color: #333;
  border: 1px solid #e0e0e0;
}

@media (max-width: 1200px) {
  .sitter-grid {
    grid-template-columns: repeat(2, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .sitter-grid {
    grid-template-columns: minmax(280px, 1fr);
  }
  
  .sitter-card {
    height: 420px;
  }
}

.filters {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  justify-content: center;
  flex-wrap: wrap;
}

.filter-group {
  min-width: 200px;
}

.filter-select {
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  color: #333;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-select:hover {
  border-color: #007bff;
}

.filter-select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
    padding: 0 20px;
  }

  .filter-group {
    width: 100%;
  }
}
</style>