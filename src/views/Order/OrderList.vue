<script setup>
import { getOrderListAPI } from '@/apis/order';
import { onMounted, ref } from 'vue';

const orderList = ref([]);
const totalOrders = ref(0);
const pageSize = 20;

const loadOrders = async (newPage = 1) => {
    const res = await getOrderListAPI(newPage - 1);

    console.log(res);

    if (res.success) {
        orderList.value = res.data;
        totalOrders.value = res.total;
    }
};

const handlePageChange = (newPage) => {
    loadOrders(newPage);
};

onMounted(() => {
    loadOrders();
});
</script>

<template>
    <div class="container">
        <div class="order-list-page">
            <h1 class="header">訂單列表</h1>
            <el-table :data="orderList" stripe>
                <el-table-column prop="orderId" label="訂單編號" width="150" />
                <el-table-column label="顧客名稱" width="200">
                    <template #default="{ row }">
                        <span>{{ row.customer?.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="商品列表">
                    <template #default="{ row }">
                        <ul>
                            <li v-for="(product, index) in row.products" :key="index">
                                {{ product.productName }}&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;{{ product.count
                                }}&nbsp;&nbsp;{{
                                    product.productUnit }}
                            </li>
                        </ul>
                    </template>
                </el-table-column>
                <el-table-column prop="totalPrice" label="總金額" width="150" />
                <el-table-column label="狀態" width="120">
                    <template #default="{ row }">
                        <span>{{ row.success ? '成交' : '失敗' }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="訂單日期" width="130">
                    <template #default="{ row }">
                        <span>{{ new Date(row.createDate).toLocaleDateString() }}</span>
                    </template>
                </el-table-column>
            </el-table>

            <div class="page">
                <el-pagination :page-size="pageSize" :total="totalOrders" @current-change="handlePageChange"
                    layout="prev, pager, next" :hide-on-single-page="true" background />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.order-list-page {
    padding: 20px;
    margin: 0 auto;
}

.page {
    display: flex;
    justify-content: center;
    margin: 20px;
}

.header {
    text-align: center;
    font-size: 2em;
    margin-bottom: 20px;
}
</style>