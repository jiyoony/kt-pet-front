<template>
  <div class="modal-overlay" v-if="show" @click.self="close">
    <div class="modal-content" :class="{ 'is-active': isActive }">
      <slot name="header"></slot>
      <slot name="body"></slot>
      <button class="close-button" @click="close">닫기</button>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'Modal',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const isActive = ref(false);

    watch(() => props.show, (newValue) => {
      isActive.value = newValue;
    });

    const close = () => {
      isActive.value = false;
      setTimeout(() => {
        this.$emit('close');
      }, 300); // 애니메이션 시간과 일치하도록 설정
    };

    return { isActive, close };
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 모달이 다른 요소 위에 표시되도록 */
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform: translateY(-30px);
  opacity: 0; /* 초기 투명도 */
}

.modal-content.is-active {
  opacity: 1; /* 모달이 활성화되면 보이도록 설정 */
  transform: translateY(0); /* 모달이 제자리로 이동 */
}

.close-button {
  margin-top: 20px;
  background-color: #dc3545; /* 닫기 버튼 배경색 */
  color: white; /* 글자 색상 */
  border: none; /* 테두리 제거 */
  border-radius: 5px; /* 모서리 둥글게 */
  padding: 10px 15px; /* 패딩 */
  font-size: 16px; /* 글자 크기 */
  cursor: pointer; /* 커서 포인터로 변경 */
  transition: background-color 0.3s; /* 배경색 변화 애니메이션 */
}

.close-button:hover {
  background-color: #c82333; /* 호버 시 배경색 변화 */
}
</style> 