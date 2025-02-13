<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div class="px-6 py-8">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-8">회원 탈퇴</h2>
        
        <div class="mb-6">
          <p class="text-red-600 font-semibold mb-2">주의: 회원 탈퇴는 되돌릴 수 없습니다.</p>
          <p class="text-gray-600">탈퇴 시 다음 사항을 숙지해 주세요:</p>
          <ul class="list-disc list-inside text-gray-600 mt-2">
            <li>모든 개인 정보가 삭제됩니다.</li>
            <li>진행 중인 예약이나 거래가 모두 취소됩니다.</li>
            <li>작성한 리뷰와 댓글은 삭제되지 않습니다.</li>
            <li>탈퇴 후 30일간 재가입이 제한됩니다.</li>
          </ul>
        </div>

        <div class="mb-6">
          <label for="reason" class="block text-sm font-medium text-gray-700 mb-2">
            탈퇴 사유 (선택사항)
          </label>
          <select
            id="reason"
            v-model="reason"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">선택해주세요</option>
            <option value="서비스 불만족">서비스 불만족</option>
            <option value="개인정보 보호 우려">개인정보 보호 우려</option>
            <option value="사용 빈도 낮음">사용 빈도 낮음</option>
            <option value="기타">기타</option>
          </select>
        </div>

        <div v-if="reason === '기타'" class="mb-6">
          <label for="otherReason" class="block text-sm font-medium text-gray-700 mb-2">
            기타 사유
          </label>
          <textarea
            id="otherReason"
            v-model="otherReason"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="탈퇴 사유를 자세히 적어주세요."
          ></textarea>
        </div>

        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
            비밀번호 확인
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="현재 비밀번호를 입력해주세요"
          >
        </div>

        <div class="mb-6">
          <label class="flex items-center">
            <input
              v-model="confirmDeletion"
              type="checkbox"
              class="form-checkbox h-5 w-5 text-blue-600"
            >
            <span class="ml-2 text-gray-700">
              위 내용을 모두 확인했으며, 회원 탈퇴에 동의합니다.
            </span>
          </label>
        </div>

        <div class="flex justify-between">
          <button
            @click="cancelDeletion"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            취소
          </button>
          <button
            @click="confirmAccountDeletion"
            :disabled="!isFormValid"
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            회원 탈퇴
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountDeletion',
  data() {
    return {
      reason: '',
      otherReason: '',
      password: '',
      confirmDeletion: false
    }
  },
  computed: {
    isFormValid() {
      return this.password && this.confirmDeletion && 
             (this.reason !== '기타' || (this.reason === '기타' && this.otherReason.trim() !== ''));
    }
  },
  methods: {
    cancelDeletion() {
      // 취소 로직 (예: 이전 페이지로 돌아가기)
      console.log('탈퇴 취소');
      // this.$router.push('/profile'); // Vue Router를 사용하는 경우
    },
    confirmAccountDeletion() {
      if (!this.isFormValid) {
        return;
      }

      // 여기에 실제 회원 탈퇴 API 호출 로직을 구현합니다.
      console.log('회원 탈퇴 처리:', {
        reason: this.reason === '기타' ? this.otherReason : this.reason,
        password: this.password
      });

      // API 호출 성공 후 처리 (예: 로그아웃 및 홈페이지로 리다이렉트)
      alert('회원 탈퇴가 완료되었습니다. 이용해 주셔서 감사합니다.');
      // this.$router.push('/'); // Vue Router를 사용하는 경우
    }
  }
}
</script>