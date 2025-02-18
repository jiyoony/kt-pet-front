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
import store from '@/store/index';
import { onMounted, ref } from 'vue';

export default {
  name: 'Reservations',
  setup() {
    const reservations = ref([]);
    const loading = ref(true);
    const error = ref(null);

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/user/info', {
          withCredentials: true
        });
        console.log('response.data:', response.data);
        store.commit('setUserRole', response.data.role);
        console.log('response.data.role:', response.data.role);
        fetchReservations(response.data.role);
      } catch (error) {
        console.error('사용자 정보 조회 실패:', error);
        error.value = '사용자 정보를 가져오는 데 실패했습니다.';
        loading.value = false;
      }
    };

    const fetchReservations = async (userRole) => {
      try {
        console.log('fetchUserInfo 실행됨');
        console.log('User role:', userRole);
        let url = '';

        if (userRole === 'petsitter') {
          url = 'http://localhost:8080/api/v1/reservations/petsitter';
        } else {
          url = 'http://localhost:8080/api/v1/reservations/my';
        }

        const response = await axios.get(url, {
          withCredentials: true
        });
        reservations.value = response.data;
      } catch (err) {
        error.value = '예약 정보를 가져오는 데 실패했습니다.';
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchUserInfo();
    });

    return {
      reservations,
      loading,
      error
    };
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