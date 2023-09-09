<template>
  <div class="flex flex-col  px-16 py-4 space-y-2" >
    <div class="text-3xl py-3">Go Http-Server</div>
    <!-- <div class="w-full h-[1px] bg-gray-500"></div> -->
    <div class="flex space-x-2">
      <span class="px-3 py-2 hover:bg-blue-400 bg-blue-200 shadow-md rounded-md cursor-pointer">上传文件</span>
      <span class="px-3 py-2 hover:bg-blue-400 bg-blue-200 shadow-md rounded-md cursor-pointer">新建文件夹</span>
    </div>
    <div class="w-full h-1 bg-gray-500"></div>
    <div class="flex flex-col space-y-1">
      <!-- 循环输出文件 -->
      <div v-for="file in fileList" :key="file.name" :file="file" class="flex content-center items-center">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const fileList = [
  {
    name: '文件1',
    type: 'file',
    size: '1.2M',
    time: '2021-10-10 10:10:10',
  },
  {
    name: '文件2',
    type: 'file',
    size: '1.2M',
    time: '2021-10-10 10:10:10',
  },
  {
    name: '文件3',
    type: 'file',
    size: '1.2M',
    time: '2021-10-10 10:10:10',
  },
  {
    name: '文件4',
    type: 'file',
    size: '1.2M',
    time: '2021-10-10 10:10:10',
  },
  {
    name: '文件5',
    type: 'file',
    size: '1.2M',
    time: '2021-10-10 10:10:10',
  },
  {
    name: '文件6',
    type: 'file',
    size: '1.2M',
    time: '2021-10-10 10:10:10',
  },
  {
    name: '文件7',
    type: 'file',
    size: '1.2M',
    time: '2021-10-10 10:10:10',
  },
  {
    name: '文件8',
    type: 'file',
    size: '1.2M',
    time: '2021-10-10 10:10:10',
  },
]    

export default defineComponent({
  setup(props, context) {

    return {
      fileList,
    }
  },
})

</script>