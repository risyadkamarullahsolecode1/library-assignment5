import apiClient from "../axiosConfig";

const getAll = async (params) => {
    return await apiClient.get("/Book", { params });
};

const get = async (id) => {
    return await apiClient.get(`/Book/${id}`);
};

const create = async (data) => {
    return await apiClient.post("/Book", data);
};

const update = async (id, data) => {
    return await apiClient.put(`/Book/${id}`, data);
};

const remove = async (id) => {
    return await apiClient.delete(`/Book/${id}`);
};

const search = async (params) => {
    return await apiClient.get("/Book/search-basic",{params});
};

const BookService = {
    getAll,
    get,
    create,
    update,
    remove,
    search
};
    
export default BookService;