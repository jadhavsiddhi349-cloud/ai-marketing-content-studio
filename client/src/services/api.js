import axios from "axios";

const API = axios.create({
    baseURL: "https://ai-marketing-content-studio.onrender.com/api"
});

// ====================
// BRAND APIs
// ====================

export const createBrand = (data) => {
    return API.post("/brands", data);
};

export const getBrands = () => {
    return API.get("/brands");
};

export const getBrand = (id) => {
    return API.get(`/brands/${id}`);
};

export const updateBrand = (id, data) => {
    return API.put(`/brands/${id}`, data);
};

export const deleteBrand = (id) => {
    return API.delete(`/brands/${id}`);
};


// ====================
// CAMPAIGN APIs
// ====================

export const createCampaign = (data) => {
    return API.post("/campaigns", data);
};

export const getCampaigns = () => {
    return API.get("/campaigns");
};

export const getCampaign = (id) => {
    return API.get(`/campaigns/${id}`);
};

export const updateCampaign = (id, data) => {
    return API.put(`/campaigns/${id}`, data);
};

export const approveCampaign = (id) => {
    return API.put(`/campaigns/${id}/approve`);
};


// ====================
// QUALITY CHECK
// ====================

export const qualityCheck = (id) => {
    return API.post(`/quality/${id}`);
};
// ====================
// AI ASSISTANT
// ====================

export const chatWithAssistant = (data) => {
    return API.post("/assistant/chat", data);
};
export default API;