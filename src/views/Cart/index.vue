<script setup>
import { useCartStore } from '@/stores/cart';
import { ElMessage } from 'element-plus';
import { computed, ref } from 'vue';

const cartStore = useCartStore();

// 計算購物車中的商品列表
const cartItems = computed(() => Object.values(cartStore.cart));

// 計算購物車總價
const totalPrice = computed(() => cartStore.calculateTotalPrice());

// 訂購人姓名
const customerName = ref('');

// 編輯商品數量
const updateQuantity = (productId, quantity) => {
    if (quantity === 0) {
        // 如果數量設為0，從購物車中移除商品
        delete cartStore.cart[productId];
    } else {
        // 更新商品數量
        cartStore.cart[productId].quantity = quantity;
    }
};

// 確認結帳
const checkout = () => {
    if (!customerName.value) {
        ElMessage.warning("請填寫訂購人姓名才能結帳！");
        return;
    }
    // 處理結帳邏輯...
    cartStore.createOrder(customerName.value);
};
</script>

<template>
    <div class="container">
        <h1 class="header">購物車</h1>
        <el-table :data="cartItems" style="width: 100%">
            <el-table-column prop="name" label="商品名稱" />
            <el-table-column prop="price" label="單價" />
            <el-table-column prop="quantity" label="數量">
                <template v-slot="scope">
                    <el-select v-model="scope.row.quantity" @change="updateQuantity(scope.row.id, scope.row.quantity)"
                        style="width: 100px;">
                        <el-option v-for="n in 11" :key="n" :label="n - 1" :value="n - 1" />
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="小計" v-slot="scope">
                {{ scope.row.price * scope.row.quantity }}
            </el-table-column>
        </el-table>

        <div class="total">
            <p class="total-price">總價: {{ totalPrice }}</p>
            <div class="grow"></div>
            <el-input v-model="customerName" placeholder="請輸入訂購人姓名" style="width: 200px;" />
            <el-button type="primary" class="checkout-btn" @click="checkout" :disabled="!customerName">結帳</el-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.grow {
    flex-grow: 1;
}

.header {
    font-size: 2em;
    margin: 20px;
}

.total {
    display: flex;
    padding: 20px;
    justify-content: space-between;
    align-items: center;
}

.total-price {
    font-size: 1.2em;
    /* 調整字體大小 */
    font-weight: bold;
}

.checkout-btn {
    margin-left: 20px;
}
</style>
