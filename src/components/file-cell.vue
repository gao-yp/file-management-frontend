<template>
    <van-swipe-cell>
        <!-- <template #left>
            <van-button square type="primary" text="选择" />
        </template> -->

        <table style="background-color: white;">
            <tr>
                <td style="text-align: right;">
                    <template v-if="props.file.isFile">
                        <van-icon v-if="isVideo(props.file.fileName)" size="40" name="video-o" />
                        <van-icon v-else-if="isPicture(props.file.fileName)" size="40" name="photo-o" />
                        <van-icon v-else-if="isText(props.file.fileName)" size="40" name="notes-o" />
                        <van-icon v-else size="40" name="warning-o" />
                    </template>
                    <template v-else>
                        <van-icon v-if="props.file.fileName == '..'" size="40" name="revoke" />
                        <van-icon v-else size="40" name="peer-pay" />
                    </template>
                </td>
                <td style="width: 100%;">
                    <van-row>
                        <van-col span="24" @click="clickCell()">
                            <van-text-ellipsis v-if="props.isShowFull" :content="props.file.url" rows="2" expand-text="展开"
                                collapse-text="收起" />
                            <van-text-ellipsis v-else :content="props.file.fileName" rows="2" position="middle" />
                        </van-col>
                    </van-row>
                    <van-row style="font-size:xx-small;" v-if="fileIndex > 0">
                        <van-col span="24" style="color: grey;">
                            <table>
                                <tr>
                                    <td style="width: 100px;"><span>位置:{{ fileIndex }}</span></td>
                                    <td style="width: 100px;">
                                        <span v-if="props.file.isFile">{{ formatFileSize(props.file.fileSize) }}</span>
                                        <span v-else-if="props.file.childrenSize >= 0">{{ props.file.childrenSize }}项
                                        </span>
                                    </td>
                                    <td style="width: 150px;text-align: right;"> <span v-if="props.file.lastTime">{{
                                        props.file.lastTime }}
                                            &nbsp; &nbsp;</span>
                                    </td>
                                </tr>
                            </table>
                        </van-col>
                    </van-row>
                </td>
            </tr>
        </table>
        <template #right>
            <van-button square type="danger" text="删除" style="height: 100%;" @click="onDelFile" />
        </template>
    </van-swipe-cell>
</template>
<script setup lang="ts">
import { formatFileSize, isVideo, isPicture, isText } from "@/utils";

type FileBean = {
    url: string;
    url4Encode: string,
    fileName: string;
    fileSize: number;
    childrenSize: number;
    lastTime: string;
    isFile: boolean;
};

interface Props {
    file: FileBean;
    fileIndex: number;
    isBorder?: true;
    isShowFull?: boolean
}

const props = defineProps<Props>();

const emit = defineEmits(['onClick', 'onDelFile'])

const clickCell = () => {
    emit('onClick', props.file)
}
const onDelFile = () => {
    emit('onDelFile', props.file.url4Encode)
}

</script>
<style  scoped>
.file-cell-border {}
</style>
