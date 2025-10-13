import {BlogPost, Category, Email, Paginated, Service, ServiceRatingReview, ServiceTag} from './types';
import useAxios from 'axios-hooks'
import qs from "querystring";
import axios, {Method} from 'axios';
import * as process from "process";

const PROD_MAIN_URL = "https://hainu.uk/api/v1/"
const DEV_MAIN_URL = "http://localhost:8000/api/v1/"

console.log(process.env.NODE_ENV);
console.log(process.env);
const MAIN_URL = process.env.NODE_ENV !== 'production' ? DEV_MAIN_URL : PROD_MAIN_URL;
// console.log('process.env.NODE_ENV = ', process.env);


async function makeRequest<DataType>(method: Method, url: string, data = {}, params = {}): Promise<DataType> {
    // console
    let query = qs.stringify(params);
    return axios({
        method,
        url: MAIN_URL + url + (query ? "?" + query : ""),
        params: {},
        data,
    }).catch(err => {
        console.log("ERROR", err)
        throw err;
    }).then(response => {
        if (response.status === 400 || response.status === 500)
            throw response.data
        return response.data;
    });
}

function request<DataType>(url: string, params = {}) {

    let urlParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach((v) => {
                urlParams.append(key, "" + v);
            })
        } else {
            urlParams.append(key, "" + value);
        }
    });
    let config = {
        url: MAIN_URL + url,
        method: 'get',
        params: urlParams,
        headers: {
            'Content-Type': 'application/json',
        },

    }
    return useAxios<DataType, any, any>(config);
}


export const getClient = () => {
    return {
        blog: {
            post(postID: string) {
                return request<BlogPost>(`blog/posts/${postID}/`)
            },
            posts() {
                return request<Paginated<BlogPost>>('blog/posts/')
            },
        },
        mail: {
            subscribe(mail: string){
                return makeRequest<Email>("POST", `users/email/`, {mail}, {})
            }
        },
        catalog: {
            service(serviceID: string) {
                return request<Service>(`catalog/services/${serviceID}/`)
            },
            services(filters: any = {}) {
                if (filters['page_size'] == undefined) {
                    filters['page_size'] = 20;
                }
                return makeRequest<Paginated<Service>>("GET", 'catalog/services/', {}, filters)
            },
            serviceReviews(serviceID: number) {
                return makeRequest<Paginated<ServiceRatingReview>>("GET", `catalog/reviews/`, {}, {service_rating__service__id: serviceID})
            },
            tags(filters: any = {}) {
                return makeRequest<Paginated<ServiceTag>>("GET", 'catalog/tags/', {}, {page_size: 100, ...filters})
            },
            categories() {
                return request<Paginated<Category>>('catalog/categories/')
            },
        },
    }
};

export default getClient()