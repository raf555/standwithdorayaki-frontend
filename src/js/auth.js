import { getTokoById } from "./../js/tokoapi.js"

export const istokoexist = async (id) => {
    try {
        let data = await getTokoById(id);
        if (data && data.length === 0) {
            return null;
        }
        return data[0];
    } catch (e) {
        //console.error(e);
        return null;
    }
}

export const key = "loggedin";

export const getloggedinfo = () => {
    try {
        let data = JSON.parse(localStorage.getItem(key));
        if (!data.id) {
            return null;
        }
        return data;
    } catch (e) {
        return null;
    }
}

export const verifylogin = istokoexist;

export const login = (data) => {
    localStorage.setItem(key, JSON.stringify({
        id: data.id,
        nama: data.nama
    }));
}

export const logout = (redirect = false) => {
    localStorage.setItem(key, "");
    if (redirect) {
        location.href = "#/login";
    }
}

export const verifylogindata = async () => {
    let valid = getloggedinfo();
    if (!valid) {
        return null;
    } else {
        let toko = await verifylogin(valid.id);
        if (!toko) {
            return null;
        }
        return toko;
    }
}
