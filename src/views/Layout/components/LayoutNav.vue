<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore();
</script>

<template>
    <header>
        <nav class="container">
            <ul>
                <li class="logo">
                    <router-link to="/">
                        好吃蔬果
                    </router-link>
                </li>
                <li>
                    <router-link to="/orders">
                        查看訂單列表
                    </router-link>
                </li>
                <li class="grow"></li>
                <li>
                    <router-link to="/cart">
                        購物車
                    </router-link>
                </li>
                <template v-if="!userStore.userInfo.name">
                    <router-link to="/register">
                        <li>加入會員</li>
                    </router-link>
                    <router-link to="/login">
                        <li>登入</li>
                    </router-link>
                </template>
                <template v-else>
                    <li>
                        <router-link to="/member">
                            <i class="bi bi-person-circle"></i>&nbsp;{{ userStore.userInfo.name }}
                        </router-link>
                    </li>
                </template>
            </ul>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
header {
    background-color: #29abe2;
    padding: 8px 10px 5px;
    min-width: 768px;
}

a {
    color: #ffffff;
}

ul {
    display: flex;
    align-items: center;
    padding: 0 20px;

    .logo {
        font-size: 1.3em;
        letter-spacing: 1px;
        font-weight: bold;
    }

    li {
        margin: 2px 8px;
        font-size: 1.1em;
    }

    .grow {
        flex-grow: 1;
    }
}
</style>
