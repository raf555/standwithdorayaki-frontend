//ref: https://dev.to/lukocastillo/svelte-3-how-to-connect-your-app-with-a-rest-api-axios-2h4e

import api from "./api.js";
import { API_URL } from "./env.js";

const API = api(API_URL + "/api/dorayaki/");

export const getDorayaki = async () => {
    try {
        let data = await API.get("/");
        return data.data;
    } catch (e) {
        console.error(e);
    }
}

export const getDorayakiById = async (id) => {
    try {
        let data = await API.get("/" + id);
        return data.data;
    } catch (e) {
        console.error(e);
    }
}

export const createDorayaki = async (payload) => {
    try {
        let data = await API.post("/", payload);
        return data.data;
    } catch (e) {
        console.error(e);
    }
}

export const updateDorayaki = async (id, payload) => {
    try {
        let data = await API.put("/" + id, payload);
        return data.data;
    } catch (e) {
        console.error(e);
    }
}

export const deleteDorayaki = async (id) => {
    try {
        let data = await API.delete("/" + id);
        return data.data;
    } catch (e) {
        console.error(e);
    }
}
