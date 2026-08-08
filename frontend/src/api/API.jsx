import axios from "axios";


const API = axios.create({

baseURL: "https://full-stack-library-management-system--nayabnaeem666.replit.app"

});



API.interceptors.request.use(

    (config)=>{


        const token = localStorage.getItem("token");


        if(token){

            config.headers.Authorization = 
            `Bearer ${token}`;

        }


        return config;

    },


    (error)=>{

        return Promise.reject(error);

    }

);



export default API;