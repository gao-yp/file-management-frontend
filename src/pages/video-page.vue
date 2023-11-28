<template>
  <div>

    <van-sticky :offset-top="0">
      <van-search v-model="keyword" placeholder="请输入搜索关键词" show-action>
        <template #left>
          <van-radio-group v-model="searchType" direction="horizontal" icon-size="15">
            <van-radio name="Rand">随机</van-radio>
            <van-radio name="All">全部</van-radio>
          </van-radio-group>
        </template>
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </van-sticky>

    <van-divider style="background-color: white;">数量：{{ total }} 条</van-divider>

    <van-list :immediate-check="false" v-model:loading="loading" :finished="finished" finished-text="没有更多了"
      :error="isError" error-text="请求失败，请重新刷新" @load="onLoad">
      <van-cell v-for="(item, index) in list" :key="item.url">
        <template #title>
          <van-text-ellipsis rows="2" position="middle" :content="(index + 1) + '.  ' + item.title" expand-text="  展开"
            collapse-text="  收起" />
        </template>
        <template #label>
          <van-image v-if="item.coverUrl" style="max-width: 100%; min-height: 200px;"
            :src="'/api/picture/img/' + item.coverUrl" @click="clickCell(item)">
          </van-image>
          <img v-else style="max-width: 100%; max-height: 100%;" v-lazy="'/comm/404Img'">
        </template>
      </van-cell>
    </van-list>

  </div>
</template>
<script setup lang="ts">
import { ref, onActivated } from "vue"
import { useBaseStore } from '@/store/base'
import { onBeforeRouteLeave } from "vue-router";
import { showConfirmDialog } from 'vant';
import { openVideo } from '@/utils'

import { getList4Video } from '@/api';
type FileBean = {
  title: string;
  url: string;
  coverUrl: string;
  subtitleUrl: string;
};

const userStore = useBaseStore()

let currentPath = '';
let position = { x: 0, y: 0 };
onActivated(() => {
  if (userStore.currentPath == currentPath) {
    window.scrollTo(position.x, position.y)
  }
});
onBeforeRouteLeave(() => {
  //页面离开
  position = {
    x: window.scrollX,
    y: window.scrollY
  }
  currentPath = userStore.currentPath
});

const keyword = ref('');
const searchType = ref('Rand');
const loading = ref(false);
const list = ref([] as Array<FileBean>);
const total = ref(0);
const finished = ref(false);
const isError = ref(false);
const startNum = ref(0);

const onLoad = async () => {
  doSearch(keyword.value);
};

const onSearch = () => {
  isError.value = false;
  finished.value = false;
  loading.value = true;
  list.value = [] as Array<FileBean>;
  startNum.value = 0;
  onLoad();
}

const clickCell = (item: FileBean) => {
  showConfirmDialog({
    title: '确定打开吗？',
  }).then(() => {
    openVideo(item.url, item.title);
  });
  return;
}

const doSearch = (keyword: string = '') => {
  getList4Video<{ rows: Array<FileBean>, total: number }>(searchType.value, keyword, startNum.value, 10).then((data) => {
    data.rows.forEach(item => {
      list.value.push(item)
    })
    total.value = data.total;
    startNum.value = list.value.length;
    // 加载状态结束
    loading.value = false;
    // 数据全部加载完成
    if (startNum.value >= data.total) {
      finished.value = true;
    }
  }).catch(() => {
    loading.value = false;
    isError.value = true;
  });
}



</script>
<style  scoped></style>
