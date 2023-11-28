<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useBaseStore } from '@/store/base'
import { useRouter } from "vue-router";

const userStore = useBaseStore()
const router = useRouter();


const active = ref('');

onMounted(() => {

  // 在组件挂载后，使用watch监听route对象的变化  
  watch(
    () => router.currentRoute.value, // 监听路由对象的变化  
    (newPath) => {
      active.value = router.currentRoute.value.name as string;
      userStore.updateCurrentMenu(active.value)
      if (newPath?.query?.path) {
        userStore.updateCurrentPath(newPath.query.path as string);
      }
      if (newPath?.query?.title) {
        userStore.updateCurrentTitle(newPath.query.title as string)
      }
    },
    { immediate: true } // 立即执行回调函数一次，以便在组件挂载时触发一次路由变化的处理逻辑  
  );
});

</script>

<template>
  <div>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <br />
    <br />
    <br />
    <br />
    <van-tabbar v-model="active">
      <van-tabbar-item name="search" icon="search" :to="{ name: 'search' }">搜索</van-tabbar-item>
      <van-tabbar-item name="file" icon="credit-pay"
        :to="{ name: 'file', query: { path: userStore.currentPath, title: userStore.currentTitle } }">文件</van-tabbar-item>
    </van-tabbar>

    <van-back-top bottom="10vh" />
  </div>
</template>

<style scoped></style>
