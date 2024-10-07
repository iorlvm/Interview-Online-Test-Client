<script setup>
import { getOrderAPI } from '@/apis/order';
import { onMounted, ref } from 'vue';
import router from '@/router';
import { useRoute } from 'vue-router';

const route = useRoute();
const order = ref({});

const home = () => {
    router.push("/");
}

onMounted(async () => {
    const id = route.params.id;

    const res = await getOrderAPI(id);
    if (res.success) {
        order.value = res.data
    }
})
</script>

<template>
    <div class="order-page">
        <h1 class="header">訂單結果</h1>
        <div class="order-details">
            <p><strong>訂單編號:</strong> {{ order.orderId }}</p>
            <p><strong>顧客姓名:</strong> {{ order.customer?.name }}</p>
            <h2>訂單商品:</h2>
            <el-table :data="order.products" stripe class="product-table">
                <el-table-column prop="productName" label="商品名稱" />
                <el-table-column label="數量">
                    <template #default="{ row }">
                        <span>{{ row.count }} {{ row.productUnit }}</span>
                    </template>
                </el-table-column>
                <el-table-column :label="'價格'">
                    <template #default="{ row }">
                        <span>NT$ {{ row.productPrice * row.count }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="total">
                <p><strong>總價:</strong> NT$ {{ order.totalPrice }}</p>
                <el-button type="primary" @click="home">繼續購物</el-button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.order-page {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
}

.header {
    text-align: center;
    font-size: 2em;
    margin-bottom: 20px;
}

.order-details {
    margin-top: 20px;
    padding: 15px;
    background-color: #f9f9f9;
    border-radius: 8px;
}

.product-table {
    width: 100%;
    margin-top: 15px;
}

.total {
    font-size: 1.2em;
    margin-top: 10px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
