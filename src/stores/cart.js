import { defineStore } from 'pinia';
import { ref } from 'vue';
import { createOrderAPI } from '@/apis/order';
import router from '@/router';

export const useCartStore = defineStore('cart', () => {
    const cart = ref({});

    const addToCart = (product, count) => {
        const productId = product.id;

        if (cart.value[productId]) {
            cart.value[productId].quantity += count;
            if (cart.value[productId].quantity > 10) {
                cart.value[productId].quantity = 10;
                ElMessage.warning(`同一種商品一次最多訂購十個`);
            } else {
                ElMessage.success(`${cart.value[productId].name} x ${count} 加入購物車`);
            }
        } else {
            cart.value[productId] = {
                ...product,
                quantity: count
            };
            ElMessage.success(`${cart.value[productId].name} x ${count} 加入購物車`);
        }
    };

    // 計算總價
    const calculateTotalPrice = () => {
        let total = 0;
        for (const productId in cart.value) {
            const product = cart.value[productId];
            total += product.price * product.quantity;
        }
        return total;
    };

    const clearCart = () => {
        cart.value = {}; // 清空購物車
    };

    // 創建訂單
    const createOrder = async (customerName) => {
        if (!customerName) {
            ElMessage.warning(`請提供顧客姓名以創建訂單`);
            return;
        }

        // 將 cart 轉換為 API 所需的格式
        const products = Object.keys(cart.value).map(productId => ({
            productId,
            count: cart.value[productId].quantity
        }));

        const res = await createOrderAPI({ customerName, products });
        if (!res.success) return;

        // 清空購物車
        clearCart();
        router.push('/orders/' + res.data.orderId);
    };

    return {
        cart,
        addToCart,
        clearCart,
        createOrder,
        calculateTotalPrice
    }
}, {
    persist: true
});

