import axios from 'axios';
// Create an instance of axios with default configurations
const axiosInstance = axios.create();

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Retrieve the user token from local storage
        const userToken = localStorage.getItem('token');

        // If the token exists, add it to the request headers
        if (userToken) {
            config.headers['Authorization'] = `Bearer ${userToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            const { status } = error.response;
            if (status === 401) {
                // Redirect to the login page using React Router's history object
                window.location.href = '/WelcomePage';
            }

            //add in additional here
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
