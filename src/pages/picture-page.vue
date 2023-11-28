<template>
    <div>
        <br />
        <van-config-provider :theme-vars="themeVars">
            <van-index-bar :index-list="indexList" :sticky="false">
                <van-list ref="refPicList" :immediate-check="false" v-model:loading="loading" :finished="finished"
                    finished-text="没有更多了" @load="onLoad">
                    <template v-for="(item, index) in list" :key="item.title">
                        <van-index-anchor v-if="index % pageSize == 0" :index="prefixZero(index + 1, 3)">
                            <span></span>
                        </van-index-anchor>
                        <van-cell>
                            <template #title>
                                <van-text-ellipsis rows="1" position="middle" :content="(index + 1) + '.  ' + item.title"
                                    expand-text="  展开" collapse-text="  收起" />
                            </template>
                            <template #label>
                                <van-image style="max-width: 100%; min-height: 200px; " lazy-load
                                    :src="'/api/picture/img/' + item.url4Encode" @click="clickCell(item)">
                                </van-image>
                            </template>
                        </van-cell>
                    </template>
                </van-list>
            </van-index-bar>
        </van-config-provider>
        <van-image-preview v-model:show="showImagePreview" :images="imagesImagePreview"
            @onClose="() => imagesImagePreview = []" :max-zoom="10" />
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, onActivated } from "vue"
import { useBaseStore } from '@/store/base'
import { onBeforeRouteLeave } from "vue-router";
import { prefixZero } from "@/utils";

import { getList4Picture } from '@/api';
type FileBean = {
    url4Encode: string,
    title: string;
};

const userStore = useBaseStore()

const themeVars = reactive({
    indexBarIndexFontSize: '18px',
    indexBarIndexLineHeight: '25px'
});

let currentPath = '';
let position = { x: 0, y: 0 };
onActivated(() => {
    if (userStore.currentPath != currentPath) {
        doReset();
    } else {
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

const loading = ref(false);
const list = ref([] as Array<FileBean>);
const finished = ref(false);
const startNum = ref(0);

const indexList = ref([] as Array<string>)
const pageSize = ref(10);

const onLoad = async () => {
    doSearch(userStore.currentPath as string);
};

const showImagePreview = ref(false);
const imagesImagePreview = ref([] as Array<string>);

const clickCell = (item: FileBean) => {
    imagesImagePreview.value = ['/api/picture/img/' + item.url4Encode]
    showImagePreview.value = true;
    return;
}

const doSearch = (path: string = '') => {
    getList4Picture<{ rows: Array<FileBean>, total: number }>(path, startNum.value, 999999).then((data) => {
        indexList.value = [];
        if (data.total > 100) {
            pageSize.value = (data.total - data.total % 100) / 10;
        } else {
            pageSize.value = 10;
        }
        data.rows.forEach((item, index) => {
            list.value.push(item);
            if (index % pageSize.value == 0) {
                indexList.value.push(prefixZero(index + 1, 3));
            }
        })
        startNum.value = list.value.length;
        // 加载状态结束
        loading.value = false;
        // 数据全部加载完成
        if (startNum.value >= data.total) {
            finished.value = true;
        }
    }).catch(() => {
        loading.value = false;
        finished.value = true;
    });
}

const doReset = () => {
    finished.value = false;
    loading.value = true;
    list.value = [] as Array<FileBean>;
    startNum.value = 0;
    onLoad();
}


</script>
<style  scoped></style>
