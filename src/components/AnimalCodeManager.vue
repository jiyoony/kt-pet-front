<template>
  <div class="animal-code-manager">
    <h1>동물 코드 관리</h1>
    <button class="add-animal-button" @click="showAddModal = true">동물 코드 추가</button>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>코드</th>
          <th>주 카테고리</th>
          <th>부 카테고리</th>
          <th>작업</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="animal in animalCodes" :key="animal.id">
          <td>{{ animal.id }}</td>
          <td>{{ animal.code }}</td>
          <td>{{ animal.mainCategory }}</td>
          <td>{{ animal.subCategory }}</td>
          <td>
            <button class="action-button" @click="editAnimal(animal)">수정</button>
            <button class="action-button" @click="deleteAnimal(animal.id)">삭제</button>
          </td>
        </tr>
      </tbody>
    </table>

    <Modal v-if="showAddModal" @close="showAddModal = false">
      <template #header>
        <h2>동물 추가</h2>
      </template>
      <template #body>
        <form @submit.prevent="addAnimal">
          <input v-model="newAnimal.code" placeholder="코드" required />
          <input v-model="newAnimal.mainCategory" placeholder="주 카테고리" required />
          <input v-model="newAnimal.subCategory" placeholder="부 카테고리" required />
          <button type="submit" class="add-button">추가</button>
        </form>
      </template>
    </Modal>

    <Modal v-if="showEditModal" @close="showEditModal = false">
      <template #header>
        <h2>동물 코드 수정</h2>
      </template>
      <template #body>
        <form @submit.prevent="updateAnimal">
          <input v-model="editAnimalData.code" placeholder="코드" required />
          <input v-model="editAnimalData.mainCategory" placeholder="주 카테고리" required />
          <input v-model="editAnimalData.subCategory" placeholder="부 카테고리" required />
          <button type="submit" class="edit-button">수정</button>
        </form>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Modal from './Modal.vue'; // Ensure the modal component is imported

const animalCodes = ref([]);
const showAddModal = ref(false);
const showEditModal = ref(false);
const newAnimal = ref({ code: '', mainCategory: '', subCategory: '' });
const editAnimalData = ref({ id: null, code: '', mainCategory: '', subCategory: '' });

const fetchAnimalCodes = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/animal-codes');
    animalCodes.value = response.data;
  } catch (error) {
    console.error('동물 코드 조회 실패:', error);
  }
};

const addAnimal = async () => {
  try {
    const animalCodeRequestDto = {
      code: newAnimal.value.code,
      mainCategory: newAnimal.value.mainCategory,
      subCategory: newAnimal.value.subCategory
    };
    
    // Send POST request to add the animal code
    const response = await axios.post('http://localhost:8080/api/v1/animal-codes', animalCodeRequestDto);
    
    // Check the response status
    if (response.status === 201) {
      console.log('Animal code added successfully:', response.data);
      // Reset the form after adding
      newAnimal.value = { code: '', mainCategory: '', subCategory: '' }; // Reset form
      showAddModal.value = false; // Close the modal
      await fetchAnimalCodes(); // Refresh the list
    }
  } catch (error) {
    console.error('동물 코드 추가 실패:', error);
  }
};

const editAnimal = (animal) => {
  editAnimalData.value = { ...animal }; // Set the data for the animal to be edited
  showEditModal.value = true;
};

const updateAnimal = async () => {
  try {
    await axios.put(`http://localhost:8080/api/v1/animal-codes/${editAnimalData.value.id}`, editAnimalData.value);
    showEditModal.value = false;
    await fetchAnimalCodes(); // Refresh the list
  } catch (error) {
    console.error('동물 코드 수정 실패:', error);
  }
};

const deleteAnimal = async (id) => {
  try {
    await axios.delete(`http://localhost:8080/api/v1/animal-codes/${id}`);
    await fetchAnimalCodes(); // Refresh the list
  } catch (error) {
    console.error('동물 코드 삭제 실패:', error);
  }
};

onMounted(() => {
  fetchAnimalCodes(); // Fetch animal codes on component mount
});
</script>

<style scoped>
.animal-code-manager {
  padding: 20px;
  color: black; /* 글자 색상을 검정으로 설정 */
}

.add-animal-button {
  background-color: #007BFF; /* 버튼 배경색 */
  color: white; /* 글자 색상 */
  border: none; /* 테두리 제거 */
  border-radius: 5px; /* 모서리 둥글게 */
  padding: 10px 15px; /* 패딩 */
  font-size: 16px; /* 글자 크기 */
  cursor: pointer; /* 커서 포인터로 변경 */
  transition: background-color 0.3s; /* 배경색 변화 애니메이션 */
}

.add-animal-button:hover {
  background-color: #0056b3; /* 호버 시 배경색 변화 */
}

.action-button {
  background-color: #007BFF; /* 수정 및 삭제 버튼 배경색 */
  color: white; /* 글자 색상 */
  border: none; /* 테두리 제거 */
  border-radius: 5px; /* 모서리 둥글게 */
  padding: 5px 10px; /* 패딩 */
  font-size: 14px; /* 글자 크기 */
  cursor: pointer; /* 커서 포인터로 변경 */
  transition: background-color 0.3s; /* 배경색 변화 애니메이션 */
}

.action-button:hover {
  background-color: #0056b3; /* 호버 시 배경색 변화 */
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  color: black; /* 테이블 글자 색상 검정으로 설정 */
}

th {
  background-color: #f2f2f2;
}

button {
  margin: 5px;
}
</style> 