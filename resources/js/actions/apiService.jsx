import fetch from 'isomorphic-fetch';
import FormData from 'form-data';
import ls from 'local-storage';
import {changeView} from "../actions/view";

import lodash from 'lodash';

export const API_HOST = (typeof window !== "undefined" && window.__CONFIG__ ? window.__CONFIG__.apiHost : global.__CONFIG__.apiHost);

function toQueryParams(params) {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
}

export function apiFetch(getState, endpoint, { isBlob = false, isText = false, method = 'GET', params, body, headers } = {}) {
    const queryParams = params ? '?' + toQueryParams(lodash.pickBy(params, lodash.identity)) : '';

    /*
     * getState could be a string containing the authToken because
     * during login it's necesary to fetch the current user data
     * but the state does not contain an authToken yet.
     * TODO: Improve how the authToken is obtained or the login flow. (tomas.gvivo - 2018-04-06)
     */

    let authToken = "";

    if (getState === undefined) {
        authToken = ls.get('authToken')
    }

    if(typeof getState === 'string') {
        authToken = getState;
    } else {
        // authToken = getState().login.authToken;
    }

    return fetch(`${API_HOST}/${endpoint}` + queryParams, {
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': authToken,
            ... headers
        },
        method,
        body: body && JSON.stringify(body),
    })
        .then(response => {
            if (response.status === 200 || response.status === 201) {
                if (isBlob) {
                    return response.blob();
                }
                if (isText) {
                    return response.text();
                }
                return response.json();
            } else if (response.status == 204) {
                return {};
            } else if (response.status === 500) {
                let p = response.json();
                p.then(json => console.log(json));
                throw { id: "serverError", jsonResponse: p };
            } else if (response.status === 400) {
                return response.json().then((json) => {
                    throw { id: "invalid fields", messages: json };
                });
            } else if (response.status === 403) {
                throw { id: "forbidden" };
            } else if (response.status === 404) {
                throw { id: "notFound" };
            } else if (response.status === 401 || response.status === 302) {
                throw { id: "authError" };
            } else if (response.status === 422) {
                return response.json().then((json) => {
                    throw { id: "validationError", validations: json.errors };
                });
            }
            throw { id: "defaultError" };
        });
}

export function apiGet(getState, endpoint, { params, headers } = {}) {
    return apiFetch(getState, endpoint, { params, headers })
}

export function apiGetBlob(getState, endpoint, { params, headers } = {}) {
    return apiFetch(getState, endpoint, { isBlob: true, params, headers })
}

export function apiPost(getState, endpoint, { params, body, headers } = {}) {
    return apiFetch(getState, endpoint, { method: 'POST', body, params, headers })
}

export function apiDelete(getState, endpoint, { params, body, headers } = {}) {
    return apiFetch(getState, endpoint, { method: 'DELETE', params, headers })
}

export function apiGetAsText(getState, endpoint, { params, headers } = {}) {
    return apiFetch(getState, endpoint, { isText: true,  params, headers })
}

export function apiPostAsText(getState, endpoint, { params, body, headers } = {}) {
    return apiFetch(getState, endpoint, { isText: true, method: 'POST', body, params, headers })
}

export function apiPut(getState, endpoint, { params, body, headers } = {}) {
    return apiFetch(getState, endpoint, { method: 'PUT', body, params, headers })
}

export function apiUpload(getState, endpoint, files, filesField) {
    return new Promise((resolve, reject) => {
        let data = new FormData();
        for(let file of files) {
            data.append(filesField + '[]', file);
        }
        let request = new XMLHttpRequest();
        request.open('post', `${API_HOST}/${endpoint}`, true);
        request.setRequestHeader('Authorization', getState().login.authToken);
        request.setRequestHeader('Accept', 'application/json');
        request.send(data);
        request.addEventListener("loadend", () => {
            if (request.status === 200) {
                resolve(JSON.parse(request.responseText));
            } else if (request.status === 403) {
                reject("errors.network.forbidden");
            } else if (request.status === 404) {
                reject("errors.network.notFound");
            } else if (request.status === 401 || request.status === 302) {
                reject("errors.network.authError");
            } else if (request.status === 413) {
                reject("errors.network.payloadTooLarge");
            } else {
                reject("errors.network.defaultError")
            }
        });
    });
}
