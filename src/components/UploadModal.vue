<template>
  <transition name="fade" :appear="true">
    <div v-if="visible" class="modal-background w-screen h-screen" @click="closeBg">
      <div class="flex md:w-3/5 md:h-4/5 w-full h-full p-4 bg-gray-100 rounded-lg shadow-md" @click="contentClick">
        <div class="px-2 py-1 h-8 rounded-md shadow-md bg-blue-400 cursor-pointer" @click="uploadFile">选择文件</div>
        <input hidden="true" type="file" ref="inputRef" @change="handleFileSelect" />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { notifyFileChunks, uploadFileChunks } from "../service/file"

export default defineComponent({
  setup(props, { expose }) {

    const selectedFile = ref<null>();

    const inputRef = ref<HTMLElement>();

    const visible = ref(false)

    function closeBg() {
      visible.value = false
    }
    function contentClick() {
      event.stopPropagation()
    }
    function uploadFile() {
      inputRef.value.click()
    }
    function handleFileSelect(event: any): void {
      selectedFile.value = event.target.files[0]
      notifyFileChunks(selectedFile.value).then(res => {
        uploadFileChunks()
      })
    }
    expose({ visible })
    return {
      closeBg,
      props,
      visible,
      contentClick,
      inputRef,
      selectedFile,
      uploadFile,
      handleFileSelect
    }
  },
})

</script>

<style>
.modal {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.container {
  position: relative;
}

.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /* 半透明背景 */
  backdrop-filter: blur(3px);
  /* 毛玻璃效果 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>