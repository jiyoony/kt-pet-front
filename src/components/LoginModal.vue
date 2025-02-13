<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
      <div class="mt-3 text-center">
        <h3 class="text-lg leading-6 font-medium text-gray-900">로그인</h3>
        <div class="mt-2 px-7 py-3">
          <form @submit.prevent="handleLogin">
            <div class="mb-4">
              <label for="email" class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
              <input 
                type="email" 
                id="email" 
                v-model="email" 
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
            </div>
            <div class="mb-6">
              <label for="password" class="block text-gray-700 text-sm font-bold mb-2">비밀번호</label>
              <input 
                type="password" 
                id="password" 
                v-model="password" 
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
            </div>
            <div class="flex items-center justify-between">
              <button 
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                type="submit"
              >
                로그인
              </button>
              <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                비밀번호 찾기
              </a>
            </div>
          </form>
        </div>
      </div>
      <div class="items-center px-4 py-3">
        <button 
          id="ok-btn" 
          class="px-4 py-2 bg-gray-200 text-gray-800 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300"
          @click="$emit('close')"
        >
          닫기
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginModal',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    handleLogin() {
      // 여기에 로그인 로직을 구현합니다.
      console.log('로그인 시도:', this.email, this.password);
      // 실제 구현에서는 이 부분에 API 호출 등의 로직이 들어갑니다.
      // 예: this.$store.dispatch('login', { email: this.email, password: this.password })
    }
  }
}
</script>