//ref: https://dev.to/lukocastillo/svelte-3-how-to-connect-your-app-with-a-rest-api-axios-2h4e

import api from "./api.js";
import { API_URL } from "./env.js";

const API = api(API_URL + "/api/toko/");

// item / dorayaki
export const getTokoDorayaki = async (id) => {
    try {
        let data = await API.get("/" + id + "/item");
        return data.data;
    } catch (e) {
        console.error(e);
    }
}

export const getTokoJumlahDorayakiById = async (idtoko, iddorayaki) => {
    try {
        let data = await API.get("/" + idtoko + "/item/" + iddorayaki);
        return data.data;
    } catch (e) {
        console.error(e);
    }
}

export const tokoDorayakiBaru = async (idtoko, iddorayaki) => {
    try {
        let payload = {
            iddorayaki: iddorayaki
        }
        let data = await API.post("/" + idtoko + "/item", payload);
        return data.data;
    } catch (e) {
        console.error(e);
    }
}

export const updateTokoDorayaki = async (idtoko, iddorayaki, jumlah) => {
    try {
        let payload = {
            jumlah: jumlah
        }
        let data = await API.put("/" + idtoko + "/item/" + iddorayaki, payload);
        return data.data;
    } catch (e) {
        console.error(e);
    }
}

export const deleteTokoDorayaki = async (idtoko, iddorayaki) => {
    try {
        let data = await API.delete("/" + idtoko + "/item/" + iddorayaki);
        return data.data;
    } catch (e) {
        console.error(e);
    }
}

// toko info
export const getToko = async () => {
    try {
        let data = await API.get("/");
        return data.data;
    } catch (e) {
        console.error(e);
    }
}

export const getTokoById = async (id) => {
    try {
        let data = await API.get("/" + id);
        return data.data;
    } catch (e) {
        console.error(e);
    }
}

export const createToko = async (payload) => {
    try {
        let data = await API.post("/", payload);
        return data.data;
    } catch (e) {
        console.error(e);
    }
}

export const updateToko = async (id, payload) => {
    try {
        let data = await API.put("/" + id, payload);
        return data.data;
    } catch (e) {
        console.error(e);
    }
}

export const deleteToko = async (id) => {
    try {
        let data = await API.delete("/" + id);
        return data.data;
    } catch (e) {
        console.error(e);
    }
}
