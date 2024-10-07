<script setup>
import { ref, onMounted } from 'vue';
import ProductCard from './components/ProductCard.vue';
import { getPrductsAPI } from '@/apis/product';

const products = ref([]);
const page = ref(0);

let total = 99999999;
let isProcess = false;

const loadProducts = async (newPage = page.value) => {
    if (isProcess || total <= products.value.length) return;
    isProcess = true;
    const res = await getPrductsAPI(newPage);
    console.log(res);
    total = res.total;
    products.value.push(...res.data);

    page.value = newPage;
    isProcess = false
};

const loadMore = (entries) => {
    if (entries[0].isIntersecting) {
        loadProducts(page.value + 1);
    }
};

onMounted(async () => {
    await loadProducts();

    const observer = new IntersectionObserver(loadMore);
    const sentinel = document.querySelector('#sentinel');
    observer.observe(sentinel);
});
</script>

<template>
    <div class="container">
        <h1 class="header">商品列表</h1>
        <div class="product-list">
            <ProductCard v-for="(item, index) in products" :key="index" :product="item" />
        </div>
        <div id="sentinel" class="sentinel"></div>
    </div>
</template>

<style scoped>
.header {
    text-align: center;
    font-size: 2em;
    margin-top: 20px;
    color: #333;
}

.product-list {
    padding: 35px;
    gap: 25px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.sentinel {
    margin: 20px 0;
    color: #999;
    font-size: 1.2em;
}
</style>
