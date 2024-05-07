<template>
  <!-- 输入prompt生成图片 -->
  <div class="flex w-screen h-screen space-x-2 bg-slate-300">
    <div class="w-1/4 bg-slate-50 flex flex-col">
      <span class="text-2xl font-bold p-4">Prompt</span>
      <input type="text" class="border-2 border-gray-300 p-2 m-2" v-model="prompt" @keyup.enter="generateImage" />
      <span class="text-2xl font-bold p-4">Seed</span>
      <input type="number" class="border-2 border-gray-300 p-2 m-2" v-model="seed" @keyup.enter="generateImage" />
      <span class="text-2xl font-bold p-4">guide scale</span>
      <input type="number" class="border-2 border-gray-300 p-2 m-2" v-model="guideScale" @keyup.enter="generateImage" />
      <span class="text-2xl font-bold p-4">nums of pics</span>
      <!-- 输入数字 -->
      <input type="number" class="border-2 border-gray-300 p-2 m-2" v-model="numsOfPics" @keyup.enter="generateImage" />
    </div>
    <div class="w-3/4 bg-slate-100 flex flex-col">
      <span class="text-2xl font-bold p-4">Generated Image</span>
      <div class="flex flex-col h-full">
        <img v-for="image in images" :src="image.url" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import service from '../service/service';

export default defineComponent({
  setup() {
    const prompt = ref('');
    const seed = ref('');
    const guideScale = ref('');
    const numsOfPics = ref('');
    const images = ref([]);

    async function generateImage() {
      const res = await service.generateImage({
        prompt: prompt.value,
        seed: seed.value,
        guideScale: guideScale.value,
        numsOfPics: numsOfPics.value,
        enable_safety_checks: true,
      });
      if (res.status === 200) {
        images.value = res.data.images;
        console.log(images.value);
      } else {
        console.error(res.data);
      }
    }

    return {
      prompt,
      seed,
      guideScale,
      numsOfPics,
      generateImage,
      images,
    };
  },
});

</script>