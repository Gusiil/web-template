import axios from "axios";

declare interface IObjectKeys {
    [key: string]: any
}

interface BaseResponse {
    code: string;
    data: string | IObjectKeys;
    msg?: string;
}

declare module 'axios' {
    interface AxiosInstance {
        (config: AxiosRequestConfig): Promise<any>
    }
}
