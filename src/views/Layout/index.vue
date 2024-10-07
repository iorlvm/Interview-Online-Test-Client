<script setup>
import LayoutNav from './components/LayoutNav.vue';
import LayoutFooter from './components/LayoutFooter.vue';
</script>

<template>
    <div class="flex-container">
        <LayoutNav />
        <main class="flex-main">
            <RouterView />
        </main>
        <LayoutFooter />
    </div>
</template>

<style lang="scss" scoped>
.flex-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.flex-main {
    flex: 1;
}
</style>