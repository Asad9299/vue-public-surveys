import axios, { AxiosResponse } from "axios";
import { userStore, type User } from "./user";

export default class ajax {
    
    user: User;
    headers: Record<string, string> =  {};
    APP_API_URL: String = import.meta.env.VITE_API_URL;

    constructor() {
        this.setHeader('Accept', 'application/json');
        const userStoreObj = userStore();
        this.user = userStoreObj.getUser();
        if (this.user.isLoggedIn) {
            this.setHeader('Authorization', this.getAuthBearerHeader())
        }
    }

    setHeader(key: string, value: string) : void {
        this.headers[key] = value;
    }

    getAuthBearerHeader() : string {
        return `Bearer ${this.user.authToken}`;
    }

    async get<T>(endpoint: string): Promise<AxiosResponse<T>> {
        let response = await axios.get(this.APP_API_URL + endpoint, { headers: this.headers });
        return response;
    }

    async post<T>(endpoint: string, data: T): Promise<AxiosResponse> {
        let response = await axios.post(this.APP_API_URL + endpoint, data , { headers: this.headers });
        return response;
    }

}