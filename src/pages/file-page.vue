<template>
    <div>
        <van-sticky :offset-top="0">
            <div class="title">
                <van-text-ellipsis :content="userStore.currentTitle ? userStore.currentTitle : '根'" rows="1"
                    position="middle" />
            </div>
            <file-cell v-if="parentFile" is-border :file-index="0" :file="parentFile" @onClick="clickCell(parentFile)" />
        </van-sticky>
        <!-- 文件列表 -->
        <van-list :immediate-check="false" v-model:loading="loading" :finished="finished" :error="isError"
            error-text="请求失败，请重新刷新" @load="onLoad">
            <template v-for="(item, index)  in list" :key="item.url">
                <file-cell :file-index="(index + 1)" :file="item" is-border @onClick="clickCell" @onDelFile="onDelFile" />
            </template>
        </van-list>
        <!-- 图片预览 -->
        <van-image-preview v-model:show="showImagePreview" :images="imagesImagePreview" />
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch, onActivated, reactive } from "vue"
import { useBaseStore } from '@/store/base'
import { useRouter, onBeforeRouteLeave } from "vue-router";
import { showFailToast, showConfirmDialog } from 'vant';
import { isVideo, isPicture, isText, openVideo, prefixZero } from "@/utils";

import FileCell from "@/components/file-cell.vue";

import { getList4LocalFile, deleteLocalFile } from '@/api';
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

onMounted(() => {
    watch(
        () => userStore.currentPath,
        () => {
            doReset();
        },
        { immediate: true } // 立即执行回调函数一次，以便在组件挂载时触发一次路由变化的处理逻辑  
    );
});

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

const parentFile = ref<FileBean>();

const loading = ref(false);
const finished = ref(false);
const list = ref([] as Array<FileBean>);
const startNum = ref(0);
const isError = ref(false);

const pageSize = ref(10);

const onLoad = async () => {
    doSearch(userStore.currentPath as string);
};

const doSearch = (path: string = '') => {
    getList4LocalFile<{ parent: FileBean, rows: Array<FileBean>, total: number }>(path, startNum.value, 999999).then((data) => {
        if (data.parent) {
            parentFile.value = data.parent;
        }
        if (data.total > 100) {
            pageSize.value = (data.total - data.total % 100) / 10;
        } else {
            pageSize.value = 10;
        }
        data.rows.forEach((item, index) => {
            list.value.push(item);
        })

        startNum.value = startNum.value + data.rows.length;
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

const doReset = () => {
    isError.value = false;
    finished.value = false;
    loading.value = true;
    parentFile.value = undefined;
    list.value = [] as Array<FileBean>;
    startNum.value = 0;
    onLoad();
}

const clickCell = (item: FileBean) => {
    if (!item.isFile) {
        router.push({ name: 'file', query: { path: item.url4Encode, title: item.url } })
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
            doReset();
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
    padding: 10px;
    background: white;
    overflow: scroll;
    white-space: nowrap;
}
</style>
