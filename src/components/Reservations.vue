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
      <p>User Role: {{ userRole }}</p>
      <p>Reservation Status: {{ reservation.status }}</p>
      <button v-if="reservation.status === 'WAITING' && userRole === 'user'" @click="handlePayment(reservation)">
        결제하기
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import store from '@/store/index';
import { onMounted, ref, watch } from 'vue';

export default {
  name: 'Reservations',
  setup() {
    const reservations = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const userRole = ref('');

    // 사용자 정보 가져오기
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/user/info', {
          withCredentials: true
        });
        console.log('response.data:', response.data);
        userRole.value = response.data.role;
        fetchReservations(response.data.role);
      } catch (error) {
        console.error('사용자 정보 조회 실패:', error);
        error.value = '사용자 정보를 가져오는 데 실패했습니다.';
        loading.value = false;
      }
    };

    // 예약 정보 가져오기
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

    // 결제 처리
    const handlePayment = (reservation) => {
      const { IMP } = window;
      IMP.init('imp88240507');

      const data = {
        pg: 'html5_inicis',
        pay_method: 'card',
        merchant_uid: `mid_${new Date().getTime()}`,
        amount: reservation.price,
        name: '아임포트 결제 데이터 분석',
        buyer_name: '홍길동',
        buyer_tel: '01012341234',
        buyer_email: 'jychae615@gmail.com',
        buyer_addr: '신사동 661-16',
        buyer_postcode: '06018'
      };

      IMP.request_pay(data, (response) => callback(response, reservation.id));
    };

    const callback = async (response, reservationId) => {
      const { success, merchant_uid, error_msg } = response;
      console.log(response);
      if (success) {
        alert('결제 성공');
        await sendPaymentInfo(reservationId, merchant_uid);
      } else {
        alert(`결제 실패: ${error_msg}`);
      }
    };

    const sendPaymentInfo = async (reservationId, paymentId) => {
      const paymentData = {
        paymentDate: new Date(),
        reservationId: reservationId,
        paymentId: paymentId
      };

      try {
        const response = await axios.post('http://localhost:8080/api/payments', paymentData);
        console.log('Payment information saved successfully:', response.data);
      } catch (error) {
        console.error('Failed to save payment information:', error);
      }
    };

    // userRole이 변경될 때마다 예약 목록 갱신
    watch(userRole, (newRole) => {
      if (newRole) {
        fetchReservations(newRole);
      }
    });

    onMounted(() => {
      fetchUserInfo();
    });

    return {
      reservations,
      loading,
      error,
      userRole,
      handlePayment
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
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  color: black;
}
</style> 