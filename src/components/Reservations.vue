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
    this.fetchReservations();
  },
  methods: {
    async fetchReservations() {
      try {
        const userRole = this.$store.state.userRole; // 사용자 역할 가져오기
        let url = '';

        if (userRole === 'petsitter') {
          url = 'http://localhost:8080/api/v1/reservations/petsitter'; // 펫시터 역할일 때
        } else {
          url = 'http://localhost:8080/api/v1/reservations'; // 일반 사용자 역할일 때
        }
        console.log(`Fetching reservations from: ${url}`); // 추가된 로그

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