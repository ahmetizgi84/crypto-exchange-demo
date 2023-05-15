import axios from 'axios';
import { useState, useEffect } from 'react';
import binanceIntegrationApi from '../api/binanceIntegrationApi'


function useFetch(url, requestType = "get", params = null) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            if (requestType == "get") {
                const { data: responseData } = await binanceIntegrationApi.get(url);
                setData(responseData);
            } else {
                if (params != null) {
                    const { data: responseData } = await binanceIntegrationApi.post(url, params);
                    setData(responseData);
                } else {
                    const { data: responseData } = await binanceIntegrationApi.post(url);
                    setData(responseData);
                }

            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err.message);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    return { data, loading, error };
}

export default useFetch;

