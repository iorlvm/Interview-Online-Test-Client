import axios from "axios";
import { useUserStore } from "@/stores/user";
import router from '@/router';

// 請求基礎路徑配置
const baseURL = 'http://localhost:8080/api';

const httpInstance = axios.create(
    {
        baseURL: baseURL,
        timeout: 5000,
    }
)

// 請求攔截器
httpInstance.interceptors.request.use(
    config => {
        // 發送請求前 (攜帶Token)
        const userStore = useUserStore();
        const token = userStore.userInfo.token;
        if (token) {
            // 當有token的時候 請求攜帶token
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        // 請求錯誤時
        return Promise.reject(error);
    }
);

// 響應攔截器
httpInstance.interceptors.response.use(
    response => {
        // 響應數據時 同一處理錯誤訊息
        const res = response.data;
        if (res && !res.success) {
            ElMessage({
                type: 'warning',
                message: res.errorMsg
            })
        }

        return response.data;
    },
    async error => {
        // 響應錯誤時
        // console.log(error);

        if (error.response.status === 401) {
            const originalRequest = error.config;
            const userStore = useUserStore();

            if (!originalRequest._retry) {
                originalRequest._retry = true;

                // 攜帶reflash token 重新刷新
                const refreshToken = userStore.userInfo.refreshToken;
                if (refreshToken) {
                    const tokenResponse = await axios.get(baseURL + '/fresh-token', {
                        headers: {
                            'Authorization': `Bearer ${refreshToken}`
                        }
                    });

                    userStore.updateInfo(tokenResponse.data);

                    // 使用新取得的token重新發送一次原本的請求
                    originalRequest.headers['Authorization'] = `Bearer ${userStore.userInfo.token}`;
                    return await httpInstance(originalRequest);
                }
            }

            ElMessage({
                type: 'warning',
                message: '使用者未登入'
            })
            userStore.clearUserInfo();
            router.push('/login');
        } else {
            ElMessage.error(error.response.data.message);
            return Promise.reject(error);
        }
    }
);

export default httpInstance