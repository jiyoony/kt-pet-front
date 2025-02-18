<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <header>
        <slot name="header"></slot>
        <button @click="$emit('close')">X</button>
      </header>
      <main>
        <slot name="body"></slot>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
};
</script>

<style scoped>
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
  width: 400px;
}
</style> 