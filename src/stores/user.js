import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
    const userInfo = ref({});

    const getUserInfo = async ({ username, password }) => {
    };

    const updateInfo = (updateInfo) => {
        userInfo.value = updateInfo.data;
    }

    const clearUserInfo = async () => {
        userInfo.value = {};
    }

    return {
        userInfo,
        getUserInfo,
        updateInfo,
        clearUserInfo
    }
}, {
    persist: true
});

