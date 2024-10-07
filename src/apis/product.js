import httpInstance from "@/utils/axiosInit";

export const getPrductsAPI = (page = 0, size = 20) => {
    return httpInstance({
        url: '/products',
        method: 'GET',
        params: {
            page,
            size
        }
    });
}