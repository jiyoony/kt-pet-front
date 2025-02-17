<template>
  <div class="container">
    <h2 class="title">예약 목록</h2>
    <div v-if="loading" class="loading">로딩 중...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="reservations.length === 0" class="no-reservations">예약이 없습니다.</div>
    <div v-for="reservation in reservations" :key="reservation.id" class="reservation-card">
      <h3>예약 ID: {{ reservation.id }}</h3>
      <p>펫시터 ID: {{ reservation.petsitterId }}</p>
      <p>시작 시간: {{ new Date(reservation.startAt).toLocaleString() }}</p>
      <p>종료 시간: {{ new Date(reservation.endAt).toLocaleString() }}</p>
      <p>상태: {{ reservation.status }}</p>
      <p>가격: {{ reservation.price }}원</p>
      <p>위치: {{ reservation.location }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Reservations',
  data() {
    return {
      reservations: [],
      loading: true,
      error: null
    };
  },
  mounted() {
    this.fetchUserInfo(); // 사용자 정보 가져오기
  },
  methods: {
    async fetchUserInfo() {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/user/info', {
          withCredentials: true
        });
        // 사용자 역할을 Vuex 스토어에 저장
        this.$store.commit('setUserRole', response.data.role);
        // 예약 목록 가져오기
        this.fetchReservations();
      } catch (error) {
        console.error('사용자 정보 조회 실패:', error);
        this.error = '사용자 정보를 가져오는 데 실패했습니다.';
        this.loading = false;
      }
    },
    async fetchReservations() {
      try {
        console.log('fetchUserInfo 실행됨'); // 여기에 로그 추가

        const userRole = this.$store.state.userRole; // 사용자 역할 가져오기
        console.log('User role:', userRole); // 사용자 역할 로그
        let url = '';

        if (userRole === 'petsitter') {
          url = 'http://localhost:8080/api/v1/reservations/petsitter'; // 펫시터 역할일 때
        } else {
          url = 'http://localhost:8080/api/v1/reservations/my'; // 일반 사용자 역할일 때
        }

        const response = await axios.get(url, {
          withCredentials: true
        });
        this.reservations = response.data;
      } catch (err) {
        this.error = '예약 정보를 가져오는 데 실패했습니다.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    async fetchPetsitterInfo() {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/petsitter/info', {
          withCredentials: true
        });
        // 응답 처리
      } catch (error) {
        console.error('펫시터 정보 조회 실패:', error);
      }
    }
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
  color: black;
}

.loading {
  text-align: center;
  color: black;
}

.error {
  color: red;
  text-align: center;
}

.no-reservations {
  text-align: center;
  color: black;
}

.reservation-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  color: black;
}
</style> 