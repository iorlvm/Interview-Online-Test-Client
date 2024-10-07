import httpInstance from "@/utils/axiosInit";

export const createOrderAPI = ({ customerName, products }) => {
    return httpInstance({
        url: '/orders',
        method: 'POST',
        data: {
            customer: {
                name: customerName
            },
            products
        }
    });
}

export const getOrderAPI = (orderId) => {
    return httpInstance({
        url: `/orders/${orderId}`,
        method: 'GET'
    });
}

export const getOrderListAPI = (page = 0, size = 20) => {
    return httpInstance({
        url: `/orders`,
        method: 'GET',
        params: {
            page,
            size
        }
    });
}