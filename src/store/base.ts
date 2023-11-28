import { defineStore } from 'pinia'

export const useBaseStore = defineStore({
    id: 'base',
    state: () => {
        return {
            currentPath: '', //当前位置
            currentTitle: '', //当前标题
            currentMenu: '',//当前菜单

        }
    },
    actions: {
        updateCurrentPath(currentPath: string) {
            this.currentPath = currentPath
        },
        updateCurrentTitle(currentTitle: string) {
            this.currentTitle = currentTitle
        },
        updateCurrentMenu(currentMenu: string) {
            this.currentMenu = currentMenu
        },
    },
    // 开启数据缓存
    persist: {
        enabled: true
    }
})
