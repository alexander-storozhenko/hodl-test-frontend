const domain = 'http://localhost:9292'
const apiDomain = "";
const defaultHeaders = {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "http://localhost:9292",
    // "Access-Control-Allow-Credentials": true
};

export const get = async (path, headers = {}, params = {}) => {
    const res = await fetch(`${domain}/${path}`, {
        method: "GET",
        credentials: "include",
        headers: {...defaultHeaders, ...headers},
        ...params,
    });

    return checkResult(res);
};

export const getApi = async (path, headers = {}, params = {}) => {
    return await fetch(`${apiDomain}/${path}`, {
        method: "GET",
        credentials: "include",
        headers: {...defaultHeaders, ...headers},
        ...params,
    });
};

export const postFormApi = async (path, formData) => {
    try {
        const res = await fetch(`${apiDomain}/${path}`, {
            method: "POST",
            credentials: "include",
            body: formData,
        });
        return checkResult(res);
    } catch (e) {
        throw new Error(e);
    }
};


export const patch = async (path, body, headers = {}) => {
    const res = await fetch(`${domain}/${path}`, {
        method: "PATCH",
        credentials: "include",
        headers: {...defaultHeaders, ...headers},
        body: JSON.stringify(body),
    });

    return checkResult(res);
};

export const patchForm = async (path, formData) => {
    try {
        const res = await fetch(`${domain}/${path}`, {
            method: "PATCH",
            credentials: "include",
            body: formData,
        });
        return checkResult(res);
    } catch (e) {
        throw new Error(e);
    }
};

export const put = async (path, body, headers = {}) => {
    const res = await fetch(`${domain}/${path}`, {
        method: "PUT",
        credentials: "include",
        headers: {...defaultHeaders, ...headers},
        body: JSON.stringify(body),
    });

    return checkResult(res);
};

export const putForm = async (path, form, headers = {}) => {
    const res = await fetch(`${domain}/${path}`, {
        method: "PUT",
        credentials: "include",
        body: form,
    });

    return checkResult(res);
};


export const options = async (path, body, headers = {}) => {
    const res = await fetch(`${domain}/${path}`, {
        method: "OPTIONS",
        credentials: "include",
        headers: {...defaultHeaders, ...headers},
        body: JSON.stringify(body),
    });

    return checkResult(res);
};

export const post = async (path, body, headers = {}) => {
    try {
        const res = await fetch(`${domain}/${path}`, {
            method: "POST",
            credentials: "include",
            headers: {...defaultHeaders, ...headers},
            body: JSON.stringify(body),
        });
        return checkResult(res);
    } catch (e) {
        throw new Error(e);
    }

};

export const postForm = async (path, formData) => {
    try {
        const res = await fetch(`${domain}/${path}`, {
            method: "POST",
            credentials: "include",
            body: formData,
        });
        return checkResult(res);
    } catch (e) {
        throw new Error(e);
    }
};

export const delete_ = async (path, body, headers = {}) => {
    try {
        const res = await fetch(`${domain}/${path}`, {
            method: "DELETE",
            credentials: "include",
            headers: {...defaultHeaders, ...headers},
            body: JSON.stringify(body),
        });
        return checkResult(res);
    } catch (e) {
        throw new Error(e);
    }
};

export const deleteFile = async (path, body, headers = {}) => {
    try {
        const res = await fetch(`${domain}/${path}`, {
            method: "DELETE",
            credentials: "include",
            headers: {...defaultHeaders, ...headers},
            body: JSON.stringify(body),
        });
        return checkFileResult(res);
    } catch (e) {
        throw new Error(e);
    }
};

const checkResult = async (res) => {
    const data = await res.json();

    if (!res.ok) {
        const detail = Array.isArray(data.detail)
            ? data.detail[0].msg
            : data.detail || "Unknown error";

        throw {status: data.status, detail};
    }

    return data;
};

const checkFileResult = async (res) => {
    const data = await res.blob();

    if (!res.ok) {
        const detail = Array.isArray(data.detail)
            ? data.detail[0].msg
            : data.detail || "Unknown error";

        throw {status: data.status, detail};
    }

    return data;
};

