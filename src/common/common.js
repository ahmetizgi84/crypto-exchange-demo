import React from 'react';
import axios from 'axios';
import Constants from './constants';

var Http = axios.create({
    baseURL: Constants.BinanceIntegrationApiUrl,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
    },
    timeout: 40000,
    /* transformRequest: [function (data) {
         return querystring.stringify(data);
     }],*/
    withCredentials: true
});

Http.interceptors.request.use(function (config) { // AXIOS REQUEST INTERCEPTOR

    var preferredLang = getPreferredLanguage();
    if (preferredLang)
        config.headers['Accept-Language'] = preferredLang.code;

    var selectedTenant = cacheGet('selectedTenant');
    if (selectedTenant)
        config.headers['X-TenantId'] = selectedTenant.tenantId;

    var url = config.url.toLowerCase();
    if (!url.endsWith('/login')
        && !url.endsWith('/forgotpassword')
        && !url.endsWith('/resetpassword')
        && !url.endsWith('/verifyuser')
        && !url.endsWith('/register')
        && !url.endsWith('/getforgotpasswordemail')) {
        var tokenStr = getToken();
        if (tokenStr != null)
            config.headers['Authorization'] = 'Bearer ' + tokenStr;
        else {
            userManager.signoutRedirect();
            return Promise.reject('TOKEN_NOT_FOUND')
        }
    }
    return config;
}, function (error) {
    console.error(error)
    return Promise.reject(error);
});

Http.interceptors.response.use(function (response) { // AXIOS RESPONSE INTERCEPTOR
    var data = response.data;
    if (_.get(data, 'data.isWorkflowStarted', false))
        return Promise.reject('WORKFLOW_DELEGATED');
    else if (_.get(data, 'data.isWorkflowFaulted', false))
        return Promise.reject('WORKFLOW_FAULTED');
    else if (_.get(data, 'data.isWorkflowFinished', false))
        return Promise.reject('WORKFLOW_FINISHED');
    else if ((data.status != undefined && data.status === false)
        || (data.success != undefined && data.success === false))
        return Promise.reject({
            reason: "UNSUCCESSFUL_RESPONSE",
            response
        });

    return response;
}, function (error) {
    console.error(error);

    if (error.response != null && error.response.status === 401) {
        console.warn('401 Unauthorized - Logging out...');
        setTimeout(() => userManager.signoutRedirect(), 2500);
    }

    return Promise.reject(error);
});
