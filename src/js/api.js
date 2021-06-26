// ref: https://dev.to/lukocastillo/svelte-3-how-to-connect-your-app-with-a-rest-api-axios-2h4e
import axios from "axios";

export default (base_url) => {
    const axiosAPI = axios.create({
        baseURL: base_url
    });

    const apiRequest = (method, url, request) => {
        const headers = {
            authorization: ""
        };
        //using the axios instance to perform the request that received from each http method
        return axiosAPI({
            method,
            url,
            data: request,
            headers
        }).then(res => {
            return Promise.resolve(res.data);
        })
        .catch(err => {
            return Promise.reject(err);
        });
    };

    // function to execute the http get request
    const get = (url, request) => apiRequest("get", url, request);

    // function to execute the http delete request
    const deleteRequest = (url, request) => apiRequest("delete", url, request);

    // function to execute the http post request
    const post = (url, request) => apiRequest("post", url, request);

    // function to execute the http put request
    const put = (url, request) => apiRequest("put", url, request);

    // expose your method to other services or actions
    const API = {
        get,
        delete: deleteRequest,
        post,
        put
    };

    return API;
};
