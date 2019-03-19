import React, { Component } from  'react'
import lodash from "lodash";
import ls from "local-storage";
import fetch from "isomorphic-fetch";

export default function withApiService(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {data: []}
        }

        apiFetch (getState, endpoint, { isBlob = false, isText = false, method = 'GET', params, body, headers, message, onSuccess } = {}) {
            const API_HOST = (typeof window !== "undefined" && window.__CONFIG__ ? window.__CONFIG__.apiHost : global.__CONFIG__.apiHost);
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
                        // return response.json();
                        return response.json().then((json) => {
                           this.showMessage(json, message, onSuccess)
                        });
                    } else if (response.status === 204) {
                        return {};
                    } else if (response.status === 500) {
                        return response.json().then((json) => {
                            this.showError(json)
                        });
                    } else if (response.status === 400) {
                        return response.json().then((json) => {
                            this.showError(json)
                        });
                    } else if (response.status === 403) {
                        return response.json().then((json) => {
                            this.showError(json)
                        });
                    } else if (response.status === 404) {
                        return response.json().then((json) => {
                            this.showError(json)
                        });
                    } else if (response.status === 401 || response.status === 302) {
                        return response.json().then((json) => {
                            this.showError(json)
                        });
                    } else if (response.status === 422) {
                        return response.json().then((json) => {
                            this.showError(json)
                        });
                    }
                    return response.json();
                });
        }

        showError (json) {
            json.map((message) => {
                this.props.enqueueSnackbar(JSON.stringify(message), { variant: 'error', autoHideDuration: 2000 });
            });
        }

        showMessage (json, message, onSuccess) {
            if (message !== undefined) {
                this.props.enqueueSnackbar(
                    message,
                    {
                        variant: 'success',
                        autoHideDuration: 2000,
                        onClose:
                            () => {
                            if (onSuccess !== undefined) {
                                onSuccess()
                            }
                        }
                    }
                );
            } else {
                if (onSuccess !== undefined) {
                    onSuccess()
                }
            }
        }

        apiGet (endpoint, { params, headers } = {}) {
            return this.apiFetch(undefined, endpoint, { params, headers })
        }

        apiPost (endpoint, { params, body, headers, message, onSuccess } = {}) {
            return this.apiFetch(undefined, endpoint, { method: 'POST', body, params, headers, message, onSuccess })
        }

        apiPut ( endpoint, { params, body, headers, message, onSuccess } = {}) {
            return this.apiFetch(undefined, endpoint, { method: 'PUT', body, params, headers, message, onSuccess })
        }

        apiDelete ( endpoint, { params, body, headers, message, onSuccess } = {}) {
            return this.apiFetch(undefined, endpoint, { method: 'DELETE', params, headers, message, onSuccess })
        }

        render () {
            return <WrappedComponent
                apiGet={(endpoint, { params, headers }) => this.apiGet(endpoint, { params, headers })}
                apiPost={(endpoint, { params, body, headers, message, onSuccess }) => this.apiPost(endpoint, { params, body, headers, message, onSuccess })}
                apiPut={(endpoint, { params, body, headers, message, onSuccess }) => this.apiPut(endpoint, { params, body, headers, message, onSuccess })}
                apiDelete={(endpoint, { params, body, headers, message, onSuccess }) => this.apiDelete(endpoint, { params, body, headers, message, onSuccess })}
                {...this.props }
            />
        }
    }

}
