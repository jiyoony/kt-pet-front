<template>
  <div class="container">
    <h2 class="title">펫시터 목록</h2>
    <div class="petsitter-list">
      <div v-if="loading" class="loading">로딩 중...</div>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-for="petsitter in petsitters" :key="petsitter.id" class="petsitter-card">
        <img src="@/assets/guide_visiting_main_img.jpg" alt="펫시터 이미지" class="petsitter-image" />
        <h3>{{ petsitter.name }}</h3>
        <p>전화번호: {{ petsitter.phone }}</p>
        <p>가격: {{ petsitter.price }}원</p>
        <p>가능한 동물: {{ petsitter.availablePetTypes.split(', ').join(', ') }}</p>
        <p>위치: {{ petsitter.location }}</p>
        <p>활동 시간: {{ new Date(petsitter.startAt).toLocaleString() }} - {{ new Date(petsitter.endAt).toLocaleString() }}</p>
        <button class="reserve-btn" @click="openReservationModal(petsitter)">예약하기</button>
      </div>
    </div>

    <!-- 예약 모달 -->
    <div v-if="showReservationModal" class="modal-overlay">
      <div class="modal-content">
        <h3 class="modal-title">예약하기</h3>
        <div class="form-group">
          <label for="startAt">시작 시간</label>
          <input type="datetime-local" v-model="reservationData.startAt" class="form-input" />
        </div>
        <div class="form-group">
          <label for="endAt">종료 시간</label>
          <input type="datetime-local" v-model="reservationData.endAt" class="form-input" />
        </div>
        <div class="modal-buttons">
          <button class="modal-btn submit-btn" @click="reservePetsitter">예약하기</button>
          <button class="modal-btn cancel-btn" @click="closeReservationModal">취소</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PetSitterList',
  data() {
    return {
      petsitters: [],
      loading: true,
      error: null,
      showReservationModal: false,
      reservationData: {
        userId: null, // 로그인된 사용자 ID
        petsitterId: null,
        startAt: '',
        endAt: '',
        status: "WAITING", // 예약 상태
        price: 0, // 실제 가격으로 변경해야 함
        location: "Seoul" // 실제 위치로 변경해야 함
      }
    };
  },
  mounted() {
    this.fetchPetSitters();
    this.getUserId(); // 로그인된 사용자 ID 가져오기
  },
  methods: {
    async fetchPetSitters() {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/petsitters', {
          withCredentials: true
        });
        this.petsitters = response.data;
      } catch (err) {
        this.error = '펫시터 정보를 가져오는 데 실패했습니다.';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    async getUserId() {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/user/info', {
          withCredentials: true
        });
        this.reservationData.userId = response.data.id; // 로그인된 사용자 ID 설정
      } catch (err) {
        console.error('사용자 정보를 가져오는 데 실패했습니다.', err);
      }
    },
    openReservationModal(petsitter) {
      this.reservationData.petsitterId = petsitter.id; // 선택한 펫시터 ID 설정
      this.reservationData.price = petsitter.price; // 선택한 펫시터의 가격 설정
      this.showReservationModal = true; // 모달 열기
    },
    closeReservationModal() {
      this.showReservationModal = false; // 모달 닫기
      this.reservationData.startAt = ''; // 초기화
      this.reservationData.endAt = ''; // 초기화
    },
    async reservePetsitter() {
      try {
        const response = await axios.post('http://localhost:8080/api/v1/reservations', this.reservationData, {
          withCredentials: true
        });
        if (response.status === 200) {
          alert('예약이 완료되었습니다.');
          this.closeReservationModal(); // 모달 닫기
        }
      } catch (error) {
        console.error('예약 실패:', error);
        alert('예약에 실패했습니다.');
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

.petsitter-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.petsitter-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.petsitter-image {
  width: 150px;
  height: 150px;
  border-radius: 8px;
  margin-bottom: 10px;
}

.reserve-btn {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  margin-top: 10px;
}

.reserve-btn:hover {
  background-color: #0056b3;
}

.loading {
  text-align: center;
  color: black;
}

.error {
  color: red;
  text-align: center;
}

/* 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}

.modal-title {
  font-size: 20px;
  margin-bottom: 10px;
  color: black;
}

.form-group {
  margin-bottom: 15px;
  color: black; /* 검정색으로 설정 */
}

.form-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: black; /* 검정색으로 설정 */
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
}

.modal-btn {
  color: black; /* 검정색으로 설정 */
}
</style>