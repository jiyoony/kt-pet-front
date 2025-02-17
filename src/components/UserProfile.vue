<template>
  <div class="container">
    <div class="profile-container">
      <!-- 회원 정보 섹션 -->
      <div class="form-container">
        <h2 class="title">회원 정보</h2>
        
        <div class="button-container">
          <div class="left-buttons">
            <button v-if="isPetsitter" class="register-petsitter-btn" @click="showPetsitterModal = true">
              펫시터 정보 등록하기
            </button>
          </div>
          <div>
            <button v-if="!isEditing" class="edit-btn" @click="startEdit">수정</button>
            <div v-else class="edit-buttons">
              <button class="save-btn" @click="saveEdit">저장</button>
              <button class="cancel-btn" @click="cancelEdit">취소</button>
            </div>
          </div>
        </div>

        <div class="profile-content">
          <div class="form-group">
            <label>이름</label>
            <div class="info-field">
              <input v-if="isEditing" v-model="editedUser.name" class="form-input">
              <span v-else>{{ user.name }}</span>
            </div>
          </div>

          <div class="form-group">
            <label>이메일</label>
            <div class="info-field">
              <span>{{ user.email }}</span>
            </div>
          </div>

          <div class="form-group">
            <label>전화번호</label>
            <div class="info-field">
              <span>{{ user.phone }}</span>
            </div>
          </div>

          <div class="form-group">
            <label>회원 유형</label>
            <div class="info-field">
              <span>{{ user.role }}</span>
            </div>
          </div>

          <div class="form-group">
            <label>비밀번호</label>
            <button class="change-password-btn" @click="showChangePasswordModal = true">
              비밀번호 변경
            </button>
          </div>
        </div>
      </div>

      <!-- 펫시터 정보 섹션 -->
      <div v-if="isPetsitter" class="form-container petsitter-info">
        <h2 class="title">펫시터 정보</h2>
        <div class="button-container">
          <div></div>
          <div>
            <button v-if="!isPetsitterEditing" class="edit-btn" @click="startPetsitterEdit">수정</button>
            <button v-if="!isPetsitterEditing" class="delete-btn" @click="deletePetsitter" style="margin-left: 10px;">삭제</button>
            <div v-else class="edit-buttons">
              <button class="save-btn" @click="savePetsitterEdit">저장</button>
              <button class="cancel-btn" @click="cancelPetsitterEdit">취소</button>
            </div>
          </div>
        </div>
        <div class="profile-content">
          <div class="form-group">
            <label>시간당 가격</label>
            <div class="info-field">
              <input v-if="isPetsitterEditing" v-model.number="editedPetsitterInfo.price" type="number" class="form-input">
              <span v-else>{{ petsitterInfo.price }}원</span>
            </div>
          </div>

          <div class="form-group">
            <label>활동 시간</label>
            <div class="info-field">
              <template v-if="isPetsitterEditing">
                <input 
                  v-model="editedPetsitterInfo.startAt" 
                  type="datetime-local" 
                  class="form-input"
                >
                <span class="time-separator">~</span>
                <input 
                  v-model="editedPetsitterInfo.endAt" 
                  type="datetime-local" 
                  class="form-input"
                >
              </template>
              <span v-else class="time-display">
                {{ formatDateTime(petsitterInfo.startAt) }} ~ {{ formatDateTime(petsitterInfo.endAt) }}
              </span>
            </div>
          </div>

          <div class="form-group">
            <label>돌봄 가능한 동물</label>
            <div class="info-field">
              <div class="pet-types-container">
                <template v-if="isPetsitterEditing">
                  <label v-for="type in petTypes" :key="type" class="pet-type-checkbox">
                    <input 
                      type="checkbox" 
                      :value="type"
                      v-model="editedPetsitterInfo.selectedPetTypes"
                    >
                    {{ type }}
                  </label>
                </template>
                <template v-else>
                  <span v-for="type in getPetTypes" :key="type" class="pet-type-tag">
                    {{ type }}
                  </span>
                </template>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>활동 지역</label>
            <div class="info-field">
              <select v-if="isPetsitterEditing" v-model="editedPetsitterInfo.location" class="form-input">
                <option value="">지역을 선택하세요</option>
                <option value="서울특별시">서울특별시</option>
                <option value="경기도">경기도</option>
                <option value="인천광역시">인천광역시</option>
                <option value="부산광역시">부산광역시</option>
                <option value="대구광역시">대구광역시</option>
                <option value="광주광역시">광주광역시</option>
                <option value="대전광역시">대전광역시</option>
                <option value="울산광역시">울산광역시</option>
              </select>
              <span v-else>{{ petsitterInfo.location }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 비밀번호 변경 모달 -->
    <div v-if="showChangePasswordModal" class="modal-overlay">
      <div class="modal-content">
        <h3 class="modal-title">비밀번호 변경</h3>
        <div class="form-group">
          <input v-model="newPassword" type="password" placeholder="새 비밀번호" class="form-input">
        </div>
        <div class="form-group">
          <input v-model="confirmPassword" type="password" placeholder="새 비밀번호 확인" class="form-input">
        </div>
        <div class="modal-buttons">
          <button class="modal-btn cancel-btn" @click="showChangePasswordModal = false">취소</button>
          <button class="modal-btn submit-btn" @click="changePassword">변경</button>
        </div>
      </div>
    </div>

    <!-- 펫시터 등록 모달 -->
    <div v-if="showPetsitterModal" class="modal-overlay">
      <div class="modal-content">
        <h3 class="modal-title">펫시터 등록</h3>
        <div class="modal-form-content">
          <div class="form-group">
            <label>시간당 가격 (원)</label>
            <input 
              v-model.number="petsitterInfo.price" 
              type="number" 
              class="form-input"
              placeholder="시간당 가격을 입력하세요"
            >
          </div>
          <div class="form-group">
            <label>활동 시작 시간</label>
            <input 
              v-model="petsitterInfo.startAt" 
              type="datetime-local" 
              class="form-input"
            >
          </div>
          <div class="form-group">
            <label>활동 종료 시간</label>
            <input 
              v-model="petsitterInfo.endAt" 
              type="datetime-local" 
              class="form-input"
            >
          </div>
          <div class="form-group">
            <label>돌봄 가능한 동물</label>
            <div class="pet-types-container">
              <label v-for="type in petTypes" :key="type" class="pet-type-checkbox">
                <input 
                  type="checkbox" 
                  :value="type"
                  v-model="selectedPetTypes"
                >
                {{ type }}
              </label>
            </div>
          </div>
          <div class="form-group">
            <label>활동 지역</label>
            <select v-model="petsitterInfo.location" class="form-input">
              <option value="">지역을 선택하세요</option>
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
        </div>
        <div class="modal-buttons">
          <button class="modal-btn submit-btn" @click="registerAsPetsitter">등록하기</button>
          <button class="modal-btn cancel-btn" @click="showPetsitterModal = false">취소</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

// axios 기본 설정
axios.defaults.withCredentials = true;

export default {
  name: 'UserProfile',
  data() {
    return {
      user: {
        name: '',
        email: '',
        phone: '',
        role: ''
      },
      editedUser: {
        name: '',
        email: '',
        phone: '',
        role: ''
      },
      isEditing: false,
      showChangePasswordModal: false,
      newPassword: '',
      confirmPassword: '',
      showPetsitterModal: false,
      petsitterInfo: {
        price: 0,
        startAt: '',
        endAt: '',
        location: '',
      },
      petTypes: ['소형견', '중형견', '대형견', '고양이', '새', '토끼'],
      selectedPetTypes: [],
      isPetsitter: false,
      isPetsitterEditing: false,
      editedPetsitterInfo: {
        price: 0,
        startAt: '',
        endAt: '',
        location: '',
        selectedPetTypes: []
      }
    }
  },
  computed: {
    getPetTypes() {
      return this.petsitterInfo.availablePetTypes ? 
        this.petsitterInfo.availablePetTypes.split(',') : [];
    }
  },
  async mounted() {
    await this.fetchUserInfo();
    await this.fetchPetsitterInfo();
  },
  methods: {
    async fetchUserInfo() {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/user/info', {
          withCredentials: true
        });
        if (response.data) {
          this.user = response.data;
          this.editedUser = { ...this.user };
          this.isPetsitter = this.user.role === 'petsitter';
        }
      } catch (error) {
        console.error('사용자 정보 조회 실패:', error);
        if (error.response?.status === 403) {
          this.$router.push('/login');
        }
      }
    },
    startEdit() {
      this.editedUser = { ...this.user };
      this.isEditing = true;
    },
    async saveEdit() {
      try {
        const response = await axios.put('http://localhost:8080/api/v1/user/info', {
          email: this.editedUser.email,
          name: this.editedUser.name,
          phone: this.editedUser.phone
        });
        
        if (response.data) {
          this.user = response.data;
          this.isEditing = false;
          alert('회원 정보가 수정되었습니다.');
        }
      } catch (error) {
        console.error('회원 정보 수정 실패:', error);
        alert('회원 정보 수정에 실패했습니다.');
      }
    },
    cancelEdit() {
      this.isEditing = false;
      this.editedUser = { ...this.user };
    },
    async changePassword() {
      if (this.newPassword !== this.confirmPassword) {
        alert('새 비밀번호가 일치하지 않습니다.');
        return;
      }
      try {
        await axios.put('http://localhost:8080/api/v1/user/password', {
          newPassword: this.newPassword
        }, {
          withCredentials: true
        });
        alert('비밀번호가 변경되었습니다.');
        this.showChangePasswordModal = false;
        this.newPassword = '';
        this.confirmPassword = '';
      } catch (error) {
        console.error('비밀번호 변경 실패:', error);
        alert('비밀번호 변경에 실패했습니다.');
      }
    },
    async registerAsPetsitter() {
      try {
        // 사용자가 이미 가지고 있는 돌봄 가능 동물 정보를 기본 선택으로 설정
        if (!this.selectedPetTypes.length && this.user.availablePetTypes) {
          this.selectedPetTypes = this.user.availablePetTypes;
        }

        const formattedPetTypes = this.selectedPetTypes.join(',');
        
        const response = await axios.post('http://localhost:8080/api/v1/petsitters', {
          price: this.petsitterInfo.price,
          startAt: new Date(this.petsitterInfo.startAt).toISOString(),
          endAt: new Date(this.petsitterInfo.endAt).toISOString(),
          availablePetTypes: formattedPetTypes,
          location: this.petsitterInfo.location
        });

        if (response.status === 200) {
          alert('펫시터 등록이 완료되었습니다.');
          this.showPetsitterModal = false;
          this.isPetsitter = true; // 펫시터 등록 후 상태 업데이트
          // 입력 필드 초기화
          this.petsitterInfo = {
            price: 0,
            startAt: '',
            endAt: '',
            location: ''
          };
          this.selectedPetTypes = [];
          await this.fetchPetsitterInfo(); // 등록 후 펫시터 정보 다시 가져오기
        }
      } catch (error) {
        console.error('펫시터 등록 실패:', error);
        alert('펫시터 등록에 실패했습니다.');
      }
    },
    async fetchPetsitterInfo() {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/petsitters/me');
        if (response.data) {
          this.isPetsitter = true;
          this.petsitterInfo = response.data;
        }
      } catch (error) {
        if (error.response && error.response.status !== 404) {
          console.error('펫시터 정보 조회 실패:', error);
        }
      }
    },
    formatDateTime(dateTime) {
      if (!dateTime) return '-';
      const date = new Date(dateTime);
      return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    },
    startPetsitterEdit() {
      this.editedPetsitterInfo = {
        price: this.petsitterInfo.price,
        startAt: this.petsitterInfo.startAt,
        endAt: this.petsitterInfo.endAt,
        location: this.petsitterInfo.location,
        selectedPetTypes: this.petsitterInfo.availablePetTypes ? 
          this.petsitterInfo.availablePetTypes.split(',') : []
      };
      this.isPetsitterEditing = true;
    },
    async savePetsitterEdit() {
      try {
        const response = await axios.put('http://localhost:8080/api/v1/petsitters', {
          price: this.editedPetsitterInfo.price,
          startAt: new Date(this.editedPetsitterInfo.startAt).toISOString(),
          endAt: new Date(this.editedPetsitterInfo.endAt).toISOString(),
          availablePetTypes: this.editedPetsitterInfo.selectedPetTypes.join(','),
          location: this.editedPetsitterInfo.location
        });
        
        if (response.data) {
          this.petsitterInfo = response.data;
          this.isPetsitterEditing = false;
          alert('펫시터 정보가 수정되었습니다.');
        }
      } catch (error) {
        console.error('펫시터 정보 수정 실패:', error);
        alert('펫시터 정보 수정에 실패했습니다.');
      }
    },
    cancelPetsitterEdit() {
      this.isPetsitterEditing = false;
      this.editedPetsitterInfo = {
        price: this.petsitterInfo.price,
        startAt: this.petsitterInfo.startAt,
        endAt: this.petsitterInfo.endAt,
        location: this.petsitterInfo.location,
        selectedPetTypes: this.petsitterInfo.availablePetTypes ? 
          this.petsitterInfo.availablePetTypes.split(',') : []
      };
    },
    async deletePetsitter() {
      try {
        await axios.delete('http://localhost:8080/api/v1/petsitters', {
          withCredentials: true
        });
        alert('펫시터 정보가 삭제되었습니다.');
        this.isPetsitter = false; // 펫시터 정보 삭제 후 상태 업데이트
      } catch (error) {
        console.error('펫시터 삭제 실패:', error);
        alert('펫시터 삭제에 실패했습니다.');
      }
    },
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  background-color: #f4f4f9;
  padding: 2rem;
}

.profile-container {
  display: flex;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.form-container {
  flex: 1;
  min-width: 500px;
  max-width: 650px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  margin: 0 auto;
  height: fit-content;
  min-height: 600px;
  display: flex;
  flex-direction: column;
}

.petsitter-info {
  flex: 1;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  min-height: 600px;
  display: flex;
  flex-direction: column;
}

.title {
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  color: #222;
  margin-bottom: 2rem;
}

.button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
}

.left-buttons {
  display: flex;
  gap: 1rem;
}

.edit-button-container {
  display: none;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #222;
  margin-bottom: 0.5rem;
}

.info-field {
  color: #333;
  font-size: 16px;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  min-height: 40px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.info-field input,
.info-field select,
.info-field span {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  color: #333;
  line-height: 1.5;
  min-height: 40px;
}

.info-field input,
.info-field select {
  border: 2px solid #ddd;
  border-radius: 6px;
  transition: border-color 0.3s ease;
  background-color: white;
}

.edit-btn {
  padding: 10px 24px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.edit-buttons {
  display: flex;
  gap: 1rem;
}

.save-btn {
  padding: 10px 24px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn {
  padding: 10px 24px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.change-password-btn {
  padding: 10px 20px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  width: auto;
  margin-top: 0.5rem;
}

.register-petsitter-btn {
  padding: 10px 24px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.register-petsitter-btn:hover {
  background-color: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.pet-types-container {
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  padding: 4px;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.pet-type-tag,
.pet-type-checkbox {
  font-size: 10px;
  padding: 2px 6px;
  margin: 0;
  display: inline-flex;
  align-items: center;
  min-height: 20px;
  background-color: white;
  border: 1px solid #dee2e6;
  border-radius: 3px;
}

.pet-type-checkbox input[type="checkbox"] {
  margin: 0 2px 0 0;
  width: 7px;
  height: 7px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 2.5rem;
  border-radius: 12px;
  width: 90%;
  max-width: 450px;
  max-height: 80vh;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  position: relative;
}

.modal-title {
  font-size: 24px;
  font-weight: bold;
  color: #222;
  margin-bottom: 2rem;
  position: sticky;
  top: 0;
  background: white;
  padding: 1rem 0;
  z-index: 1;
  border-bottom: 1px solid #eee;
}

.modal-form-content {
  flex: 1;
  overflow-y: auto;
  padding: 0 1rem;
  margin: -1rem 0;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
  position: sticky;
  bottom: 0;
  background: white;
  padding: 1rem 0;
  z-index: 1;
  border-top: 1px solid #eee;
}

.modal-content::-webkit-scrollbar {
  width: 8px;
}

.modal-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.modal-content::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.modal-btn {
  flex: 1;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn {
  background-color: #007BFF;
  color: white;
}

.cancel-btn {
  background-color: #dc3545;
  color: white;
}

.modal-btn:hover {
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal-btn:active {
  transform: translateY(0);
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  margin-bottom: 1rem;
}

.form-input:focus {
  border-color: #007BFF;
  outline: none;
}

@media (max-width: 1200px) {
  .profile-container {
    flex-direction: column;
    align-items: center;
  }

  .form-container {
    min-width: 90%;
    max-width: 600px;
    padding: 2rem;
  }
}

.profile-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* 활동 시간 입력 필드 스타일 수정 */
.info-field {
  color: #333;
  font-size: 16px;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  min-height: 40px;
  display: flex;
  align-items: center;
  flex-wrap: wrap; /* 줄바꿈 허용 */
  gap: 8px; /* 요소 간 간격 */
}

/* 시간 입력 필드 스타일 */
.info-field input[type="datetime-local"] {
  width: calc(50% - 15px); /* 너비 조정 */
  padding: 6px;
  font-size: 14px;
  min-height: 32px;
}

/* 구분자 스타일 */
.time-separator {
  font-size: 14px;
  color: #666;
  margin: 0 4px;
}

/* 시간 표시 스팬 스타일 */
.time-display {
  font-size: 14px;
  color: #333;
}

.delete-btn {
  padding: 10px 24px;
  background-color: #dc3545; /* 빨간색 */
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: 10px; /* 간격 추가 */
}

.delete-btn:hover {
  background-color: #c82333; /* 어두운 빨간색 */
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}
</style>