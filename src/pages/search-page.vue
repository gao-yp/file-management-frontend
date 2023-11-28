<template>
  <div>
    <van-sticky :offset-top="0">
      <van-sticky :offset-top="0">
        <van-search v-model="keyword" placeholder="请输入搜索关键词" show-action>
          <template #action>
            <div @click="doReset">搜索</div>
          </template>
        </van-search>
        <van-tabs v-model:active="searchType">
          <van-tab name="Current" title="当前搜索" />
          <van-tab name="Recursion" title="递归搜索" />
          <van-tab name="All" title="全局搜索" />
        </van-tabs>
      </van-sticky>
    </van-sticky>

    <van-divider style="background-color: white;">搜索结果{{ list.length }}</van-divider>
    <van-list :immediate-check="false" v-model:loading="loading" :finished="finished" :error="isError" @load="doSearch">
      <template v-for="(item, index)  in list" :key="item.url">
        <file-cell :file-index="(index + 1)" :file="item" is-border is-show-full @onClick="clickCell(item)"
          @onDelFile="onDelFile" />
      </template>
    </van-list>

    <van-image-preview v-model:show="showImagePreview" :images="imagesImagePreview"
      @onClose="() => imagesImagePreview = []" :max-zoom="10" />

  </div>
</template>
<script setup lang="ts">
import { ref, onActivated, } from "vue"
import { useBaseStore } from '@/store/base'
import { useRouter, onBeforeRouteLeave } from "vue-router";
import { showFailToast, showConfirmDialog } from 'vant';
import { isVideo, isPicture, isText, openVideo } from "@/utils";
import FileCell from "@/components/file-cell.vue";

import { getKeywordSearchListt4LocalFile, deleteLocalFile } from '@/api';

type FileBean = {
  url: string;
  url4Encode: string,
  fileName: string;
  fileSize: number;
  childrenSize: number;
  lastTime: string;
  isFile: boolean;
};

const userStore = useBaseStore()
const router = useRouter();

const currentPath = ref(userStore.currentPath);
let position = { x: 0, y: 0 };
onActivated(() => {
  if (userStore.currentPath == currentPath.value) {
    window.scrollTo(position.x, position.y)
  }
});
onBeforeRouteLeave(() => {
  position = {
    x: window.scrollX,
    y: window.scrollY
  }
  currentPath.value = userStore.currentPath
});

const keyword = ref('');
const searchType = ref('Current');

const loading = ref(false);
const finished = ref(false);
const list = ref([] as Array<FileBean>);
const isError = ref(false);


const doSearch = () => {
  if (!keyword.value) {
    showFailToast('关键字不能为空');
    return;
  }
  loading.value = true;
  getKeywordSearchListt4LocalFile<{ rows: Array<FileBean>, total: number }>(searchType.value, userStore.currentPath as string, keyword.value).then((data) => {
    data.rows.forEach(item => {
      list.value.push(item)
    })
    // 加载状态结束
    loading.value = false;
    // 数据全部加载完成
    finished.value = true;

  }).catch(() => {
    loading.value = false;
    isError.value = true;
  });
}

const doReset = () => {
  isError.value = false;
  finished.value = false;
  list.value = [] as Array<FileBean>;
  doSearch();
}

const clickCell = (item: FileBean) => {
  if (!item.isFile) {
    let routeUrl = router.resolve({ name: 'file', query: { path: item.url4Encode, title: item.url } });
    window.open(routeUrl.href, '_blank');
    return;
  }
  if (isVideo(item.fileName)) {
    showConfirmDialog({
      title: '确定打开吗？',
    }).then(() => {
      openVideo(item.url4Encode, item.fileName);
    });
    return;
  }
  if (isPicture(item.fileName)) {
    imagesImagePreview.value = ['/api/picture/img/' + item.url4Encode]
    showImagePreview.value = true;
    return
  }
  if (isText(item.fileName)) {
    showFailToast('文本文件')
    return;
  }
  showFailToast('未知文件')
  return;
}

const onDelFile = (url: string) => {
  showConfirmDialog({
    title: '确定要删除吗？',
  }).then(() => {
    deleteLocalFile(url).then(() => {
      list.value = list.value.filter(item => item.url4Encode != url);
    });
  });
}

const showImagePreview = ref(false);
const imagesImagePreview = ref([] as Array<string>);

</script>
<style  scoped>
.title {
  font-weight: 600;
  font-size: 17px;
  text-align: center;
  padding: 20px 10px;
  background: white;
  overflow: scroll;
  white-space: nowrap;
}
</style>
