<script setup>
import { ref } from 'vue';
import { useCartStore } from '@/stores/cart';
import { ElMessage } from 'element-plus';


const cartStore = useCartStore();
const props = defineProps([
    'product'
])

const count = ref(1);

const addToCart = () => {
    cartStore.addToCart(props.product, count.value);
};
</script>

<template>
    <el-card class="product-card" shadow="hover">
        <div class="image-container">
            <img :src="product.imgSrc" alt="商品圖片" />
        </div>
        <div class="card-content">
            <h2 class="product-name">{{ product.name }}</h2>
            <p class="product-price">NTD {{ product.price }} / {{ product.unit }}</p>


            <div class="action-row">
                <el-select v-model="count" placeholder="選擇數量" class="quantity-select">
                    <el-option v-for="n in product.stock > 10 ? 10 : product.stock" :key="n" :label="n"
                        :value="n"></el-option>
                </el-select>
                <el-button type="primary" class="add-to-cart-btn" @click="addToCart">選購商品</el-button>
            </div>
        </div>
    </el-card>
</template>

<style scoped>
.product-card {
    flex: 1 1 22%;
    min-width: 220px;
    max-width: 300px;
    border-radius: 8px;
}

.image-container {
    width: 100%;
    aspect-ratio: 4/3;
    overflow: hidden;
    border-radius: 8px;
}

.card-content {
    padding: 12px;
    text-align: center;
}

.product-name {
    font-size: 1.5em;
    margin: 8px 0;
    color: #333;
}

.product-price {
    font-size: 1.2em;
    color: #e74c3c;
    margin: 8px 0;
}

.action-row {
    padding: 0 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
}

.quantity-select {
    max-width: 100px;
}

.add-to-cart-btn {
    font-size: 1.1em;
    margin-left: 25px;
    white-space: nowrap;
}
</style>
