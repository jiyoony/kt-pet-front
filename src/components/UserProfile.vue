<template>
  <div class="container">
    <div class="form-container">
      <h2 class="title">회원 정보</h2>
      
      <div class="edit-button-container">
        <button v-if="!isEditing" class="edit-btn" @click="startEdit">수정</button>
        <div v-else class="edit-buttons">
          <button class="save-btn" @click="saveEdit">저장</button>
          <button class="cancel-btn" @click="cancelEdit">취소</button>
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
          <label>이메일 주소</label>
          <div class="info-field">{{ user.email }}</div>
        </div>

        <div class="form-group">
          <label>전화번호</label>
          <div class="info-field">
            <input v-if="isEditing" v-model="editedUser.phone" class="form-input">
            <span v-else>{{ user.phone }}</span>
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
        phone: ''
      },
      editedUser: {},
      isEditing: false,
      showChangePasswordModal: false,
      newPassword: '',
      confirmPassword: ''
    }
  },
  async mounted() {
    await this.fetchUserInfo();
  },
  methods: {
    async fetchUserInfo() {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/user/info');
        if (response.data) {
          this.user = response.data;
          this.editedUser = { ...response.data };
        }
      } catch (error) {
        console.error('사용자 정보 조회 실패:', error);
        if (error.response && error.response.status === 403) {
          this.$router.push('/login');
        } else {
          alert('사용자 정보를 불러오는데 실패했습니다.');
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
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f4f9;
  padding: 2rem;
}

.form-container {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  width: 100%;
  max-width: 600px;
}

.title {
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  color: #222;
  margin-bottom: 2rem;
}

.edit-button-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2.5rem;
}

.form-group {
  margin-bottom: 2rem;
}

.form-group label {
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #222;
  margin-bottom: 0.8rem;
}

.info-field {
  color: #333;
  font-size: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.info-field input {
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  color: #333;
  transition: border-color 0.3s ease;
}

.info-field input:focus {
  border-color: #007BFF;
  outline: none;
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
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.modal-title {
  font-size: 24px;
  font-weight: bold;
  color: #222;
  margin-bottom: 2rem;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
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

/* 반응형 디자인 */
@media (max-width: 768px) {
  .form-container {
    padding: 2rem;
  }

  .title {
    font-size: 24px;
  }

  .form-group label {
    font-size: 15px;
  }

  .info-field {
    font-size: 15px;
  }
}
</style>